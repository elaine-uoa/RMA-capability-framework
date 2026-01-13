"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

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

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <nav className="w-full bg-[#00457D] sticky top-0 z-50 no-print">
      <div className="max-w-[1200px] mx-auto px-8 lg:px-12">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Display as-is, resized to navbar height */}
          <Link href="/" className="flex items-center hover:opacity-90 transition-opacity">
            <img 
              src="/uoa_logo.png" 
              alt="Waipapa Taumata Rau - University of Auckland" 
              className="h-16 w-auto object-contain"
              style={{ 
                maxHeight: '64px',
                height: '100%'
              }}
            />
          </Link>
          
          {/* Navigation - Increased spacing, no separators, hover effects only */}
          <div className="flex items-center gap-4">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    px-5 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 whitespace-nowrap
                    ${active
                      ? "bg-white/20 text-white font-semibold shadow-sm"
                      : "text-white hover:text-white hover:bg-white/10 hover:shadow-md"
                    }
                  `}
                  style={{ color: '#FFFFFF' }}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
