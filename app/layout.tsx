import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AssessmentProvider } from "@/contexts/AssessmentContext";
import { Navbar } from "@/components/Navbar";

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
    <html lang="en" className="w-full">
      <body className={`${inter.className} w-full flex flex-col items-center`}>
        <AssessmentProvider>
          <div className="w-full flex flex-col items-center">
            <Navbar />
            <div className="w-full">
              {children}
            </div>
          </div>
        </AssessmentProvider>
      </body>
    </html>
  );
}

