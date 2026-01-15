export function Footer() {
  const footerLinks = [
    { href: "https://www.auckland.ac.nz", label: "The University of Auckland" },
    { href: "https://www.auckland.ac.nz/en/about-us.html", label: "About" },
    { href: "https://www.auckland.ac.nz/en/about-us/about-the-university/disclaimer.html", label: "Disclaimer" },
    { href: "https://www.auckland.ac.nz/en/privacy.html", label: "Privacy" },
    { href: "https://www.auckland.ac.nz/en/accessibility.html", label: "Accessibility" },
    { href: "https://www.auckland.ac.nz/en/about-us/contact-us/feedback.html", label: "Feedback" },
    { href: "https://research-hub.auckland.ac.nz", label: "Research Hub" },
  ];

  return (
    <footer className="w-full bg-[#1a1a1a] text-white no-print">
      <div className="w-full px-6 lg:px-8 py-8">
        <div className="max-w-[1200px] mx-auto">
          {/* Main footer content */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            {/* UoA Official Logo - Reversed version for dark background */}
            <div className="flex-shrink-0">
              <a 
                href="https://www.auckland.ac.nz" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block hover:opacity-90 transition-opacity"
              >
                <img
                  src="/uoa_corporate_branding/Primary Logo_PNG/Large Primary Logo_PNG/UoA-Logo-Primary-RGB-Reversed-Large.png"
                  alt="Waipapa Taumata Rau - University of Auckland"
                  className="h-16 w-auto"
                />
              </a>
            </div>

            {/* Footer Links - Following Research Hub pattern */}
            <div className="flex-1">
              <nav className="flex flex-wrap items-center gap-x-1 gap-y-2 text-sm">
                {footerLinks.map((link, index) => (
                  <span key={link.href} className="flex items-center">
                    <a 
                      href={link.href}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-white/80 hover:text-white hover:underline transition-colors whitespace-nowrap"
                    >
                      {link.label}
                    </a>
                    {index < footerLinks.length - 1 && (
                      <span className="mx-2 text-white/40">|</span>
                    )}
                  </span>
                ))}
                <span className="mx-2 text-white/40">|</span>
                <span className="text-white/80 whitespace-nowrap">
                  Copyright © {new Date().getFullYear()}
                </span>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
