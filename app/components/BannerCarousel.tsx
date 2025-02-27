import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const banners = [
  {
    id: 1,
    src: "/images/banner1.jpg",
    alt: "Banner 1",
    title: "New Arrivals",
    description: "Check out our latest collection of amazing products",
  },
  {
    id: 2,
    src: "/images/banner2.jpg",
    alt: "Banner 2",
    title: "Summer Collection",
    description: "Discover our new summer styles and trends",
  },
  {
    id: 3,
    src: "/images/banner3.jpg",
    alt: "Banner 3",
    title: "Special Offers",
    description: "Get up to 50% off on selected items",
  },
];

export function BannerCarousel() {
  return (
    <div className="px-4">
      <Carousel className="relative w-full">
        <CarouselContent>
          {banners.map((banner) => (
            <CarouselItem key={banner.id}>
              <div className="group relative h-[600px] w-full overflow-hidden rounded-lg">
                {/* Image */}
                <Image
                  src={banner.src}
                  alt={banner.alt}
                  fill
                  className="object-cover"
                  priority={banner.id === 1}
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />

                {/* Content */}
                <div className="absolute bottom-12 left-16 max-w-xl text-white">
                  <h2 className="text-6xl font-bold tracking-tight">
                    {banner.title}
                  </h2>
                  <p className="mt-4 text-xl font-light text-gray-100">
                    {banner.description}
                  </p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-8 top-1/2 h-12 w-12 -translate-y-1/2 rounded-full border-2 border-white bg-black/20 hover:bg-black/40" />
        <CarouselNext className="absolute right-8 top-1/2 h-12 w-12 -translate-y-1/2 rounded-full border-2 border-white bg-black/20 hover:bg-black/40" />
      </Carousel>
    </div>
  );
}
