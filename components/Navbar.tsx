"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/explore", label: "Explore" },
  { href: "/assess", label: "Self-Assessment" },
  { href: "/plan", label: "Development Plan" },
  { href: "/summary", label: "My Summary" },
  { href: "/how-to-use", label: "Guide" },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <nav className="w-full bg-[#00457D] sticky top-0 z-50 no-print">
      {/* Main navbar container */}
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px]">
          {/* Official UoA Logo - Reversed version for dark background */}
          <Link href="/" className="flex items-center hover:opacity-90 transition-opacity flex-shrink-0">
            <img 
              src="/uoa_corporate_branding/Primary Logo_PNG/Large Primary Logo_PNG/UoA-Logo-Primary-RGB-Reversed-Large.png" 
              alt="Waipapa Taumata Rau - University of Auckland" 
              className="h-14 w-auto object-contain"
            />
          </Link>
          
          {/* Desktop Navigation - Shows at md breakpoint (768px+) */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    px-3 lg:px-4 py-2 text-sm font-medium transition-all duration-200 whitespace-nowrap
                    ${active
                      ? "text-white border-b-2 border-white font-semibold"
                      : "text-white hover:text-white border-b-2 border-transparent hover:border-white/50"
                    }
                  `}
                  style={{ color: active ? '#FFFFFF' : '#FFFFFF' }}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Mobile menu button - Hidden at md breakpoint */}
          <button
            type="button"
            className="md:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu - Hidden at md breakpoint */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#003561] border-t border-white/10">
          <div className="px-6 py-4 space-y-1">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`
                    block px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200
                    ${active
                      ? "bg-white/15 text-white font-semibold"
                      : "text-white hover:text-white hover:bg-white/10"
                    }
                  `}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
