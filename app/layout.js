import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Quantix Pro: Scientific, Financial & Programmer Calculator Suite",
  description: "Quantix Pro is the ultimate premium calculator suite. Early Access: Get the full Professional experience FREE for a limited time. Scientific, Financial, Programmer & more.",
  authors: [{ name: "Talented Villagers" }],
  openGraph: {
    title: "Quantix Pro: Scientific, Financial & Programmer Calculator Suite",
    description: "The ultimate free, ad-free calculator suite. Built for professionals and students.",
    siteName: "Quantix Pro",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Quantix Pro: Professional Calculator Suite",
    description: "Scientific, Programmer, Financial, and Statistics modes in one beautiful app.",
    creator: "@TalentedVillagers",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
