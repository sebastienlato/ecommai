import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";

export default function SearchBar() {
  return (
    <div className="relative w-full">
      <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input type="search" placeholder="Search products..." className="pl-9" />
    </div>
  );
}
