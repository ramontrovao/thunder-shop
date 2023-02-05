import Image from "next/image";
import teste from "../../../assets/teste.svg";
import {
  CartItemContainer,
  CartItemImageContainer,
  CartItemInfosContainer,
} from "./styles";

export function CartItem() {
  return (
    <CartItemContainer>
      <CartItemImageContainer>
        <Image src={teste} width={95} height={95} alt="" />
      </CartItemImageContainer>

      <CartItemInfosContainer>
        <span>Camiseta Beyond the Limits</span>
        <strong>R$79,90</strong>
        <button>Remover</button>
      </CartItemInfosContainer>
    </CartItemContainer>
  );
}
