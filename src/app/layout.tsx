import type { Metadata } from "next";
import Script from "next/script";
import { Amiri, Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const amiri = Amiri({
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  variable: "--font-amiri",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Wedding Invitation | Shoaib Faraz Ahamed",
  description: "Wedding celebrations for Shoaib Faraz Ahamed.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} ${amiri.variable}`}
    >
      <head>
        <meta name="wedding-base-path" content="/" />
      </head>
      <body>
        <Script src="/wedding-assets.js" strategy="beforeInteractive" />
        <Script src="/wedding-music-boot.js" strategy="afterInteractive" />
        <audio id="bg-music" loop preload="auto" playsInline aria-hidden="true" />
        <button
          type="button"
          id="music-toggle"
          className="music-toggle"
          aria-label="Play background music"
          aria-pressed="false"
          title="Wedding background music"
        >
          <span className="music-toggle-icon" aria-hidden="true">
            ♪
          </span>
          <span className="music-toggle-label">Play music</span>
        </button>
        {children}
      </body>
    </html>
  );
}
