import Link from "next/link";
import { Github, Linkedin, Twitter } from "lucide-react";

const links = {
  shop: [
    { href: "/products", label: "All Products" },
    { href: "/categories", label: "Categories" },
    { href: "/cart", label: "Shopping Cart" },
  ],
  account: [
    { href: "/auth/login", label: "Login" },
    { href: "/auth/register", label: "Register" },
    { href: "/dashboard", label: "Dashboard" },
  ],
  legal: [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
    { href: "/about", label: "About Us" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-gray-200">
      <div className="mx-auto flex flex-col gap-6 px-4 py-6">
        <div className="flex flex-col gap-4 md:flex-row md:justify-between">
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-700">Shop</h3>
            <nav className="flex flex-col gap-2">
              {links.shop.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-700">Account</h3>
            <nav className="flex flex-col gap-2">
              {links.account.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-700">Legal</h3>
            <nav className="flex flex-col gap-2">
              {links.legal.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
        <div className="flex flex-col gap-4 border-t border-gray-200 pt-6 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-gray-500">
            © 2024 ECOMMAI. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="text-gray-500 hover:text-gray-700"
            >
              <Twitter className="h-4 w-4" />
            </Link>
            <Link
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="text-gray-500 hover:text-gray-700"
            >
              <Github className="h-4 w-4" />
            </Link>
            <Link
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="text-gray-500 hover:text-gray-700"
            >
              <Linkedin className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
