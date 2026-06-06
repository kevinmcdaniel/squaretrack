import type { Metadata } from "next";
import { montsie } from "@/ui/fonts";
import "@/ui/global.css";

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
    </html>
  );
}
