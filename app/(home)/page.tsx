import Image from "next/image";
import { prisma } from "@/lib/prisma";
import type { Product, Category } from "@prisma/client";
import { BannerCarousel } from "@/app/components/BannerCarousel";
import { StarRating } from "@/app/components/StarRating";
import { Button } from "@/components/ui/button";

type ProductWithCategory = Product & {
  category: Category;
};

export default async function Home() {
  const latestProducts = await prisma.product.findMany({
    take: 8,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      category: true,
    },
  });

  return (
    <div className="flex flex-col">
      <div className="pt-4">
        <BannerCarousel />
      </div>

      {/* Latest Products */}
      <div className="px-4 pt-8">
        <h2 className="mb-4 text-2xl font-bold">Latest Products</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {latestProducts.map((product: ProductWithCategory) => (
            <div
              key={product.id}
              className="group rounded-lg border border-gray-200 bg-white"
            >
              <div className="relative aspect-square overflow-hidden bg-gray-50">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-base font-semibold text-gray-900">
                  {product.name}
                </h3>
                <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                  {product.description}
                </p>
                <div className="mt-2">
                  <StarRating rating={0} />
                </div>
                <p className="mt-4 text-lg font-bold">
                  ${product.price.toFixed(2)}
                </p>
                <Button
                  variant="default"
                  className="mt-3 w-full bg-black text-white hover:bg-gray-900"
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
