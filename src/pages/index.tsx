import { HomeContainer } from "../styles/pages/home";
import Head from "next/head";

import { useKeenSlider } from "keen-slider/react";

import "keen-slider/keen-slider.min.css";
import { stripe } from "../lib/stripe";
import Stripe from "stripe";
import { GetStaticProps } from "next";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Product } from "../components/Product";

type ProductType = {
  id: string;
  name: string;
  imageUrl: string;
  price: string;
  priceId: string;
};

interface HomeProps {
  productsData: Array<ProductType>;
}

export default function Home({ productsData }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 2.5,
      spacing: 24,
    },
    breakpoints: {
      "(min-width: 0px) and (max-width: 768px)": {
        slides: {
          perView: 1,
          spacing: 32,
        },
      },
    },
  });

  return (
    <>
      <Head>
        <title>Home | Thunder Shop</title>
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

      {!productsData ? (
        <p>Carregando..</p>
      ) : (
        <HomeContainer ref={sliderRef} className="keen-slider">
          {productsData.map((product) => (
            <Product product={product} key={product.id} />
          ))}
        </HomeContainer>
      )}
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  // dont have access to context of req (req, res, cookies)

  // get products with default price expanded
  const response = await stripe.products.list({
    expand: ["data.default_price"],
  });

  const productsData = response.data.map((product) => {
    const price = product.default_price as Stripe.Price;
    const priceId = price.id;

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: Number((price.unit_amount as number) / 100),
      priceId: priceId,
    };
  });

  return {
    props: {
      productsData,
    },
    revalidate: 60 * 60 * 1, // revalidate every 1 hours
  };
};
