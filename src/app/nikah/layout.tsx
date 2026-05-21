export default function NikahLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <link
        rel="preload"
        as="image"
        href="/nikah-cinematic-bg.webp"
        type="image/webp"
      />
      {children}
    </>
  );
}
