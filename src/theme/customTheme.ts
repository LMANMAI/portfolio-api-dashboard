import { extendTheme, ThemeConfig } from "@chakra-ui/react";
import { ButtonStyles as Button } from "../components/Theme";
import { mode } from "@chakra-ui/theme-tools";

const colors = {
  backgroundPrimaryColor: "#FAFAFA",
  primary: "#780000",
  primaryLigther: "#c1121f",
  secondary: "#003049",
  secondaryLigther: "#669bbc",
  third: "#fdf0d5",
  bgLigthtMode: "#f2f2f2",
  bgDarkMode: "#2c2c2c",
};

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};
const theme = extendTheme({
  colors,
  config,
  components: {
    Button,
  },
  styles: {},
});

export default theme;
