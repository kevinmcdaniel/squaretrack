import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import DocViewer from './DocViewer';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const docsDir = path.join(process.cwd(), 'docs', 'api');
  try {
    const files = fs.readdirSync(docsDir).filter((f) => f.endsWith('.md'));
    return files.map((f) => ({ slug: f.replace(/\.md$/, '') }));
  } catch {
    return [];
  }
}

export default async function DocPage({ params }: Props) {
  const { slug } = await params;
  const filePath = path.join(process.cwd(), 'docs', 'api', `${slug}.md`);

  let content: string;
  try {
    content = fs.readFileSync(filePath, 'utf-8');
  } catch {
    notFound();
  }

  return <DocViewer content={content} />;
}
