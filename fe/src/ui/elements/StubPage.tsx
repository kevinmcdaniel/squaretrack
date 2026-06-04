/**
 * Consistent placeholder for routes that exist in the skeleton (issue #62/#67)
 * but whose feature isn't built yet. Renders the section title, a "coming soon"
 * line, and an optional one-sentence description of what will live here — never
 * a blank page or a 404.
 */
export function StubPage({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <section>
      <h1 className="mb-2 text-2xl font-semibold">{title}</h1>
      <p className="text-gray-500">Planned feature — coming soon.</p>
      {children ? <p className="mt-2 max-w-prose text-gray-600">{children}</p> : null}
    </section>
  );
}
