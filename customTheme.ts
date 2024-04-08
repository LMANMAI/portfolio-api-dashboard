import { extendTheme } from "@chakra-ui/react";
import { ButtonStyles as Button } from "./src/components/Theme";
const bgColor = { light: "red.500", dark: "red.200" };
const colors = {
  backgroundPrimaryColor: "#FAFAFA",
  primary: "#780000",
  primaryLigther: "#c1121f",
  secondary: "#003049",
  secondaryLigther: "#669bbc",
  third: "#fdf0d5",
  bgColor,
};

const theme = extendTheme({
  colors,
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  // fonts: {
  //   body: "Kumbh Sans, sans-serif",
  // },
  components: {
    Button,
  },
});

export default theme;
