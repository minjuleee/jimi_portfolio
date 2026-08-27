import Header from "@/components/Header";
import { LanguageProvider } from "@/contexts/LanguageContext";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jimi Lee",
  description: "Jimi Lee Portfolio",

  icons: {
    icon: "/images/logo.png",
    shortcut: "/images/logo.png",
    apple: "/images/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          <Header />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
