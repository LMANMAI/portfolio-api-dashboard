import {
  Box,
  Button,
  ChakraBaseProvider,
  ColorModeProvider,
  Container,
  Icon,
  useColorMode,
} from "@chakra-ui/react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthPage, OverviewPage } from "./pages";
import theme from "./theme/customTheme";
import { BsFillSunFill, BsMoonFill } from "react-icons/bs";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { handleLogoutUser, setUser } from "./features/authenticationSlice";
import { userStateListener } from "./config/firebase-config";
import PrivateComponent from "./routes/privateComponent";

function App() {
  const { colorMode, toggleColorMode } = useColorMode();
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.authentication.user);

  useEffect(() => {
    if (!user && window.location.pathname !== "/") {
      window.location.replace("/");
      return;
    }
  }, [user, window.location.pathname]);

  console.log(user);
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
                {!user ? (
                  <Route path="/auth" element={<AuthPage />} />
                ) : (
                  <Route
                    path="/"
                    element={
                      <PrivateComponent userId={user}>
                        <OverviewPage />
                      </PrivateComponent>
                    }
                  />
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
