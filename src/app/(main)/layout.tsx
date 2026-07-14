import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  // Production URL
  metadataBase: new URL("https://flexotechconsultingengineers.com"),

  title: {
    default:
      "Flexotech Consulting Engineers | Piping Stress Analysis, CAESAR II & Engineering Consultancy",
    template: "%s | Flexotech Consulting Engineers",
  },

  description:
    "Flexotech Consulting Engineers provides professional piping stress analysis, CAESAR II analysis, piping flexibility studies, vibration analysis, pipeline engineering, and engineering consultancy services for oil & gas, LNG, petrochemical, power, and process industries.",

  keywords: [
    "Flexotech Consulting Engineers",
    "Flexotech",
    "Piping Stress Analysis",
    "CAESAR II",
    "Pipeline Engineering",
    "Piping Engineering",
    "Stress Analysis",
    "Vibration Analysis",
    "Engineering Consultancy",
    "Pipe Stress",
    "Piping Design",
    "Oil and Gas Engineering",
    "LNG Engineering",
    "Petrochemical Engineering",
    "Power Plant Engineering",
    "Industrial Pipeline Engineering",
  ],

  openGraph: {
    title:
      "Flexotech Consulting Engineers | Piping Stress Analysis & Engineering Consultancy",

    description:
      "Professional engineering consultancy specializing in piping stress analysis, CAESAR II, vibration analysis, pipeline engineering, and industrial engineering solutions.",

    url: "https://flexotechconsultingengineers.com",

    siteName: "Flexotech Consulting Engineers",

    type: "website",

    locale: "en_US",
  },

  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: "https://flexotechconsultingengineers.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
    >
      <body className="min-h-[100dvh] flex flex-col antialiased tracking-tight">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
