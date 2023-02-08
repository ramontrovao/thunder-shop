import { FileX } from "phosphor-react";
import { styled } from "..";

export const HomeContainer = styled("main", {
  display: "flex",
  width: "100%",
  maxWidth: "100vw",
  minHeight: 656,
});

export const Product = styled("div", {
  background: "linear-gradient(180deg, #FF597B 0%, #CF4DCE 100%)",
  borderRadius: 8,
  cursor: "pointer",
  position: "relative",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
  minWidth: 540,

  img: {
    objectFit: "cover",
  },

  footer: {
    position: "absolute",
    bottom: "0.25rem",
    left: "0.25rem",
    right: "0.25rem",
    padding: "2rem",

    borderRadius: 6,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",

    background: "rgba(0, 0, 0, 0.6)",

    transform: "translateY(110%)",
    opacity: 0,
    transition: "all 0.15s ease-in-out",

    strong: {
      color: "$gray100",
      fontSize: "$lg",
    },

    span: {
      fontSize: "$xl",
      fontWeight: "bold",
      color: "$pink300",
    },

    div: {
      display: "flex",
      flexDirection: "column",
    },

    button: {
      lineHeight: 0,
      backgroundColor: "$pink300",
      color: "$gray100",
      padding: "0.75rem",
      border: 0,
      borderRadius: 6,
      cursor: "pointer",
    },
  },

  "&:hover": {
    footer: {
      transform: "translateY(0%)",
      opacity: "1",
    },
  },

  "@media (max-width: 1024px)": {
    footer: {
      transform: "translateY(0%)",
      opacity: "1",
    },
  },
});
