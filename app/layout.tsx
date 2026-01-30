import "./globals.css";
import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://arshad-portfolio.vercel.app"),
  title: {
    default: "Arshad | Full Stack Developer",
    template: "%s | Arshad",
  },
  description:
    "Portfolio of Arshad — Frontend Developer specializing in React, Next.js, GSAP, and Three.js.",
  openGraph: {
    title: "Arshad | Full Stack Developerr",
    description: "Modern animated portfolio built with Next.js and GSAP",
    images: ["/images/og-dark.png"],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/images/og-dark.png"],
  },
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="relative text-white antialiased">{children}</body>
    </html>
  );
}
