import { extendTheme, ThemeConfig } from "@chakra-ui/react";
import { ButtonStyles as Button } from "../components/Theme";

const colors = {
  backgroundPrimaryColor: "#FAFAFA",
  primary: "#780000",
  primaryLigther: "#c1121f",
  secondary: "#003049",
  secondaryLigther: "#669bbc",
  third: "#fdf0d5",
};
const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: true,
};
const theme = extendTheme({
  colors,
  config,
  components: {
    Button,
  },
});

export default theme;
