import {
  Box,
  Button,
  ChakraBaseProvider,
  ColorModeProvider,
  Container,
  Icon,
  Stack,
  useColorMode,
} from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthPage, OverviewPage, DetailPage } from "./pages";
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
                  <>
                    <Route path="/" element={<OverviewPage />} />
                    <Route path=":id" element={<DetailPage />} />
                  </>
                )}
              </Routes>
            </BrowserRouter>

            <Stack
              direction={"row"}
              w={"85%"}
              justifyContent={"end"}
              margin={"15px 0px"}
            >
              <div style={{ width: "48px", height: "40px" }}></div>{" "}
              <div style={{ width: "48px", height: "40px" }}></div>
              <Button
                onClick={toggleColorMode}
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
            </Stack>
          </Container>
        </Box>
      </ColorModeProvider>
    </ChakraBaseProvider>
  );
}
export default App;
