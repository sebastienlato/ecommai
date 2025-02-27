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
    <footer className="border-t">
      <div className="container flex flex-col gap-8 py-8">
        <div className="flex flex-col gap-6 md:flex-row md:justify-between">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Shop</h3>
            <nav className="flex flex-col gap-2">
              {links.shop.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm hover:underline"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Account</h3>
            <nav className="flex flex-col gap-2">
              {links.account.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm hover:underline"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Legal</h3>
            <nav className="flex flex-col gap-2">
              {links.legal.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm hover:underline"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
        <div className="flex flex-col gap-4 md:flex-row md:justify-between">
          <p className="text-sm text-muted-foreground">
            © 2024 ECOMMAI. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="https://twitter.com" target="_blank" rel="noreferrer">
              <Twitter className="h-5 w-5" />
            </Link>
            <Link href="https://github.com" target="_blank" rel="noreferrer">
              <Github className="h-5 w-5" />
            </Link>
            <Link href="https://linkedin.com" target="_blank" rel="noreferrer">
              <Linkedin className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
