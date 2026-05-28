import Image from "next/image";
import Link from "next/link";
import { inter, montsie } from "@/ui/fonts";
import { SquareTrackLogo } from "@/ui/elements/logo";

const entryPoints = [
  {
    href: "/calling/calls",
    title: "Calls",
    description: "Browse the catalog of square dance calls.",
  },
  {
    href: "/calling/sequences",
    title: "Sequences",
    description: "Build and review sequences.",
  },
  {
    href: "/data",
    title: "Data review",
    description: "Audit calls, formations, teach orders, and programs.",
  },
  {
    href: "/docs",
    title: "API docs",
    description: "Endpoint reference and conventions.",
  },
];

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <SquareTrackLogo />

        <Image
          src="/squareset.png"
          width={100}
          height={100}
          className="hidden md:block"
          alt="Squared set"
        />

        <p
          className={`${montsie.className} text-xl text-gray-700 md:text-3xl md:leading-normal`}
        >
          <strong>Go Square Tracking</strong>
        </p>
        <p
          className={`${inter.className} text-xl text-gray-500 md:text-2xl md:leading-normal`}
        >
          All you need to know about square dance.
        </p>

        <nav
          aria-label="Primary"
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl"
        >
          {entryPoints.map((entry) => (
            <Link
              key={entry.href}
              href={entry.href}
              className="rounded-lg border border-black/[.08] dark:border-white/[.145] p-4 transition-colors hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a]"
            >
              <div className="text-base font-semibold">{entry.title}</div>
              <div className="text-sm text-gray-500">{entry.description}</div>
            </Link>
          ))}
        </nav>
      </main>
    </div>
  );
}
