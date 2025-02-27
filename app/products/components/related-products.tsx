"use client";

import Image from "next/image";
import Link from "next/link";
import { Product as PrismaProduct } from "@prisma/client";
import { StarIcon } from "@heroicons/react/20/solid";

interface Product extends PrismaProduct {
  rating: number;
  numReviews: number;
}

interface RelatedProductsProps {
  products: Product[];
  currentProductId: string;
}

export default function RelatedProducts({
  products,
  currentProductId,
}: RelatedProductsProps) {
  // Filter out the current product
  const relatedProducts = products.filter(
    (product) => product.id !== currentProductId
  );

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold tracking-tight text-gray-900">
        Related Products
      </h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {relatedProducts.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.id}`}
            className="group"
          >
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg">
              <Image
                src={product.images[0]}
                alt={product.name}
                width={500}
                height={500}
                className="h-full w-full object-cover object-center group-hover:opacity-75"
              />
            </div>
            <div className="mt-4 space-y-1">
              <h3 className="text-sm text-gray-700">{product.name}</h3>
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={`h-4 w-4 ${
                        rating < Math.floor(product.rating || 0)
                          ? "text-yellow-400"
                          : "text-gray-200"
                      }`}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="ml-1 text-sm text-gray-500">
                  ({product.numReviews || 0})
                </p>
              </div>
              <p className="text-sm font-medium text-gray-900">
                ${product.price.toFixed(2)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
