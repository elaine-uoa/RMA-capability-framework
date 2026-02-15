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
    <footer className="w-full bg-[#0c0c48] text-white no-print">
      <div className="w-full" style={{ padding: '40px 0' }}>
        {/* Main footer content */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between" style={{ gap: '32px' }}>
          {/* UoA Official Logo */}
          <div className="flex-shrink-0" style={{ paddingLeft: '32px' }}>
            <a 
              href="https://www.auckland.ac.nz" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block hover:opacity-90 transition-opacity"
            >
              <img
                src="/uoa_corporate_branding/Primary Logo_PNG/Large Primary Logo_PNG/UoA-Logo-Primary-RGB-Reversed-Large.png"
                alt="Waipapa Taumata Rau - University of Auckland"
                style={{ height: '64px', width: 'auto' }}
              />
            </a>
          </div>

          {/* Footer Links */}
          <div className="flex-1" style={{ padding: '0 32px' }}>
            <nav className="flex flex-wrap items-center text-sm" style={{ gap: '4px 8px' }}>
              {footerLinks.map((link, index) => (
                <span key={link.href} className="flex items-center">
                  <a 
                    href={link.href}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-white/80 hover:text-white hover:underline transition-colors whitespace-nowrap"
                    style={{ padding: '4px 0' }}
                  >
                    {link.label}
                  </a>
                  {index < footerLinks.length - 1 && (
                    <span className="text-white/40" style={{ margin: '0 10px' }}>|</span>
                  )}
                </span>
              ))}
              <span className="text-white/40" style={{ margin: '0 10px' }}>|</span>
              <span className="text-white/80 whitespace-nowrap">
                Copyright © {new Date().getFullYear()}
              </span>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
