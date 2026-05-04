import "./globals.css";
import type { Metadata, Viewport } from "next";
import Script from "next/script";
import BotLoader from "@/components/BotLoader";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export const metadata: Metadata = {
  metadataBase: new URL("https://arshad-portfolio.vercel.app"),
  title: {
    default: "Arshad | Full Stack Developer & UI/UX Specialist",
    template: "%s | Arshad",
  },
  description:
    "Portfolio of Arshad — Premium Full Stack Developer specializing in React, Next.js, Framer Motion, and Industrial-grade UI/UX Design.",
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
  keywords: ["Arshad", "Full Stack Developer", "Next.js Portfolio", "React Developer", "GSAP Animation", "UI/UX Design", "Framer Motion", "Premium Website"],
  authors: [{ name: "Arshad" }],
  creator: "Arshad",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Arshad | Full Stack Developer",
    description: "Modern high-end portfolio built with Next.js and Framer Motion.",
    url: "https://arshad-portfolio.vercel.app",
    siteName: "Arshad Portfolio",
    images: [
      {
        url: "/images/og-dark.png",
        width: 1200,
        height: 630,
        alt: "Arshad Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arshad | Full Stack Developer",
    description: "Modern high-end portfolio built with Next.js and Framer Motion.",
    images: ["/images/og-dark.png"],
    creator: "@dark_arsha78045",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  colorScheme: "dark",
  viewportFit: "cover",
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
      <head>
        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />

        <Script id="ga4" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
      </head>

      <body className="relative text-white antialiased">
        {children}
        <BotLoader />
      </body>
    </html>
  );
}
