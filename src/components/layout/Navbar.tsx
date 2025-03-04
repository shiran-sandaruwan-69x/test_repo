import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import { Button } from "../ui/button";

interface NavbarProps {
  logo?: string;
  navItems?: Array<{
    label: string;
    href?: string;
    dropdown?: Array<{
      label: string;
      href: string;
      description?: string;
    }>;
  }>;
}

const Navbar = ({
  logo = "Magic UI",
  navItems = [
    { label: "Home", href: "/" },
    {
      label: "Components",
      dropdown: [
        {
          label: "Cards",
          href: "/components/cards",
          description: "Interactive card components with animations",
        },
        {
          label: "Buttons",
          href: "/components/buttons",
          description: "Customizable button styles with hover effects",
        },
        {
          label: "Forms",
          href: "/components/forms",
          description: "Form components with validation and animations",
        },
      ],
    },
    { label: "Examples", href: "/examples" },
    { label: "Documentation", href: "/docs" },
  ],
}: NavbarProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-gray-900 border-b border-gray-800 backdrop-blur-sm bg-opacity-80"
    >
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-600"
          >
            {logo}
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          <NavigationMenu className="bg-transparent">
            <NavigationMenuList>
              {navItems.map((item, index) => {
                // If the item has a dropdown menu
                if (item.dropdown) {
                  return (
                    <NavigationMenuItem key={index}>
                      <NavigationMenuTrigger className="bg-transparent text-gray-300 hover:text-white hover:bg-gray-800">
                        {item.label}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="w-[400px] p-4 bg-gray-900 border border-gray-800 rounded-md"
                        >
                          <ul className="grid gap-3">
                            {item.dropdown.map(
                              (dropdownItem, dropdownIndex) => (
                                <li key={dropdownIndex}>
                                  <NavigationMenuLink asChild>
                                    <Link
                                      to={dropdownItem.href}
                                      className="block p-3 space-y-1 rounded-md hover:bg-gray-800 transition-colors"
                                    >
                                      <div className="text-white font-medium">
                                        {dropdownItem.label}
                                      </div>
                                      {dropdownItem.description && (
                                        <p className="text-sm text-gray-400">
                                          {dropdownItem.description}
                                        </p>
                                      )}
                                    </Link>
                                  </NavigationMenuLink>
                                </li>
                              ),
                            )}
                          </ul>
                        </motion.div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  );
                }

                // Regular menu item with no dropdown
                return (
                  <NavigationMenuItem key={index}>
                    <Link to={item.href || "/"}>
                      <NavigationMenuLink className="text-gray-300 hover:text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors">
                        {item.label}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>

          <Button className="ml-4 bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white border-none">
            Get Started
          </Button>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-gray-300 hover:text-white hover:bg-gray-800"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-gray-900 border-b border-gray-800"
          >
            <div className="container mx-auto px-4 py-4">
              <ul className="space-y-2">
                {navItems.map((item, index) => (
                  <li key={index}>
                    {item.dropdown ? (
                      <MobileDropdown item={item} />
                    ) : (
                      <Link
                        to={item.href || "/"}
                        className="block py-2 px-3 text-gray-300 hover:text-white hover:bg-gray-800 rounded-md transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
                <li>
                  <Button className="w-full mt-4 bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white border-none">
                    Get Started
                  </Button>
                </li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

// Mobile dropdown component
const MobileDropdown = ({
  item,
}: {
  item: {
    label: string;
    dropdown?: Array<{
      label: string;
      href: string;
      description?: string;
    }>;
  };
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full py-2 px-3 text-gray-300 hover:text-white hover:bg-gray-800 rounded-md transition-colors"
      >
        <span>{item.label}</span>
        <ChevronDown
          className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence>
        {isOpen && item.dropdown && (
          <motion.ul
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="ml-4 mt-1 space-y-1 overflow-hidden"
          >
            {item.dropdown.map((dropdownItem, dropdownIndex) => (
              <motion.li
                key={dropdownIndex}
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: dropdownIndex * 0.05 }}
              >
                <Link
                  to={dropdownItem.href}
                  className="block py-2 px-3 text-gray-400 hover:text-white hover:bg-gray-800 rounded-md transition-colors"
                >
                  <div>{dropdownItem.label}</div>
                  {dropdownItem.description && (
                    <p className="text-xs text-gray-500 mt-1">
                      {dropdownItem.description}
                    </p>
                  )}
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
