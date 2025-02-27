import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { StarIcon } from "@heroicons/react/20/solid";
import Reviews from "@/app/products/components/reviews";
import RelatedProducts from "@/app/products/components/related-products";
import ProductActions from "@/app/products/components/product-actions";
import { unstable_noStore as noStore } from "next/cache";
import ProductGallery from "@/app/products/components/product-gallery";
import { Product } from "@prisma/client";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
}

interface ProductWithCategory extends Omit<Product, "rating" | "numReviews"> {
  category: Category;
  rating?: number;
  numReviews?: number;
}

async function getProduct(id: string) {
  const product = await prisma.product.findUnique({
    where: { id },
    include: { category: true },
  });

  if (!product) {
    return null;
  }

  return product as ProductWithCategory;
}

async function getRelatedProducts(categoryId: string, productId: string) {
  return prisma.product.findMany({
    where: {
      categoryId,
      NOT: { id: productId },
    },
    take: 4,
  });
}

export default async function ProductPage({ params }: Props) {
  noStore();
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(
    product.categoryId,
    product.id
  );
  const rating = product.rating || 0;
  const numReviews = product.numReviews || 0;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
        {/* Image gallery */}
        <ProductGallery images={product.images} productName={product.name} />

        {/* Product info */}
        <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            {product.name}
          </h1>

          <div className="mt-3">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl tracking-tight text-gray-900">
              ${product.price.toFixed(2)}
            </p>
          </div>

          {/* Reviews */}
          <div className="mt-3">
            <div className="flex items-center">
              <div className="flex items-center">
                {[0, 1, 2, 3, 4].map((r) => (
                  <StarIcon
                    key={r}
                    className={`h-5 w-5 ${
                      r < Math.floor(rating)
                        ? "text-yellow-400"
                        : "text-gray-200"
                    }`}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <p className="ml-2 text-sm text-gray-500">{numReviews} reviews</p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="sr-only">Description</h3>
            <p className="space-y-6 text-base text-gray-700">
              {product.description}
            </p>
          </div>

          <div className="mt-6">
            {/* Stock status */}
            <div className="mb-4">
              <p className="text-sm text-gray-700">
                Status:{" "}
                <span
                  className={`font-medium ${
                    product.stock > 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {product.stock > 0 ? "In stock" : "Out of stock"}
                </span>
              </p>
            </div>

            {product.stock > 0 && (
              <ProductActions productId={product.id} stock={product.stock} />
            )}
          </div>
        </div>
      </div>

      {/* Product reviews */}
      <div className="mx-auto mt-16 max-w-2xl lg:max-w-none">
        <Reviews productId={product.id} />
      </div>

      {/* Related products */}
      <div className="mx-auto mt-16 max-w-2xl lg:max-w-none">
        <RelatedProducts
          products={relatedProducts}
          currentProductId={product.id}
        />
      </div>
    </div>
  );
}
