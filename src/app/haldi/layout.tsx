import { assetPath } from "@/lib/site-base-path";

export default function HaldiLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <link
        rel="preload"
        as="image"
        href={assetPath("/haldi-cinematic-bg.webp")}
        type="image/webp"
      />
      {children}
    </>
  );
}
