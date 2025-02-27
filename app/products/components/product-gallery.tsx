"use client";

import Image from "next/image";
import { useState } from "react";

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export default function ProductGallery({
  images,
  productName,
}: ProductGalleryProps) {
  const [currentImage, setCurrentImage] = useState(0);

  // If no images provided, show placeholder
  if (images.length === 0) {
    return (
      <div className="relative">
        <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg">
          <Image
            src="/placeholder.png"
            alt={productName}
            className="object-cover object-center"
            width={600}
            height={600}
            priority
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Main image */}
      <div className="relative">
        <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg">
          <Image
            src={images[currentImage]}
            alt={`${productName} - Image ${currentImage + 1}`}
            className="object-cover object-center transition-opacity duration-300"
            width={600}
            height={600}
            priority
          />
        </div>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-4 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`relative flex-none overflow-hidden rounded-md ${
                currentImage === index
                  ? "ring-2 ring-indigo-600"
                  : "ring-1 ring-gray-200"
              }`}
              style={{ width: "80px", height: "80px" }}
            >
              <Image
                src={image}
                alt={`${productName} - Thumbnail ${index + 1}`}
                className={`object-cover object-center transition-opacity duration-300 ${
                  currentImage === index
                    ? "opacity-100"
                    : "opacity-60 hover:opacity-100"
                }`}
                fill
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
