import { Metadata } from "next";
import { Inter, Outfit, Libre_Baskerville } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const baskerville = Libre_Baskerville({ 
  weight: ['400', '700'],
  subsets: ["latin"], 
  variable: "--font-serif-google" 
});

export const metadata: Metadata = {
  title: "LenderBridge | Short Sale Negotiation Experts",
  description: "LenderBridge helps homeowners avoid foreclosure through expert short sale negotiation. Fast, professional, and results-driven.",
  keywords: "short sale, avoid foreclosure, short sale negotiation, lender negotiation, homeowner help",
  metadataBase: new URL("https://lenderbridge.ai"),
  openGraph: {
    title: "LenderBridge | Short Sale Negotiation Experts",
    description: "Expert short sale negotiation to help homeowners avoid foreclosure.",
    url: "https://lenderbridge.ai",
    siteName: "LenderBridge",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} ${baskerville.variable}`}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
