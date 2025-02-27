import Link from "next/link";
import { Search, ShoppingCart } from "lucide-react";
import { auth } from "@/auth";

import { Button } from "@/components/ui/button";
import SearchBar from "@/components/layout/search-bar";

export default async function Header() {
  const session = await auth();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center">
            <span className="text-lg font-bold">ECOMMAI</span>
          </Link>
          <Link
            href="/products"
            className="hidden text-sm text-muted-foreground transition-colors hover:text-foreground md:block"
          >
            Products Catalog
          </Link>
        </div>

        <div className="hidden flex-1 max-w-xl px-6 lg:block">
          <SearchBar />
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </Button>
          <Link href="/cart">
            <Button variant="ghost" size="icon" aria-label="Shopping Cart">
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </Link>
          <Link href={session ? "/dashboard" : "/auth/login"}>
            <Button variant="default" size="sm">
              {session ? "Dashboard" : "Sign In"}
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
