"use client";

import Image from "next/image";
import Link from "next/link";
import { Product, Category } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { StarRating } from "@/components/star-rating";

interface ProductWithCategory extends Product {
  category: Category;
}

interface ProductGridProps {
  products: ProductWithCategory[];
  currentPage: number;
  totalPages: number;
}

export default function ProductGrid({
  products,
  currentPage,
  totalPages,
}: ProductGridProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="group relative overflow-hidden rounded-lg border bg-white shadow-sm transition-shadow hover:shadow-md"
          >
            <Link
              href={`/products/${product.id}`}
              className="block aspect-square"
            >
              <Image
                src={product.images[0]}
                alt={product.name}
                width={300}
                height={300}
                className="h-full w-full object-cover object-center transition-transform group-hover:scale-105"
              />
            </Link>
            <div className="p-4">
              <Link href={`/products/${product.id}`}>
                <h3 className="mb-2 text-base font-medium text-gray-900 line-clamp-1">
                  {product.name}
                </h3>
              </Link>
              <p className="mb-2 text-sm text-gray-600 line-clamp-2">
                {product.description}
              </p>
              <div className="mb-4 flex items-center gap-2">
                <StarRating rating={0} />
                <span className="text-sm text-gray-500">(0)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-lg font-medium text-gray-900">
                  ${product.price.toFixed(2)}
                </span>
                <Button size="sm">Add to Cart</Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === 1}
            onClick={() => {
              const searchParams = new URLSearchParams(window.location.search);
              searchParams.set("page", (currentPage - 1).toString());
              window.location.search = searchParams.toString();
            }}
          >
            Previous
          </Button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              size="sm"
              onClick={() => {
                const searchParams = new URLSearchParams(
                  window.location.search
                );
                searchParams.set("page", page.toString());
                window.location.search = searchParams.toString();
              }}
            >
              {page}
            </Button>
          ))}
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === totalPages}
            onClick={() => {
              const searchParams = new URLSearchParams(window.location.search);
              searchParams.set("page", (currentPage + 1).toString());
              window.location.search = searchParams.toString();
            }}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
