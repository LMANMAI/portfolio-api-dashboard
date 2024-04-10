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
import { useContext, useEffect } from "react";
import { AuthContext } from "./context/authContext";

function App() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { currentUser } = useContext(AuthContext);
  useEffect(() => {
    if (!currentUser && window.location.pathname !== "/") {
      window.location.replace("/");
      return;
    }
  }, [currentUser, window.location.pathname]);
  return (
    <ChakraBaseProvider theme={theme}>
      <ColorModeProvider value={colorMode}>
        <Box
          width="100vw"
          height="100vh"
          bg={colorMode === "light" ? "#f2f2f2" : "#2c2c2c"}
        >
          <Container
            maxW="100%"
            height="100%"
            centerContent
            justifyContent={"center"}
          >
            <BrowserRouter>
              <Routes>
                {!currentUser ? (
                  <Route path="/" element={<AuthPage />} />
                ) : (
                  <Route path="/" element={<OverviewPage />} />
                )}
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
