import { Handbag, X } from "phosphor-react";
import * as Dialog from "@radix-ui/react-dialog";
import { CartItem } from "./CartItem";
import {
  AddToCartButton,
  NumberOfCartItems,
  CartContainer,
  TitleCardContainer,
  CloseButton,
  CartItems,
  OrderInfosContainer,
  OrderInfosResume,
  OrderInfosSubmitButton,
  CartNotFilled,
} from "./styles";
import { CartContext } from "@/src/contexts/cartContext";
import { useContext, useEffect, useState } from "react";
import { parseToBrl } from "@/src/utils/parseToBrl";

export function Cart() {
  const { products, handleBuyProducts, isCreatingCheckoutSession } =
    useContext(CartContext);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    if (products.length > 0) {
      const priceSum = products
        .map((prod) => prod.price)
        .reduce((acc, curr) => acc + curr);

      return setTotalPrice(Number(priceSum));
    }
    return setTotalPrice(0);
  }, [products]);

  return (
    <Dialog.Root>
      <div>
        <AddToCartButton>
          <Handbag size={25} />
        </AddToCartButton>
        <NumberOfCartItems>{products.length}</NumberOfCartItems>
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
            {products.length === 0 ? (
              <CartNotFilled>Essa não! O carrinho está vazio! D:</CartNotFilled>
            ) : (
              products.map(({ name, id, price, imageUrl }, index) => (
                <CartItem
                  productName={name}
                  productPrice={price}
                  productImg={imageUrl}
                  productId={id}
                  key={index}
                />
              ))
            )}
          </CartItems>

          <OrderInfosContainer>
            <OrderInfosResume>
              <div>
                <span>Quantidade</span>
                <span>{products.length} itens</span>
              </div>

              <div>
                <strong>Valor Total</strong>
                <strong>{parseToBrl(totalPrice)}</strong>
              </div>
            </OrderInfosResume>

            <OrderInfosSubmitButton
              onClick={handleBuyProducts}
              disabled={isCreatingCheckoutSession}
            >
              Finalizar Compra
            </OrderInfosSubmitButton>
          </OrderInfosContainer>
        </CartContainer>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
