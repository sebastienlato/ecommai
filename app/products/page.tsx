import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { unstable_noStore as noStore } from "next/cache";
import { use } from "react";
import ProductGrid from "@/app/products/components/product-grid";
import ProductSidebar from "@/app/products/components/product-sidebar";

// Add dynamic route segment config
export const dynamic = "force-dynamic";

interface ProductsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default function ProductsPage({ searchParams }: ProductsPageProps) {
  noStore();

  // Use the React 'use' hook to handle async searchParams
  const params = use(searchParams);

  // Safely extract search parameters
  const page = Number(params.page) || 1;
  const category = params.category?.toString();
  const sort = params.sort?.toString();
  const minPrice = params.minPrice?.toString();
  const maxPrice = params.maxPrice?.toString();
  const search = params.search?.toString();

  const take = 12; // Items per page
  const skip = (page - 1) * take;

  // Build filter conditions
  const where: Prisma.ProductWhereInput = {
    ...(category && {
      category: {
        slug: category,
      },
    }),
    ...(minPrice && {
      price: {
        gte: parseFloat(minPrice),
      },
    }),
    ...(maxPrice && {
      price: {
        lte: parseFloat(maxPrice),
      },
    }),
    ...(search && {
      OR: [
        { name: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ],
    }),
  };

  // Get products with filters and pagination
  const products = use(
    prisma.product.findMany({
      where,
      take,
      skip,
      orderBy: {
        ...(sort === "price_asc" && { price: "asc" }),
        ...(sort === "price_desc" && { price: "desc" }),
        ...((!sort || sort === "latest") && {
          createdAt: "desc",
        }),
      },
      include: {
        category: true,
      },
    })
  );

  // Get total count for pagination
  const totalProducts = use(prisma.product.count({ where }));
  const totalPages = Math.ceil(totalProducts / take);

  // Get all categories for the sidebar
  const categories = use(
    prisma.category.findMany({
      orderBy: {
        name: "asc",
      },
    })
  );

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-screen-2xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-[280px_1fr] lg:gap-x-8">
          {/* Filters */}
          <aside className="hidden lg:block space-y-6">
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-900">Category</h3>
              <ProductSidebar
                categories={categories}
                selectedCategory={category}
                selectedSort={sort}
                minPrice={minPrice}
                maxPrice={maxPrice}
              />
            </div>
          </aside>

          {/* Product grid */}
          <div className="mt-6 lg:mt-0">
            <ProductGrid
              products={products}
              currentPage={page}
              totalPages={totalPages}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
