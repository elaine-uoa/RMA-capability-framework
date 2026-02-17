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
  { href: "/how-to-use", label: "How-to Guide" },
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
    <nav className="relative w-full bg-[#0c0c48] sticky top-0 z-[80] no-print">
      <div className="w-full">
        <div className="flex items-center justify-between" style={{ height: "96px" }}>
          {/* Official UoA Logo */}
          <Link
            href="/"
            className="flex items-center hover:opacity-90 transition-opacity flex-shrink-0"
            style={{ paddingLeft: "28px" }}
            onClick={() => setMobileMenuOpen(false)}
          >
            <img 
              src="/uoa_logo_ext_reversed.png" 
              alt="Waipapa Taumata Rau - University of Auckland" 
              style={{ height: "52px", width: "auto", objectFit: "contain" }}
            />
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center" style={{ paddingRight: "34px", gap: "20px" }}>
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    text-[15px] font-medium transition-all duration-200 whitespace-nowrap
                    ${active
                      ? "text-white font-semibold border-b-2 border-white"
                      : "text-white hover:text-white border-b-2 border-transparent"
                    }
                  `}
                  style={{ 
                    color: "#FFFFFF",
                    paddingTop: "6px",
                    paddingBottom: "4px",
                    lineHeight: 1.1,
                  }}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden text-white hover:bg-white/10 rounded-lg transition-colors"
            style={{ padding: '10px', marginRight: '24px' }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-menu"
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

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <>
          <button
            type="button"
            aria-label="Close navigation menu"
            className="md:hidden fixed inset-x-0 bottom-0 z-[85] bg-black/35"
            style={{ top: '82px' }}
            onClick={() => setMobileMenuOpen(false)}
          />
          <div
            id="mobile-nav-menu"
            className="md:hidden absolute left-0 right-0 top-full z-[90] border-t border-white/15 bg-[#080839] shadow-2xl"
          >
            <div className="flex flex-col" style={{ padding: '12px 14px 16px 14px', gap: '8px' }}>
              {navItems.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`
                      block rounded-xl transition-all duration-200 no-underline
                      ${active
                        ? "font-semibold shadow-sm"
                        : ""
                      }
                    `}
                    style={{
                      color: '#FFFFFF',
                      padding: '13px 14px',
                      fontSize: '15px',
                      lineHeight: 1.25,
                      minHeight: '46px',
                      display: 'flex',
                      alignItems: 'center',
                      border: active ? '1px solid rgba(255,255,255,0.24)' : '1px solid rgba(255,255,255,0.10)',
                      backgroundColor: active ? '#3E3E70' : '#1A1A55',
                    }}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </>
      )}
    </nav>
  );
}
