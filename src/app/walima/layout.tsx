import { assetPath } from "@/lib/site-base-path";

export default function WalimaLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <link
        rel="preload"
        as="image"
        href={assetPath("/walima-cinematic-bg.webp")}
        type="image/webp"
      />
      {children}
    </>
  );
}
