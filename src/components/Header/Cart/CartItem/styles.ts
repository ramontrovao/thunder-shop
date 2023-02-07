import { styled } from "@/src/styles";

export const CartItemContainer = styled("div", {
  display: "flex",
  gap: "1.25rem",
  marginTop: "2rem",
});

export const CartItemImageContainer = styled("div", {
  width: "5rem",
  height: "5rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(180deg, #1ea483 0%, #7465d4 100%)",
  borderRadius: "8px",
});

export const CartItemInfosContainer = styled("div", {
  display: "flex",
  flexDirection: "column",

  button: {
    width: "4rem",
    background: "transparent",
    color: "$green500",
    fontSize: "$md",
    border: 0,
    cursor: "pointer",
    lineHeight: 0,
  },

  span: {
    color: "$gray300",
    fontSize: "$md",
  },

  strong: {
    color: "$gray100",
    fontSize: "$lg",
    marginTop: "0.5rem",
    marginBottom: "1.25rem",
  },
});
