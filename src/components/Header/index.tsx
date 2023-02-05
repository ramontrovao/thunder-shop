import Image from "next/image";
import Link from "next/link";
import {
  HeaderContainer,
  AddToCartButton,
  NumberOfCartItems,
  CartContainer,
  TitleCardContainer,
  CloseButton,
  CartItems,
  OrderInfosContainer,
  OrderInfosResume,
  OrderInfosSubmitButton,
} from "./styles";
import logoImg from "../../assets/logo.svg";
import { Handbag, X } from "phosphor-react";
import * as Dialog from "@radix-ui/react-dialog";
import { CartItem } from "./CartItem";

export function Header() {
  return (
    <HeaderContainer>
      <Link href={"/"}>
        <Image src={logoImg} alt="" />
      </Link>

      <Dialog.Root>
        <div>
          <AddToCartButton>
            <Handbag size={25} />
          </AddToCartButton>
          <NumberOfCartItems>1</NumberOfCartItems>
        </div>

        <Dialog.Portal>
          <CartContainer>
            <TitleCardContainer>
              <Dialog.Title>Carrinho de compras</Dialog.Title>
              <CloseButton>
                <X size={25} />
              </CloseButton>
            </TitleCardContainer>

            <CartItems>
              <CartItem />
              <CartItem />
              <CartItem />
            </CartItems>

            <OrderInfosContainer>
              <OrderInfosResume>
                <div>
                  <span>Quantidade</span>
                  <span>3 itens</span>
                </div>

                <div>
                  <strong>Valor Total</strong>
                  <strong>R$ 270,00</strong>
                </div>
              </OrderInfosResume>

              <OrderInfosSubmitButton>Finalizar Compra</OrderInfosSubmitButton>
            </OrderInfosContainer>
          </CartContainer>
        </Dialog.Portal>
      </Dialog.Root>
    </HeaderContainer>
  );
}
