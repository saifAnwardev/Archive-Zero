import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  Inter,
  Italiana,
  Space_Grotesk
} from "next/font/google";
import "./globals.css";

const exhibition = Italiana({
  subsets: ["latin"],
  variable: "--font-exhibition",
  weight: "400",
});

const editorial = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-editorial",
  weight: ["300", "400", "500", "600"],
});

const utility = Inter({
  subsets: ["latin"],
  variable: "--font-utility",
});
const voidFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-void",
  weight: ["300", "400", "500", "700"],
});
export const metadata: Metadata = {
  title: "Couture Archive",
  description: "An immersive couture archive hero experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      suppressHydrationWarning
       className={`${exhibition.variable} ${editorial.variable} ${utility.variable} ${voidFont.variable}`}>
        {children}
      </body>
    </html>
  );
}
