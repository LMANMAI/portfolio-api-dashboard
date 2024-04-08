import {
  Box,
  Button,
  ChakraBaseProvider,
  ColorModeProvider,
  Container,
  Icon,
  useColorMode,
} from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthPage, OverviewPage } from "./pages";
import theme from "./theme/customTheme";
import { BsFillSunFill, BsMoonFill } from "react-icons/bs";
function App() {
  const currentUser: string = "asd";
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <ChakraBaseProvider theme={theme}>
      <ColorModeProvider value={colorMode}>
        <Box width="100vw" height="100vh">
          <Container
            maxW="100%"
            height="100%"
            centerContent
            justifyContent={"center"}
          >
            <BrowserRouter>
              <Routes>
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/" element={<OverviewPage />} />
              </Routes>
            </BrowserRouter>
            <Button
              onClick={toggleColorMode}
              position={"absolute"}
              bottom={"10px"}
              right={"10px"}
              variant={"primary"}
              bg={colorMode === "light" ? "primary" : "secondary"}
              color={"white"}
            >
              {colorMode === "light" ? (
                <Icon as={BsMoonFill} />
              ) : (
                <Icon as={BsFillSunFill} />
              )}
            </Button>
          </Container>
        </Box>
      </ColorModeProvider>
    </ChakraBaseProvider>
  );
}
export default App;
