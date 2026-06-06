// Reads the taminations-flutter Dart source and emits structured JSON dumps
// for downstream consumption by import-taminations.ts.
//
// Usage:
//   tsx src/scripts/extract-taminations.ts --tam-root /path/to/taminations-flutter
//
// Outputs to be/src/prisma/seed-data/taminations/:
//   - programs.json         (from lib/level_data.dart)
//   - call-entries.json     (from lib/call_index.dart CallEntry list)
//   - families.json         (derived from call-entries: titles ending in 'Family')
//   - call-formations.json  (from lib/calls/<program>/*.dart AnimatedCall instances)
//
// The Dart source files are uniformly formatted (mostly generated). Regex parsing
// is sufficient — no Dart AST tooling required.

import { readFileSync, readdirSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, basename } from 'node:path';

type ProgramRow = { abbreviation: string; name: string };
type CallEntryRow = { title: string; level: string; link: string };
type FamilyRow = { name: string; link: string };
type CallFormationRow = {
  callTitle: string;
  link: string;       // e.g. 'ms/walk_and_dodge' — matches CallEntry.link for cross-reference
  from: string;       // start formation, internal name (e.g. 'Right-Hand Box Compact')
  endFormation: string; // end formation, internal name (e.g. 'Box RH')
  taminationsDifficulty: number | null;
};

function parseArgs(): { tamRoot: string } {
  const args = process.argv.slice(2);
  const tamRootIdx = args.indexOf('--tam-root');
  if (tamRootIdx < 0 || !args[tamRootIdx + 1]) {
    throw new Error('Usage: extract-taminations --tam-root /path/to/taminations-flutter');
  }
  return { tamRoot: args[tamRootIdx + 1] };
}

function extractPrograms(tamRoot: string): ProgramRow[] {
  const src = readFileSync(join(tamRoot, 'lib/level_data.dart'), 'utf-8');
  const re = /static\s+(?:final|const)\s+\w+\s*=\s*LevelData\(\s*'([^']*)'\s*,\s*'([^']*)'\s*,/g;
  const rows: ProgramRow[] = [];
  for (const m of src.matchAll(re)) {
    const [, name, dir] = m;
    if (!name || !dir || dir === 'all' || dir === 'x') continue;
    rows.push({ abbreviation: dir, name });
  }
  return rows;
}

function extractCallEntries(tamRoot: string): CallEntryRow[] {
  const src = readFileSync(join(tamRoot, 'lib/call_index.dart'), 'utf-8');
  // CallEntry('Allemande Thar','ms','ms/thar',ms.Thar,'ms/allemande_thar.mp3'),
  // CallEntry('Thar Family','ms','ms/thar',ms.Thar,),
  const re = /CallEntry\(\s*'((?:[^'\\]|\\.)*)'\s*,\s*'([^']+)'\s*,\s*'([^']+)'\s*,/g;
  const rows: CallEntryRow[] = [];
  for (const m of src.matchAll(re)) {
    const [, title, level, link] = m;
    rows.push({ title: title.replace(/\\'/g, "'"), level, link });
  }
  return rows;
}

function extractFamilies(tamRoot: string, callEntries: CallEntryRow[]): FamilyRow[] {
  const seen = new Map<string, string>();
  // Source 1: any CallEntry whose title ends in "Family"
  for (const entry of callEntries) {
    if (!/Family$/i.test(entry.title)) continue;
    if (!seen.has(entry.link)) seen.set(entry.link, entry.title);
  }
  // Source 2: titleIndex map entries whose title ends in "Family"
  // Structure in call_index.dart: var titleIndex = <String,String>{ 'link' : 'title', ... };
  const src = readFileSync(join(tamRoot, 'lib/call_index.dart'), 'utf-8');
  const mapRe = /'([^']+)'\s*:\s*'([^']*Family)'/g;
  for (const m of src.matchAll(mapRe)) {
    const [, link, name] = m;
    if (!seen.has(link)) seen.set(link, name);
  }
  return Array.from(seen, ([link, name]) => ({ link, name })).sort((a, b) =>
    a.link.localeCompare(b.link)
  );
}

function extractCallFormations(tamRoot: string): CallFormationRow[] {
  const callsRoot = join(tamRoot, 'lib/calls');
  const programDirs = readdirSync(callsRoot, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  const rows: CallFormationRow[] = [];
  for (const program of programDirs) {
    const programDir = join(callsRoot, program);
    const files = readdirSync(programDir).filter((f) => f.endsWith('.dart'));
    for (const file of files) {
      const link = `${program}/${basename(file, '.dart')}`;
      const src = readFileSync(join(programDir, file), 'utf-8');

      // AnimatedCall blocks: from "AnimatedCall('Title'," up to the closing "])" of paths.
      // We only need the field section before paths:[, so we match AnimatedCall(...) header
      // and the kv pairs preceding paths.
      const blockRe = /AnimatedCall\(\s*'((?:[^'\\]|\\.)*)'\s*,([\s\S]*?)paths\s*:/g;
      for (const m of src.matchAll(blockRe)) {
        const [, title, body] = m;
        const formationMatch = body.match(/formation\s*:\s*Formation\(\s*'((?:[^'\\]|\\.)*)'/);
        const fromMatch = body.match(/from\s*:\s*'((?:[^'\\]|\\.)*)'/);
        const diffMatch = body.match(/difficulty\s*:\s*(\d+)/);
        if (!formationMatch || !fromMatch) continue;
        rows.push({
          callTitle: title.replace(/\\'/g, "'"),
          link,
          from: fromMatch[1].replace(/\\'/g, "'"),
          endFormation: formationMatch[1].replace(/\\'/g, "'"),
          taminationsDifficulty: diffMatch ? Number(diffMatch[1]) : null,
        });
      }
    }
  }
  return rows;
}

function writeJson(outDir: string, name: string, data: unknown) {
  const path = join(outDir, name);
  writeFileSync(path, JSON.stringify(data, null, 2) + '\n');
   
  console.log(`wrote ${path} (${Array.isArray(data) ? data.length : 1} rows)`);
}

function main() {
  const { tamRoot } = parseArgs();
  if (!existsSync(join(tamRoot, 'lib/call_index.dart'))) {
    throw new Error(`call_index.dart not found under ${tamRoot}/lib`);
  }

  const outDir = join(process.cwd(), 'src/prisma/seed-data/taminations');
  mkdirSync(outDir, { recursive: true });

  const programs = extractPrograms(tamRoot);
  const callEntries = extractCallEntries(tamRoot);
  const families = extractFamilies(tamRoot, callEntries);
  const callFormations = extractCallFormations(tamRoot);

  writeJson(outDir, 'programs.json', programs);
  writeJson(outDir, 'call-entries.json', callEntries);
  writeJson(outDir, 'families.json', families);
  writeJson(outDir, 'call-formations.json', callFormations);
}

main();
