import Link from "next/link";

const links = [
  { href: "/products", label: "All Products" },
  { href: "/t-shirts", label: "T-Shirts" },
  { href: "/jeans", label: "Jeans" },
  { href: "/shoes", label: "Shoes" },
];

interface MainNavProps {
  className?: string;
}

export function MainNav({ className }: MainNavProps) {
  return (
    <nav className={className}>
      <ul className="flex gap-6">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
