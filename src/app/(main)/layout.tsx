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
  // Replace localhost with your production URL
  metadataBase: new URL("https://starconsulting-engineering.vercel.app"),

  title: {
    default:
      "Star Consulting Engineering | Piping Stress Analysis, CAESAR II & Engineering Consultancy",
    template: "%s | Star Consulting Engineering",
  },

  description:
    "Star Consulting Engineering provides piping stress analysis, CAESAR II analysis, piping flexibility studies, vibration analysis, pipeline engineering, and engineering consulting services for oil & gas, LNG, petrochemical, power, and process industries.",

  keywords: [
    "Star Consulting Engineering",
    "Star Consultant",
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
  ],

  openGraph: {
    title:
      "Star Consulting Engineering | Piping Stress Analysis & Engineering Consultancy",
    description:
      "Engineering consultancy specializing in piping stress analysis, CAESAR II, vibration analysis, and pipeline engineering.",
    url: "https://starconsulting-engineering.vercel.app",
    siteName: "Star Consulting Engineering",
    type: "website",
    locale: "en_US",
  },

  robots: {
    index: true,
    follow: true,
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
