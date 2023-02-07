import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { stripe } from "../lib/stripe";
import {
  ImageContainer,
  ImageWrapper,
  SuccessContainer,
} from "../styles/pages/success";

type ProductType = {
  id: string;
  name: string;
  imageUrl: string;
  price: {
    product: {
      images: Array<string>;
    };
  };
  description: string;
  priceId: string;
};
interface SuccessProps {
  costumerName: string;
  products: Array<ProductType>;
}

export default function Success({ costumerName, products }: SuccessProps) {
  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>

        <meta name="robots" content="noindex" />
      </Head>

      <SuccessContainer>
        <h1>Compra efetuada</h1>

        <ImageWrapper>
          {products.map((prod) => (
            <ImageContainer key={prod.id}>
              <Image
                src={prod.price.product.images[0]}
                width={120}
                height={110}
                alt=""
              />
            </ImageContainer>
          ))}
        </ImageWrapper>

        <p>
          Uhuul <strong>{costumerName}</strong>, sua compra de{" "}
          <strong>{products.length}</strong> camisetas já está a caminho da sua
          casa!
        </p>

        <Link href="/">Voltar ao catálogo</Link>
      </SuccessContainer>
    </>
  );
}

// Client-side (use-effect) / getServerSideProps / getStaticProps

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { session_id: sessionId } = query;

  if (!query.session_id) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const session = await stripe.checkout.sessions.retrieve(sessionId as string, {
    expand: ["line_items", "line_items.data.price.product"],
  });

  const costumerName = session.customer_details?.name;
  const products = session.line_items?.data;

  return {
    props: {
      costumerName,
      products,
    },
  };
};
