import type { Metadata } from "next";
import "./globals.css";
import { AssessmentProvider } from "@/contexts/AssessmentContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "RMA Capability Framework | Waipapa Taumata Rau - University of Auckland",
  description: "Self-assessment tool for Research Management & Administration staff at the University of Auckland",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="w-full overflow-x-hidden">
      <body className="w-full min-h-screen flex flex-col" style={{ fontFamily: "var(--font-sans)" }}>
        <AssessmentProvider>
          <div className="w-full flex flex-col min-h-screen">
            <Navbar />
            <main className="w-full flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </AssessmentProvider>
      </body>
    </html>
  );
}
