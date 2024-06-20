export const ButtonStyles = {
  baseStyle: {},
  sizes: {},
  variants: {
    Button: {
      baseStyle: {
        fontWeight: "bold",
        borderRadius: "md",
        _focus: { boxShadow: "none" },
      },
      variants: {
        primary: (props: any) => ({
          bg: props.colorMode === "light" ? "primary" : "secondary",
          color: "white",
          _hover: {
            bg:
              props.colorMode === "light"
                ? "primaryLigther"
                : "secondaryLigther",
          },
        }),
        secondary: (props: any) => ({
          bg: "transparent",
          borderColor: props.colorMode === "light" ? "primary" : "secondary",
          color: props.colorMode === "light" ? "primary" : "secondary",
          _hover: {
            bg: props.colorMode === "light" ? "third" : "third",
          },
        }),
      },
    },
  },
  defaultProps: {},
};
