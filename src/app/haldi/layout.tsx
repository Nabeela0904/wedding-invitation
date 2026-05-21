export default function HaldiLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <link
        rel="preload"
        as="image"
        href="/haldi-cinematic-bg.webp"
        type="image/webp"
      />
      {children}
    </>
  );
}
