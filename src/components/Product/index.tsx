import { CartContext } from "@/src/contexts/cartContext";
import { parseToBrl } from "@/src/utils/parseToBrl";
import Image from "next/image";
import Link from "next/link";
import { Handbag } from "phosphor-react";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ProductContainer } from "./styles";

type ProductType = {
  id: string;
  name: string;
  imageUrl: string;
  price: string;
  priceId: string;
};

interface ProductProps {
  product: ProductType;
}

export function Product({ product }: ProductProps) {
  const { id, imageUrl, name, price } = product;

  const [productAlreadyOnCart, setProductAlreadyOnCart] = useState(false);

  const { handleAddProduct } = useContext(CartContext);

  function onAddProduct(product: ProductType) {
    const add = handleAddProduct(product);

    if (!add) {
      setProductAlreadyOnCart(true);
      toast.error("O produto já existe no carrinho!");
    } else {
      setProductAlreadyOnCart(false);
      toast.success("Produto adicionado!");
    }
  }

  return (
    <ProductContainer className="keen-slider__slide">
      <Link
        href={`/product/${id}`}
        prefetch={false}
        title={`Visualizar ${name}`}
        aria-label={`Visualizar ${name}`}
      >
        <Image src={imageUrl} width={520} height={480} priority alt="" />
      </Link>

      <footer>
        <div>
          <strong>{name}</strong>

          <span>{parseToBrl(Number(price))}</span>
        </div>

        <button
          onClick={() => {
            onAddProduct(product);
          }}
          disabled={productAlreadyOnCart}
          title={`Adicionar ${name} ao carrinho`}
          aria-label={`Adicionar ${name} ao carrinho`}
        >
          <Handbag size={25} />
        </button>
      </footer>
    </ProductContainer>
  );
}
