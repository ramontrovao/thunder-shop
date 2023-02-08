import { HomeContainer, Product } from "../styles/pages/home";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";

import { useKeenSlider } from "keen-slider/react";

import "keen-slider/keen-slider.min.css";
import { stripe } from "../lib/stripe";
import Stripe from "stripe";
import { GetStaticProps } from "next";
import { Handbag } from "phosphor-react";
import { useContext } from "react";
import { CartContext } from "../contexts/cartContext";
import { parseToBrl } from "../utils/parseToBrl";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const { handleAddProduct, products } = useContext(CartContext);

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

  function onAddProduct(product: ProductType) {
    const add = handleAddProduct(product);

    if (!add) {
      toast.error(
        "A função de adicionar mais de um item igual não está disponível!"
      );
    } else {
      toast.success("Produto adicionado!");
    }
  }

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
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
            <Product className="keen-slider__slide" key={product.id}>
              <Link href={`/product/${product.id}`} prefetch={false}>
                <Image src={product.imageUrl} width={520} height={480} alt="" />
              </Link>

              <footer>
                <div>
                  <strong>{product.name}</strong>

                  <span>{parseToBrl(Number(product.price))}</span>
                </div>

                <button>
                  <Handbag
                    size={25}
                    onClick={() => {
                      onAddProduct(product);
                    }}
                  />
                </button>
              </footer>
            </Product>
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
