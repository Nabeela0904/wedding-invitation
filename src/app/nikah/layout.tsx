import { assetPath } from "@/lib/site-base-path";

export default function NikahLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <link
        rel="preload"
        as="image"
        href={assetPath("/nikah-cinematic-bg.webp")}
        type="image/webp"
      />
      {children}
    </>
  );
}
