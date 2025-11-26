import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AssessmentProvider } from "@/contexts/AssessmentContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RMA Capability Framework | University of Auckland",
  description: "Self-assessment tool for Research Management & Administration staff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AssessmentProvider>{children}</AssessmentProvider>
      </body>
    </html>
  );
}

