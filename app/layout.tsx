import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetBrainsMono = JetBrains_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Password Generator",
  description: "Secure your online accounts with our Password Generator app. Instantly create strong, unique passwords with advanced security features to protect your personal information. Easy to use and highly reliable.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={jetBrainsMono.className}>{children}</body>
    </html>
  );
}
