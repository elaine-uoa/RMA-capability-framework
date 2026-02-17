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
    <footer className="w-full bg-[#050505] text-white no-print">
      <div className="w-full" style={{ padding: '40px 0' }}>
        <div style={{ padding: '0 32px' }}>
          <nav className="flex flex-wrap items-center justify-center text-sm" style={{ gap: '4px 8px' }}>
            {footerLinks.map((link, index) => (
              <span key={link.href} className="flex items-center">
                <a 
                  href={link.href}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:underline transition-colors whitespace-nowrap"
                  style={{ padding: '4px 0', color: '#FFFFFF' }}
                >
                  {link.label}
                </a>
                {index < footerLinks.length - 1 && (
                  <span className="text-white" style={{ margin: '0 10px' }}>|</span>
                )}
              </span>
            ))}
            <span className="text-white" style={{ margin: '0 10px' }}>|</span>
            <span className="text-white whitespace-nowrap">
              Copyright © {new Date().getFullYear()}
            </span>
          </nav>
        </div>
      </div>
    </footer>
  );
}
