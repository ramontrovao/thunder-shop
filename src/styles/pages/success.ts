import { styled } from "..";

export const SuccessContainer = styled("main", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  margin: "0 auto",
  minHeight: "75vh",

  h1: {
    fontSize: "$2xl",
    color: "$gray100",
  },

  p: {
    fontSize: "$xl",
    color: "$gray300",
    maxWidth: 560,
    textAlign: "center",
    marginTop: "3rem",
  },

  a: {
    display: "block",
    fontSize: "$lg",
    color: "$green500",
    textAlign: "center",
    marginTop: "3rem",
    textDecoration: "none",

    "&:hover": {
      color: "$green300",
    },
  },
});

export const ImageWrapper = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  "div:not(first-child)": {
    marginLeft: "-3.5rem",
  },
});

export const ImageContainer = styled("div", {
  background: "linear-gradient(180deg, #1ea483 0%, #7465d4 100%)",
  borderRadius: 999,
  padding: "0.25rem",
  marginTop: "3rem",
  boxShadow:
    "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",

  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",

  img: {
    objectFit: "cover",
  },
});
