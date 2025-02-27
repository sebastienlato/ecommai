import Image from "next/image";
import { prisma } from "@/lib/prisma";
import type { Product, Category } from "@prisma/client";

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
    <div className="flex flex-col gap-8 py-8">
      {/* Banner Carousel */}
      <div className="relative h-[400px] w-full overflow-hidden rounded-lg">
        <Image
          src="/images/banner1.jpg"
          alt="Banner 1"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Latest Products */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Latest Products</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {latestProducts.map((product: ProductWithCategory) => (
            <div
              key={product.id}
              className="group overflow-hidden rounded-lg border"
            >
              <div className="relative h-64">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium">{product.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {product.category.name}
                </p>
                <p className="mt-2 font-medium">${product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
