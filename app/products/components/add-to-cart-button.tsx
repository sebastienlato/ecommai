"use client";

interface AddToCartButtonProps {
  productId: string;
  stock: number;
  quantity: number;
}

export default function AddToCartButton(props: AddToCartButtonProps) {
  const { productId, stock, quantity } = props;

  const handleAddToCart = () => {
    // TODO: Implement add to cart functionality
    console.log("Adding to cart:", { productId, quantity });
  };

  return (
    <button
      type="button"
      onClick={handleAddToCart}
      className="flex-1 rounded-lg bg-black px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-900 disabled:cursor-not-allowed disabled:bg-gray-400"
      disabled={stock === 0}
    >
      Add to Cart
    </button>
  );
}
