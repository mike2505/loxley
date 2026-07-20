import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import { SmoothScroll } from "@/components/smooth-scroll";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Loxley — Open Robotics on Robinhood Chain",
  description:
    "Loxley is the open platform to build, simulate, deploy and monetize robots on-chain. The people's robotics platform, powered by Robinhood Chain.",
  openGraph: {
    title: "Loxley — Open Robotics on Robinhood Chain",
    description:
      "Build, simulate, deploy and monetize robots on-chain. The people's robotics platform.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-night text-snow">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
