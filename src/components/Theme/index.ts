import { mode, darken, whiten } from "@chakra-ui/theme-tools";

export const ButtonStyles = {
  baseStyle: {},
  sizes: {},
  variants: {
    primary: (props: any) => ({
      bg: mode(darken("primary", 0), whiten("secondary", 0))(props),
      color: "white",
      _hover: {
        bg: mode(darken("primary", 10), whiten("secondary", 10))(props), // Ajusta la intensidad del color en hover según el modo
      },
      border: "1px solid",
      padding: "10px",
    }),
    secondary: (props: any) => ({
      bg: "transparent",
      border: " 1px solid",
      borderColor: mode(darken("primary", 0), whiten("secondary", 0))(props),
      color: mode(darken("primary", 0), whiten("secondary", 0))(props),
      padding: "10px",
    }),
  },
  defaultProps: {},
};
