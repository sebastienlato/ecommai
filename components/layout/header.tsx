import Link from "next/link";
import { Search, ShoppingCart, User } from "lucide-react";
import { auth } from "@/auth";

import { Button } from "@/components/ui/button";
import { MainNav } from "@/components/layout/main-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import SearchBar from "@/components/layout/search-bar";

export default async function Header() {
  const session = await auth();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="inline-block font-bold">ECOMAI</span>
          </Link>
          <MainNav />
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <div className="hidden w-full max-w-xl lg:flex">
            <SearchBar />
          </div>
          <nav className="flex items-center space-x-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              className="mr-6 hidden lg:flex"
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
              <Button variant="ghost" size="icon" aria-label="User Account">
                <User className="h-5 w-5" />
              </Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
