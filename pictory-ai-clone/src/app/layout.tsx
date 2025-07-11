import type { Metadata } from "next";
import "./globals.css";
import RootLayout from '@/components/layout/RootLayout';

export const metadata: Metadata = {
  title: "Pictory AI Clone - AI-Powered Content Creation",
  description: "Transform your ideas into stunning visuals and videos with AI. Create professional content in minutes, not hours.",
  keywords: "AI, content creation, image generation, video generation, design, marketing",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <RootLayout>{children}</RootLayout>
      </body>
    </html>
  );
}
