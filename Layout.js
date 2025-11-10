import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Menu, X } from "lucide-react";

const navigation = [
  { name: "Home", href: "Home" },
  { name: "Services", href: "Services" },
  { name: "Contact", href: "Contact" },
];

export default function Layout({ children }) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <style>{`
        :root {
          --navy: #1e3a8a;
          --navy-light: #2563eb;
          --navy-dark: #1e293b;
          --grey: #64748b;
          --grey-light: #94a3b8;
          --grey-dark: #475569;
        }
      `}</style>

      {/* Navigation */}
      <nav className="border-b border-gray-100 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link 
              to={createPageUrl("Home")} 
              className="text-xl font-semibold text-[var(--navy-dark)] tracking-tight hover:text-[var(--navy)] transition-colors"
            >
              Jennifer Harmon Consulting
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navigation.map((item) => {
                const isActive = location.pathname === createPageUrl(item.href);
                return (
                  <Link
                    key={item.name}
                    to={createPageUrl(item.href)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? "text-[var(--navy)] bg-blue-50"
                        : "text-[var(--grey)] hover:text-[var(--navy-dark)] hover:bg-gray-50"
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-lg text-[var(--grey)] hover:bg-gray-50"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-100">
              {navigation.map((item) => {
                const isActive = location.pathname === createPageUrl(item.href);
                return (
                  <Link
                    key={item.name}
                    to={createPageUrl(item.href)}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-4 py-3 text-base font-medium rounded-lg mb-1 ${
                      isActive
                        ? "text-[var(--navy)] bg-blue-50"
                        : "text-[var(--grey)] hover:bg-gray-50"
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-white mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center space-y-4">
            <p className="text-2xl font-semibold text-[var(--navy-dark)]">
              Jennifer Harmon Consulting
            </p>
            <p className="text-sm text-[var(--grey)]">
              © {new Date().getFullYear()} Jennifer Harmon Consulting. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
