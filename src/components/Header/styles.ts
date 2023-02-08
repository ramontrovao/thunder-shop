import { styled } from "../../styles";

export const HeaderContainer = styled("header", {
  display: "flex",
  justifyContent: "space-between",
  margin: "0 auto",
  padding: "2rem",
  width: "95%",
  maxWidth: "100vw",

  div: {
    display: "flex",
  },

  "@media (max-width: 768px)": {
    width: "80%",
  },
});
