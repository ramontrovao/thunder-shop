import { styled } from "../../styles";
import * as Dialog from "@radix-ui/react-dialog";

export const HeaderContainer = styled("header", {
  display: "flex",
  justifyContent: "space-between",
  padding: "2rem",
  width: "100%",
  maxWidth: 1180,
  margin: "0 auto",

  div: {
    display: "flex",
  },
});

export const AddToCartButton = styled(Dialog.Trigger, {
  backgroundColor: "$gray800",
  color: "$gray300",
  width: "3rem",
  height: "3rem",
  border: 0,
  borderRadius: 8,
  lineHeight: 0,

  cursor: "pointer",
});

export const NumberOfCartItems = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginLeft: "-0.75rem",
  background: "$green500",
  width: "1.25rem",
  height: "1.25rem",
  fontSize: "0.85rem",
  border: 0,
  borderRadius: 1000,
  outline: "3px solid #000",
});

export const CartContainer = styled(Dialog.Content, {
  "background-color": "$gray800",
  padding: "2.5rem 3rem",
  position: "fixed",
  right: 0,
  top: 0,
  height: "100vh",
  minWidth: "30vw",

  "@media (max-width: 425px)": {
    maxWidth: "100vw",
    height: "110vh",
  },
});

export const CloseButton = styled(Dialog.Close, {
  background: "transparent",
  border: 0,
  lineHeight: 0,
  color: "$gray300",
  cursor: "pointer",
});

export const TitleCardContainer = styled("header", {
  display: "flex",
  justifyContent: "space-between",
});

export const CartItems = styled("main", {
  display: "flex",
  flexDirection: "column",
  height: "20rem",
  marginTop: "1.5rem",
  overflow: "auto",
});

export const OrderInfosContainer = styled("footer", {
  display: "flex",
  flexDirection: "column",
  marginTop: "7.5rem",
});

export const OrderInfosResume = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
  marginTop: "-4.75rem",
  marginBottom: "2.5rem",

  div: {
    display: "flex",
    justifyContent: "space-between",
  },
});

export const OrderInfosSubmitButton = styled("button", {
  background: "$green500",
  color: "$gray100",
  padding: "1.25rem 1rem",
  fontSize: "$md",
  cursor: "pointer",
  border: 0,
  borderRadius: 8,
});
