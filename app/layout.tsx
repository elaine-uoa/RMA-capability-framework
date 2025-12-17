import type { Metadata } from "next";
import { Source_Sans_3 } from "next/font/google";
import "./globals.css";
import { AssessmentProvider } from "@/contexts/AssessmentContext";
import { Navbar } from "@/components/Navbar";

const sourceSans = Source_Sans_3({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
});

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
      <body className={`${sourceSans.className} w-full flex flex-col items-center`}>
        <AssessmentProvider>
          <div className="w-full flex flex-col items-center">
            <Navbar />
            <main className="w-full">
              {children}
            </main>
          </div>
        </AssessmentProvider>
      </body>
    </html>
  );
}
