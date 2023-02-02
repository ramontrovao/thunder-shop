import { styled } from "../styles";
import { HomeContainer, Product } from "../styles/pages/home";
import Image from "next/image";

import { useKeenSlider } from "keen-slider/react";

import shirt1 from "../assets/camisetas/1.png";
import shirt2 from "../assets/camisetas/2.png";
import shirt3 from "../assets/camisetas/3.png";

import "keen-slider/keen-slider.min.css";

export default function Home() {
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
    <HomeContainer ref={sliderRef} className="keen-slider">
      <Product className="keen-slider__slide">
        <Image src={shirt1} width={520} height={480} alt="" />

        <footer>
          <strong>Camiseta X</strong>

          <span>R$ 79,90</span>
        </footer>
      </Product>

      <Product className="keen-slider__slide">
        <Image src={shirt2} width={520} height={480} alt="" />

        <footer>
          <strong>Camiseta X</strong>

          <span>R$ 79,90</span>
        </footer>
      </Product>

      <Product className="keen-slider__slide">
        <Image src={shirt3} width={520} height={480} alt="" />

        <footer>
          <strong>Camiseta X</strong>

          <span>R$ 79,90</span>
        </footer>
      </Product>

      <Product className="keen-slider__slide">
        <Image src={shirt3} width={520} height={480} alt="" />

        <footer>
          <strong>Camiseta X</strong>

          <span>R$ 79,90</span>
        </footer>
      </Product>
    </HomeContainer>
  );
}

export const getServerSideProps = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return {
    props: {
      list: [1, 2, 3],
    },
  };
};
