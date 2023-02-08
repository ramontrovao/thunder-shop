import * as Dialog from "@radix-ui/react-dialog";
import { styled } from "@/src/styles";

export const CartContainer = styled(Dialog.Content, {
  background: "$gray800",
  padding: "2.5rem 3rem",
  position: "fixed",
  right: 0,
  top: 0,
  height: "100vh",
  minWidth: "30vw",
  boxShadow:
    "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;",

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

export const CartNotFilled = styled("p", {
  fontSize: "$lg",
  color: "$pink300",
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
  background: "$pink500",
  color: "$gray100",
  padding: "1.25rem 1rem",
  fontSize: "$md",
  cursor: "pointer",
  border: 0,
  borderRadius: 8,

  "&:disabled": {
    opacity: 0.4,
    cursor: "wait",
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
  background: "$pink500",
  width: "1.25rem",
  height: "1.25rem",
  fontSize: "0.85rem",
  border: 0,
  borderRadius: 1000,
  outline: "3px solid #000",
});
