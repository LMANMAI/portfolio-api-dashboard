import { ChakraProvider, extendBaseTheme } from "@chakra-ui/react";
import React from "react";
import themeConfig from "./customTheme";
const theme = extendBaseTheme(themeConfig);
type Props = { children: React.ReactNode | React.ReactNode[] };

export function ThemeProvider({ children }: Props) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}
