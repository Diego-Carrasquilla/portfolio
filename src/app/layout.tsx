import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { LanguageProvider } from "@/context/LanguageContext";
import Header from "@/components/Header";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Diego Carrasquilla — Software Engineer",
  description: "Ingeniero de software especializado en arquitecturas escalables, automatización de procesos y backends enterprise. Flutter, N8N, Node.js, C#.",
  keywords: ["Software Engineer", "Flutter Developer", "N8N", "Backend Developer", "Diego Carrasquilla", "Full Stack Developer"],
  authors: [{ name: "Diego Carrasquilla" }],
  creator: "Diego Carrasquilla",
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://portfolio-woad-eta-33.vercel.app",
    title: "Diego Carrasquilla — Software Engineer",
    description: "Construyo sistemas, automatizaciones y agentes inteligentes. Especializado en arquitecturas escalables e integraciones complejas.",
    siteName: "Diego Carrasquilla Portfolio",
    images: [
      {
        url: "https://portfolio-woad-eta-33.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Diego Carrasquilla - Software Engineer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Diego Carrasquilla — Software Engineer",
    description: "Construyo sistemas, automatizaciones y agentes inteligentes.",
    images: ["https://portfolio-woad-eta-33.vercel.app/og-image.png"],
    creator: "@diegocarrasquilla",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <ThemeProvider>
          <LanguageProvider>
            <Header />
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
