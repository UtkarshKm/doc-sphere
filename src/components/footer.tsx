"use client";
import Link from 'next/link';

// Type definitions for the footer component
interface SocialLink {
  href: string;
  label: string;
  icon: React.ReactNode;
  hoverColor: string;
}

interface FooterProps {
  creatorName?: string;
  socialLinks?: SocialLink[];
  showCopyright?: boolean;
  className?: string;
}

// Social media icons components with brand colors
const LinkedInIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const XIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

// Default social links with brand-specific colors
const defaultSocialLinks: SocialLink[] = [
  {
    href: "https://www.linkedin.com/in/utkarshkm/",
    label: "LinkedIn Profile",
    icon: <LinkedInIcon />,
    hoverColor: "hover:text-[#0077B5]" // LinkedIn blue
  },
  {
    href: "https://x.com/UtkKumawat",
    label: "X (Twitter) Profile", 
    icon: <XIcon />,
    hoverColor: "hover:text-white" // X (Twitter) white/black
  }
];

// Main Footer Component
export const Footer: React.FC<FooterProps> = ({
  creatorName = "Utkarsh",
  socialLinks = defaultSocialLinks,
  showCopyright = true,
  className = ""
}) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`bg-gray-900 text-white py-6 px-4 mt-auto border-t border-gray-700 ${className}`}>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        
        {/* Creator Info */}
        <div className="text-center md:text-left">
          <p className="flex items-center justify-center md:justify-start gap-2 text-sm">
            <span>Built with</span>
            <span className="text-red-400" role="img" aria-label="love">❤️</span>
            <span>by</span>
            <strong className="text-blue-400">{creatorName}</strong>
          </p>
          
          {showCopyright && (
            <p className="text-gray-400 text-xs mt-1">
              © {currentYear} | All rights reserved
            </p>
          )}
        </div>

        {/* Social Links */}
        <div className="flex gap-4" role="navigation" aria-label="Social media links">
          {socialLinks.map((link, index) => (
            <Link 
              key={index}
              href={link.href} 
              target="_blank"
              rel="noopener noreferrer"
              className={`text-gray-300 ${link.hoverColor} transition-all duration-300 p-2 hover:bg-gray-800 rounded-lg hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900`}
              aria-label={link.label}
            >
              {link.icon}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};

// Export individual icons for potential reuse
export { LinkedInIcon, XIcon };

// Export types for external use
export type { FooterProps, SocialLink };