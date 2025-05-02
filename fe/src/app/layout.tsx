import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { inter,montsie } from "@/ui/fonts";
import "@/ui/global.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "squareTrack",
  description: "Track your square dancing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montsie.className} antialiased`}>
        <main>
          {children}
        </main>
      </body>
      {/* <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <main>
          {children}
        </main>
      </body> */}
    </html>
  );
}
