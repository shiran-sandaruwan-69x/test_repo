import React from "react";
import { motion } from "framer-motion";
import { Github, Twitter, Linkedin, Mail, Heart } from "lucide-react";

interface FooterProps {
  links?: Array<{ label: string; href: string }>;
  socialLinks?: Array<{
    type: "github" | "twitter" | "linkedin" | "mail";
    href: string;
  }>;
  copyrightText?: string;
}

const Footer = ({
  links = [
    { label: "Home", href: "/" },
    { label: "Features", href: "#features" },
    { label: "Documentation", href: "#docs" },
    { label: "Examples", href: "#examples" },
    { label: "Pricing", href: "#pricing" },
  ],
  socialLinks = [
    { type: "github", href: "https://github.com" },
    { type: "twitter", href: "https://twitter.com" },
    { type: "linkedin", href: "https://linkedin.com" },
    { type: "mail", href: "mailto:info@example.com" },
  ],
  copyrightText = "© 2023 Magic UI. All rights reserved.",
}: FooterProps) => {
  const socialIcons = {
    github: <Github className="h-5 w-5" />,
    twitter: <Twitter className="h-5 w-5" />,
    linkedin: <Linkedin className="h-5 w-5" />,
    mail: <Mail className="h-5 w-5" />,
  };

  return (
    <footer className="w-full bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and tagline */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-purple-600 mr-2" />
              <span className="text-white font-bold text-xl">Magic UI</span>
            </div>
            <p className="text-gray-400 text-sm">
              A sleek, modern UI design system with smooth animations and
              transitions.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-white font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              {links.map((link, index) => (
                <li key={index}>
                  <motion.a
                    href={link.href}
                    className="text-gray-400 hover:text-purple-400 transition-colors duration-200 text-sm"
                    whileHover={{ x: 5 }}
                  >
                    {link.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social links */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-white font-semibold">Connect With Us</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-purple-400 transition-colors duration-200"
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {socialIcons[social.type]}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom section with copyright */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">{copyrightText}</p>
          <div className="mt-4 md:mt-0 flex items-center text-gray-500 text-sm">
            <span>Made with</span>
            <Heart className="h-4 w-4 mx-1 text-red-500" />
            <span>for developers</span>
          </div>
        </div>

        {/* Subtle gradient accent at the bottom */}
        <div className="h-1 w-full mt-8 bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 rounded-full" />
      </div>
    </footer>
  );
};

export default Footer;
