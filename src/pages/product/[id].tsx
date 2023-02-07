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
import { title } from "process";
import { useContext } from "react";
import Stripe from "stripe";

type ProductType = {
  id: string;
  name: string;
  imageUrl: string;
  price: string;
  description: string;
  priceId: string;
};

interface ProductProps {
  product: ProductType;
}

export default function Product({
  product: { name, imageUrl, price, description, id, priceId },
}: ProductProps) {
  const { handleAddProduct } = useContext(CartContext);

  return (
    <>
      <Head>
        {name ? (
          <title>{name} | Ignite Shop</title>
        ) : (
          <title>Ignite Shop</title>
        )}
      </Head>

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
              handleAddProduct({
                id: id,
                name: name,
                imageUrl: imageUrl,
                price: price,
                priceId,
              })
            }
          >
            Comprar agora
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
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
