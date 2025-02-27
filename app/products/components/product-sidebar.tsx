"use client";

import { Category } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Icons } from "@/app/components/icons";

interface ProductSidebarProps {
  categories: Category[];
  selectedCategory?: string;
  selectedSort?: string;
  minPrice?: string;
  maxPrice?: string;
}

export default function ProductSidebar({
  categories,
  selectedCategory,
  selectedSort,
  minPrice,
  maxPrice,
}: ProductSidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentMinPrice = Number(minPrice) || 0;
  const currentMaxPrice = Number(maxPrice) || 1000;

  function onSubmit() {
    const params = new URLSearchParams(searchParams.toString());

    if (selectedCategory && selectedCategory !== "all") {
      params.set("category", selectedCategory);
    } else {
      params.delete("category");
    }

    if (selectedSort && selectedSort !== "latest") {
      params.set("sort", selectedSort);
    } else {
      params.delete("sort");
    }

    if (currentMinPrice > 0) {
      params.set("minPrice", currentMinPrice.toString());
    } else {
      params.delete("minPrice");
    }

    if (currentMaxPrice < 1000) {
      params.set("maxPrice", currentMaxPrice.toString());
    } else {
      params.delete("maxPrice");
    }

    router.push(`/products?${params.toString()}`);
  }

  function onReset() {
    router.push("/products");
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Select
          value={selectedCategory || "all"}
          onValueChange={(value) => {
            const params = new URLSearchParams(searchParams.toString());
            if (value === "all") {
              params.delete("category");
            } else {
              params.set("category", value);
            }
            router.push(`/products?${params.toString()}`);
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">
              <div className="flex items-center gap-2">
                <Icons.layers className="h-4 w-4" />
                <span>All Categories</span>
              </div>
            </SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.slug}>
                <div className="flex items-center gap-2">
                  <Icons.tag className="h-4 w-4" />
                  <span>{category.name}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-900">Price Range</h3>
        <div className="space-y-4">
          <Slider
            defaultValue={[currentMinPrice, currentMaxPrice]}
            max={1000}
            step={1}
            onValueChange={([min, max]) => {
              const params = new URLSearchParams(searchParams.toString());
              if (min > 0) {
                params.set("minPrice", min.toString());
              } else {
                params.delete("minPrice");
              }
              if (max < 1000) {
                params.set("maxPrice", max.toString());
              } else {
                params.delete("maxPrice");
              }
              router.push(`/products?${params.toString()}`);
            }}
          />
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>${currentMinPrice}</span>
            <span>${currentMaxPrice}</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-900">Sort By</h3>
        <Select
          value={selectedSort || "latest"}
          onValueChange={(value) => {
            const params = new URLSearchParams(searchParams.toString());
            if (value === "latest") {
              params.delete("sort");
            } else {
              params.set("sort", value);
            }
            router.push(`/products?${params.toString()}`);
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Default" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="latest">Default</SelectItem>
            <SelectItem value="price_asc">Price: Low to High</SelectItem>
            <SelectItem value="price_desc">Price: High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        <Button onClick={onSubmit} className="w-full">
          Apply Filters
        </Button>
        <Button onClick={onReset} variant="outline" className="w-full">
          Reset Filters
        </Button>
      </div>
    </div>
  );
}
