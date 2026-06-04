// Consistent "coming soon" placeholder for skeleton routes (issue #67).
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
