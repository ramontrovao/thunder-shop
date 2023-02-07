import axios from "axios";
import { createContext, ReactNode, useState } from "react";

type ProductType = {
  id: string;
  name: string;
  imageUrl: string;
  price: string;
  priceId: string;
};

type CartContextType = {
  isCreatingCheckoutSession: boolean;
  products: Array<ProductType>;
  handleAddProduct: (product: ProductType) => void;
  handleRemoveProduct: (productId: string) => void;
  handleBuyProducts: () => void;
};

interface CartContextProviderProps {
  children: ReactNode;
}

export const CartContext = createContext({} as CartContextType);

export function CartContextProvider({ children }: CartContextProviderProps) {
  const [cart, setCart] = useState(Array<ProductType>);
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false);

  function handleAddProduct(product: ProductType) {
    if (cart.find((item) => item.id === product.id)) return;
    setCart((prev) => [...prev, product]);
  }

  function handleRemoveProduct(productId: string) {
    const updatedCart = cart.filter((item) => item.id !== productId);

    setCart(updatedCart);
  }

  async function handleBuyProducts() {
    try {
      setIsCreatingCheckoutSession(true);

      const response = await axios.post("/api/checkout", {
        productsToBuy: cart,
      });

      const { checkoutUrl } = response.data;

      window.location.href = checkoutUrl;
    } catch (err) {
      setIsCreatingCheckoutSession(false);
      // best choose -> datadog / sentry

      console.log(err);

      alert("Falha ao redirecionar ao checkout!");
    }
  }

  return (
    <CartContext.Provider
      value={{
        products: cart,
        handleAddProduct,
        handleRemoveProduct,
        handleBuyProducts,
        isCreatingCheckoutSession,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
