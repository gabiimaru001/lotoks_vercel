import type { Metadata } from "next";
import { Inter, Lexend } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

const lexend = Lexend({
  variable: "--font-heading",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lotoks — Global Sponsorship Platform",
  description: "The all-in-one platform for Visa, Education, and Job sponsorships. Expertise in Motion.",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
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
      className={`${inter.variable} ${lexend.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col selection:bg-primary/20 selection:text-primary">
        {children}
      </body>
    </html>
  );
}
