"use client";

import { useState } from "react";
import QuantitySelector from "./quantity-selector";
import AddToCartButton from "./add-to-cart-button";

interface ProductActionsProps {
  productId: string;
  stock: number;
}

export default function ProductActions({
  productId,
  stock,
}: ProductActionsProps) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="flex items-center gap-4">
      <QuantitySelector
        quantity={quantity}
        onChange={setQuantity}
        max={Math.min(10, stock)}
      />
      <AddToCartButton
        productId={productId}
        stock={stock}
        quantity={quantity}
      />
    </div>
  );
}
