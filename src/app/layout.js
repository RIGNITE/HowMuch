import { Montserrat } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

const montserrat = Montserrat({
  display: "swap",
  subsets: ["latin"],
  styles: "wght@400;500;700",
});

export const metadata = {
  title: "HowMuch",
  description: "Exchange rate application for currency conversion",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <A
      <body className={montserrat.className}>{children}</body>
    </html>
  );
}
