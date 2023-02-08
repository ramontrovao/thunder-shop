import { CartContext } from "@/src/contexts/cartContext";
import { stripe } from "@/src/lib/stripe";
import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from "@/src/styles/pages/products";
import { parseToBrl } from "@/src/utils/parseToBrl";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { useContext, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Stripe from "stripe";
import "react-toastify/dist/ReactToastify.css";

type ProductType = {
  id: string;
  name: string;
  imageUrl: string;
  price: string;
  priceId: string;
  description: string;
};

interface ProductProps {
  product: ProductType;
}

export default function Product({
  product: { name, imageUrl, price, description, id, priceId },
}: ProductProps) {
  const { handleAddProduct } = useContext(CartContext);
  const [productAlreadyOnCart, setProductAlreadyOnCart] = useState(false);

  function onAddProduct(product: Omit<ProductType, "description">) {
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
    <>
      <Head>
        <title>{name} | Thunder Shop</title>
      </Head>

      <ToastContainer
        position="top-right"
        autoClose={3500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      <ProductContainer>
        <ImageContainer>
          <Image src={imageUrl} width={520} height={480} alt="" />
        </ImageContainer>

        <ProductDetails>
          <h1>{name}</h1>
          <span>{parseToBrl(Number(price))}</span>

          <p>{description}</p>

          <button
            onClick={() =>
              onAddProduct({
                id: id,
                name: name,
                imageUrl: imageUrl,
                price: price,
                priceId,
              })
            }
            disabled={productAlreadyOnCart}
          >
            Adicionar ao carrinho
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const productId = params!.id;
  const product = await stripe.products.retrieve(productId, {
    expand: ["default_price"],
  });

  const price = product.default_price as Stripe.Price;

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        description: product.description,
        imageUrl: product.images[0],
        price: Number((price.unit_amount as number) / 100),
        priceId: price.id,
      },
    },
    revalidate: 60 * 60 * 1, // 1 hour on cache
  };
};
