import Link from "next/link";

const routes = [
  {
    href: "/products",
    label: "All Products",
  },
  {
    href: "/categories/t-shirts",
    label: "T-Shirts",
  },
  {
    href: "/categories/jeans",
    label: "Jeans",
  },
  {
    href: "/categories/shoes",
    label: "Shoes",
  },
];

export function MainNav() {
  return (
    <nav className="hidden gap-6 md:flex">
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className="flex items-center text-sm font-medium transition-colors hover:text-primary"
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
}
