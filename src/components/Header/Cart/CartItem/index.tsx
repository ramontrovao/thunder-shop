import { CartContext } from "@/src/contexts/cartContext";
import { parseToBrl } from "@/src/utils/parseToBrl";
import Image from "next/image";
import { useContext } from "react";
import {
  CartItemContainer,
  CartItemImageContainer,
  CartItemInfosContainer,
} from "./styles";

interface CartItemProps {
  productName: string;
  productPrice: string;
  productImg: string;
  productId: string;
}

export function CartItem({
  productName,
  productPrice,
  productImg,
  productId,
}: CartItemProps) {
  const { handleRemoveProduct } = useContext(CartContext);

  return (
    <CartItemContainer>
      <CartItemImageContainer>
        <Image src={productImg} width={95} height={95} alt="" />
      </CartItemImageContainer>

      <CartItemInfosContainer>
        <span>{productName}</span>
        <strong>{parseToBrl(Number(productPrice))}</strong>
        <button onClick={() => handleRemoveProduct(productId)}>Remover</button>
      </CartItemInfosContainer>
    </CartItemContainer>
  );
}
