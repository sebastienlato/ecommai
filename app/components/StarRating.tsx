import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: number;
}

export function StarRating({
  rating,
  maxRating = 5,
  size = 16,
}: StarRatingProps) {
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(maxRating)].map((_, i) => (
        <Star
          key={i}
          size={size}
          className={`${
            i < rating
              ? "fill-yellow-400 text-yellow-400"
              : "fill-gray-200 text-gray-200"
          }`}
        />
      ))}
      <span className="ml-2 text-sm text-muted-foreground">({rating})</span>
    </div>
  );
}
