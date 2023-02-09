import axios from "axios";
import { createContext, ReactNode, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useLocalStorage } from "../hooks/useLocalStorage";

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
  handleAddProduct: (product: ProductType) => boolean;
  handleRemoveProduct: (productId: string) => void;
  handleBuyProducts: () => void;
};

interface CartContextProviderProps {
  children: ReactNode;
}

export const CartContext = createContext({} as CartContextType);

export function CartContextProvider({ children }: CartContextProviderProps) {
  const { setLocalStorageItem, getLocalStorageItem } = useLocalStorage();
  const [cart, setCart] = useState(Array<ProductType>);
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false);

  useEffect(() => {
    const localCart = getLocalStorageItem("thunder-store-products", "1.0.0");

    if (localCart.length > 0) {
      setCart(localCart);
    }
  }, []);

  useEffect(() => {
    setLocalStorageItem("thunder-store-products", "1.0.0", cart);
  }, [cart]);

  function handleAddProduct(product: ProductType) {
    if (cart.find((item) => item.id === product.id)) return false;

    setCart((prev) => [...prev, product]);

    return true;
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

      setLocalStorageItem("thunder-store-products", "1.0.0", []);
      window.location.href = checkoutUrl;
    } catch (err) {
      setIsCreatingCheckoutSession(false);
      // best choose -> datadog / sentry

      console.log(err);

      toast.error("Falha ao redirecionar ao carrinho");
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
