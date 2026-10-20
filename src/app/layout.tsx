import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: "Episteme AI — Autonomous Self-Healing Learning Path Engine",
  description: "Autonomous Agentic AI that transforms career ambitions into scheduled, prerequisite-ordered weekly roadmaps using 100% verified free public resources with real-time paywall detection and self-healing link resolution.",
  keywords: ["episteme", "agentic ai", "learning path builder", "self-healing links", "free education", "data analyst", "autonomous curriculum", "public courseware", "calendar scheduling"],
  openGraph: {
    title: "Episteme AI — Autonomous Self-Healing Learning Path Engine",
    description: "Autonomous Agentic AI that turns career ambitions into scheduled, self-healing weekly curriculums using verified 100% free public resources.",
    type: "website",
    images: [{ url: "/brand-logo.jpg", width: 1024, height: 1024, alt: "Episteme AI Logo" }],
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico' },
      { url: '/icon.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
