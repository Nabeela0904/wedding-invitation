export default function WalimaLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <link
        rel="preload"
        as="image"
        href="/walima-cinematic-bg.webp"
        type="image/webp"
      />
      {children}
    </>
  );
}
