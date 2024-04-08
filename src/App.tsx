import {
  Box,
  Button,
  ChakraBaseProvider,
  ColorModeProvider,
  Container,
  useColorMode,
} from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthPage, OverviewPage } from "./pages";
import theme from "../customTheme";
function App() {
  const currentUser: string = "asd";
  const { colorMode, toggleColorMode } = useColorMode();

  console.log(colorMode);
  return (
    <ChakraBaseProvider theme={theme}>
      <ColorModeProvider>
        <Box width="100vw" height="100vh">
          <Container
            maxW="100%"
            height="100%"
            centerContent
            justifyContent={"center"}
            background={
              colorMode === "dark" ? theme.colors.primary : theme.colors.bgColor
            }
          >
            <BrowserRouter>
              <Routes>
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/" element={<OverviewPage />} />
              </Routes>
            </BrowserRouter>
            <Button onClick={toggleColorMode}>
              {colorMode === "light" ? "Dark Mode" : "Light Mode"}
            </Button>
          </Container>
        </Box>
      </ColorModeProvider>
    </ChakraBaseProvider>
  );
}
export default App;
