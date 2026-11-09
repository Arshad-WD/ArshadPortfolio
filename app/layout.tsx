import "./globals.css";
import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Outfit } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-outfit",
});

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export const metadata: Metadata = {
  metadataBase: new URL("https://jenixweblancer.in"),
  title: {
    default: "Arshad Chaudhary | Full Stack Developer & UI/UX Specialist",
    template: "%s | Arshad Chaudhary",
  },
  description:
    "Portfolio of Arshad Chaudhary — Computer Science Engineering student & Full-Stack Developer specializing in Next.js, React, TypeScript, Node.js, and Apple-grade UI/UX design.",
  applicationName: "Arshad Chaudhary Portfolio",
  authors: [
    {
      name: "Arshad Chaudhary",
      url: "https://jenixweblancer.in",
    },
  ],
  generator: "Next.js",
  keywords: [
    "Arshad Chaudhary",
    "Arshad",
    "Arshad WD",
    "Jenix Weblancer",
    "jenixweblancer.in",
    "Full Stack Developer",
    "Next.js Developer",
    "React Engineer",
    "TypeScript Developer",
    "Tailwind CSS",
    "Framer Motion",
    "GSAP Animation",
    "Software Engineer India",
    "UI/UX Specialist",
    "Creative Developer",
    "Frontend Engineer",
    "Full Stack Portfolio",
    "Three.js Portfolio",
    "Apple iOS Web Design",
    "Node.js",
    "MongoDB",
    "PostgreSQL",
    "URL Memory",
    "Movie Rating Explorer",
    "Expense Tracker",
  ],
  creator: "Arshad Chaudhary",
  publisher: "Arshad Chaudhary",
  category: "technology",
  classification: "Software Engineering & Web Development Portfolio",
  alternates: {
    canonical: "https://jenixweblancer.in",
    types: {
      "text/markdown": "https://jenixweblancer.in/llms.txt",
    },
  },
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "Arshad Chaudhary | Full Stack Developer & UI/UX Specialist",
    description:
      "Explore the portfolio of Arshad Chaudhary — Full Stack Software Engineer specializing in Next.js, React, TypeScript, and modern interactive UI/UX systems.",
    url: "https://jenixweblancer.in",
    siteName: "Arshad Chaudhary Portfolio",
    images: [
      {
        url: "/images/og-dark.png",
        width: 1200,
        height: 630,
        alt: "Arshad Chaudhary — Full Stack Developer Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "profile",
    firstName: "Arshad",
    lastName: "Chaudhary",
    username: "Arshad-WD",
    gender: "male",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arshad Chaudhary | Full Stack Developer & UI/UX Specialist",
    description:
      "Full-stack software engineering portfolio built with Next.js, React, TypeScript, Framer Motion, and GSAP.",
    images: ["/images/og-dark.png"],
    site: "@dark_arsha78045",
    creator: "@dark_arsha78045",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    "llms": "https://jenixweblancer.in/llms.txt",
    "llms-full": "https://jenixweblancer.in/llms-full.txt",
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

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://jenixweblancer.in/#person",
      name: "Arshad Chaudhary",
      alternateName: ["Arshad", "Arshad WD", "ArshadChaudhary"],
      url: "https://jenixweblancer.in",
      image: "https://jenixweblancer.in/images/og-dark.png",
      jobTitle: "Full Stack Developer & UI/UX Specialist",
      description:
        "Computer Science Engineering student and Full-Stack Developer specializing in Next.js, React, TypeScript, Node.js, and modern fluid UI/UX design.",
      sameAs: [
        "https://github.com/Arshad-WD",
        "https://www.linkedin.com/in/arshad-chaudhary-388312288/",
        "https://x.com/dark_arsha78045",
      ],
      knowsAbout: [
        "Next.js",
        "React",
        "TypeScript",
        "JavaScript",
        "Node.js",
        "Tailwind CSS",
        "Framer Motion",
        "GSAP",
        "Three.js",
        "MongoDB",
        "PostgreSQL",
        "Flutter",
        "Full-Stack Development",
        "UI/UX Design",
        "Generative Engine Optimization (GEO)",
        "Answer Engine Optimization (AEO)",
        "Search Engine Optimization (SEO)",
        "REST APIs",
        "Server Actions",
      ],
      knowsLanguage: [
        { "@type": "Language", name: "English", alternateName: "en" },
        { "@type": "Language", name: "Hindi", alternateName: "hi" },
      ],
      nationality: {
        "@type": "Country",
        name: "India",
      },
      alumniOf: {
        "@type": "EducationalOrganization",
        name: "Computer Science and Engineering",
      },
      hasOccupation: {
        "@type": "Occupation",
        name: "Full Stack Software Engineer",
        skills:
          "Next.js, React, TypeScript, Node.js, Tailwind CSS, Framer Motion, GSAP, MongoDB, PostgreSQL",
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://jenixweblancer.in/#website",
      url: "https://jenixweblancer.in",
      name: "Arshad Chaudhary Portfolio",
      alternateName: "Arshad Portfolio",
      description:
        "Portfolio of Arshad Chaudhary — Premium Full Stack Developer & UI/UX Specialist specializing in Next.js, React, and TypeScript.",
      publisher: {
        "@id": "https://jenixweblancer.in/#person",
      },
      inLanguage: "en-US",
    },
    {
      "@type": "ProfilePage",
      "@id": "https://jenixweblancer.in/#profilepage",
      url: "https://jenixweblancer.in",
      name: "Arshad Chaudhary | Full Stack Developer & UI/UX Specialist",
      isPartOf: {
        "@id": "https://jenixweblancer.in/#website",
      },
      about: {
        "@id": "https://jenixweblancer.in/#person",
      },
      mainEntity: {
        "@id": "https://jenixweblancer.in/#person",
      },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://jenixweblancer.in",
          },
        ],
      },
    },
    {
      "@type": "ItemList",
      "@id": "https://jenixweblancer.in/#projects",
      name: "Featured Engineering Projects by Arshad Chaudhary",
      description:
        "Selected full-stack software applications and interactive digital systems built by Arshad Chaudhary.",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          item: {
            "@type": "SoftwareApplication",
            name: "URL Memory",
            description:
              "High-performance URL management engine featuring real-time click tracking, latency metrics, and custom slug routing.",
            applicationCategory: "UtilitiesApplication",
            operatingSystem: "Web",
            url: "https://memory.jenixweblancer.in/",
            author: {
              "@id": "https://jenixweblancer.in/#person",
            },
          },
        },
        {
          "@type": "ListItem",
          position: 2,
          item: {
            "@type": "SoftwareApplication",
            name: "Movie Rating Explorer",
            description:
              "Interactive entertainment discovery application integrating the TMDB API with real-time genre filtering, live search, and dynamic ratings.",
            applicationCategory: "EntertainmentApplication",
            operatingSystem: "Web",
            url: "https://entertainment-gold.vercel.app/",
            author: {
              "@id": "https://jenixweblancer.in/#person",
            },
          },
        },
        {
          "@type": "ListItem",
          position: 3,
          item: {
            "@type": "SoftwareApplication",
            name: "Expense Tracker",
            description:
              "Full-stack personal finance tracker providing instant transaction analysis, categorization logic, and interactive visual charts.",
            applicationCategory: "FinanceApplication",
            operatingSystem: "Web",
            url: "https://expense-tracker-ircf.vercel.app/",
            author: {
              "@id": "https://jenixweblancer.in/#person",
            },
          },
        },
        {
          "@type": "ListItem",
          position: 4,
          item: {
            "@type": "SoftwareApplication",
            name: "AI Conversation Interface",
            description:
              "Voice-first conversational AI interface concept focusing on low-latency voice interaction, live wave animations, and adaptive prompts.",
            applicationCategory: "DesignApplication",
            operatingSystem: "Web",
            author: {
              "@id": "https://jenixweblancer.in/#person",
            },
          },
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": "https://jenixweblancer.in/#faq",
      name: "Frequently Asked Questions about Arshad Chaudhary",
      mainEntity: [
        {
          "@type": "Question",
          name: "Who is Arshad Chaudhary?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Arshad Chaudhary is an Indian Full-Stack Developer and Computer Science Engineering student specializing in building high-performance web applications with Next.js, React, TypeScript, and modern UI/UX design.",
          },
        },
        {
          "@type": "Question",
          name: "What technologies does Arshad Chaudhary specialize in?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Arshad specializes in Next.js (App Router), React 18/19, TypeScript, Node.js, Tailwind CSS, Framer Motion, GSAP, MongoDB, PostgreSQL, Three.js, and Flutter.",
          },
        },
        {
          "@type": "Question",
          name: "What key projects has Arshad Chaudhary built?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Key engineering projects include URL Memory (high-performance URL shortener with analytics at memory.jenixweblancer.in), Movie Rating Explorer (TMDB-powered entertainment discovery app), Expense Tracker (personal financial dashboard with visual charts), and AI Conversation Prototype (voice-first multimodal AI interface).",
          },
        },
        {
          "@type": "Question",
          name: "Is Arshad Chaudhary available for full-time roles or contracts?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, Arshad Chaudhary is actively available for Full-Stack Developer, Frontend Engineer, and Software Engineering positions, including remote contracts, internships, and full-time engineering roles worldwide.",
          },
        },
        {
          "@type": "Question",
          name: "How can I contact Arshad Chaudhary?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You can connect with Arshad on LinkedIn (https://www.linkedin.com/in/arshad-chaudhary-388312288/), GitHub (https://github.com/Arshad-WD), X/Twitter (@dark_arsha78045), or through his portfolio at https://jenixweblancer.in.",
          },
        },
      ],
    },
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
        {/* Preload critical assets eagerly */}
        <link
          rel="preload"
          href="/fonts/THELASTTRUNKS-Personal-Use-Only.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/images/Layer1.png"
          as="image"
          fetchPriority="high"
        />
        <link
          rel="preload"
          href="/images/Layer2.png"
          as="image"
          fetchPriority="high"
        />

        {/* Machine-Readable Context for LLMs & AI Answer Engines (AEO & GEO) */}
        <link
          rel="alternate"
          type="text/markdown"
          title="LLMs Context"
          href="/llms.txt"
        />

        {/* JSON-LD Structured Data Schema for Search & Answer Engines */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Google Analytics */}
        {GA_ID && (
          <>
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
          </>
        )}
      </head>

      <body className={`${outfit.variable} relative text-white antialiased`}>
        {/* Semantic Content Tree for Search Crawlers, Screen Readers, and AI Answer Engines */}
        <div className="sr-only" aria-hidden="false">
          <header>
            <h1>Arshad Chaudhary — Full Stack Developer & UI/UX Specialist</h1>
            <p>
              Computer Science Engineering student and Full-Stack Developer specializing in Next.js, React, TypeScript, Node.js, and fluid UI/UX design. Based in India, open to global software engineering roles.
            </p>
          </header>

          <main>
            <section id="bio">
              <h2>About Arshad Chaudhary</h2>
              <p>
                Computer Science Engineering student and full-stack developer based in India. Specialized in the modern Next.js ecosystem, building fast, accessible web applications with clean architecture, robust type safety, and fluid interactions.
              </p>
            </section>

            <section id="technical-skills">
              <h2>Technical Skills & Technologies</h2>
              <ul>
                <li>Languages: TypeScript, JavaScript (ES6+), Python, Dart, HTML5, CSS3</li>
                <li>Frontend: Next.js 14/15/16 App Router, React 18/19, Tailwind CSS, Framer Motion, GSAP, Three.js</li>
                <li>Backend: Node.js, Express, REST APIs, Server Actions, JWT Authentication</li>
                <li>Databases: MongoDB, PostgreSQL, Prisma</li>
                <li>Mobile: Flutter</li>
              </ul>
            </section>

            <section id="featured-projects">
              <h2>Featured Engineering Projects</h2>
              <article>
                <h3>URL Memory</h3>
                <p>High-performance URL management engine featuring real-time click tracking, latency metrics, and custom slug routing.</p>
                <a href="https://memory.jenixweblancer.in/">Visit URL Memory</a>
              </article>
              <article>
                <h3>Movie Rating Explorer</h3>
                <p>Interactive movie discovery application integrating the TMDB API with real-time genre filtering, live search, and dynamic ratings.</p>
                <a href="https://entertainment-gold.vercel.app/">Visit Movie Rating Explorer</a>
              </article>
              <article>
                <h3>Expense Tracker</h3>
                <p>Full-stack personal finance tracker providing instant transaction analysis, categorization logic, and interactive visual charts.</p>
                <a href="https://expense-tracker-ircf.vercel.app/">Visit Expense Tracker</a>
              </article>
              <article>
                <h3>AI Conversation Interface Prototype</h3>
                <p>Next-gen conversational AI interface concept focusing on low-latency voice interaction, live wave animations, and adaptive prompts.</p>
              </article>
            </section>

            <section id="contact-info">
              <h2>Contact & Connect</h2>
              <p>Connect with Arshad Chaudhary for software engineering roles, contracts, and collaborations.</p>
              <ul>
                <li><a href="https://github.com/Arshad-WD">GitHub Profile: Arshad-WD</a></li>
                <li><a href="https://www.linkedin.com/in/arshad-chaudhary-388312288/">LinkedIn: Arshad Chaudhary</a></li>
                <li><a href="https://x.com/dark_arsha78045">Twitter/X: @dark_arsha78045</a></li>
                <li><a href="/resume/ARSHADCHAUDHARY-2026.pdf">Download Resume (PDF)</a></li>
              </ul>
            </section>
          </main>
        </div>

        {children}
        <Analytics />
      </body>
    </html>
  );
}
