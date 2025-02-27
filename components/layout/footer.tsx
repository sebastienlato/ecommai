import Link from "next/link";
import { Facebook, Twitter, Instagram } from "lucide-react";

const links = {
  shop: [
    { href: "/products", label: "All Products" },
    { href: "/categories", label: "Categories" },
    { href: "/deals", label: "Deals" },
  ],
  customerService: [
    { href: "/contact", label: "Contact Us" },
    { href: "/shipping", label: "Shipping Information" },
    { href: "/returns", label: "Returns & Exchanges" },
  ],
  about: [
    { href: "/about", label: "About Us" },
    { href: "/careers", label: "Careers" },
    { href: "/privacy", label: "Privacy Policy" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Shop Column */}
          <div>
            <h3 className="text-base font-semibold text-gray-900">Shop</h3>
            <ul className="mt-4 space-y-3">
              {links.shop.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-base text-gray-600 hover:text-gray-900"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service Column */}
          <div>
            <h3 className="text-base font-semibold text-gray-900">
              Customer Service
            </h3>
            <ul className="mt-4 space-y-3">
              {links.customerService.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-base text-gray-600 hover:text-gray-900"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About Column */}
          <div>
            <h3 className="text-base font-semibold text-gray-900">About</h3>
            <ul className="mt-4 space-y-3">
              {links.about.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-base text-gray-600 hover:text-gray-900"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect With Us Column */}
          <div>
            <h3 className="text-base font-semibold text-gray-900">
              Connect With Us
            </h3>
            <div className="mt-4 flex space-x-6">
              <Link
                href="https://facebook.com"
                className="text-gray-600 hover:text-gray-900"
                target="_blank"
                rel="noreferrer"
              >
                <Facebook className="h-6 w-6" />
              </Link>
              <Link
                href="https://twitter.com"
                className="text-gray-600 hover:text-gray-900"
                target="_blank"
                rel="noreferrer"
              >
                <Twitter className="h-6 w-6" />
              </Link>
              <Link
                href="https://instagram.com"
                className="text-gray-600 hover:text-gray-900"
                target="_blank"
                rel="noreferrer"
              >
                <Instagram className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-8 text-center">
          <p className="text-base text-gray-600">
            © 2025 Ecommai. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
