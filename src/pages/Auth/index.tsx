import {
  Box,
  Button,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import React from "react";

const AuthPage = () => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  return (
    <div>
      <Box
        padding="4"
        bg="#FFF"
        color="black"
        maxW="md"
        minW={"400px"}
        height={"250px"}
        borderRadius={"5px"}
        display={"flex"}
        justifyContent={"center"}
        flexDirection={"column"}
      >
        <Text
          textAlign={"center"}
          marginY={"10px"}
          letterSpacing={"0.2px"}
          textTransform={"uppercase"}
        >
          Portfolio dashboard
        </Text>
        <Stack
          spacing={3}
          w="100%"
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Input placeholder="Basic usage" />
          <InputGroup size="md">
            <Input
              pr="4.5rem"
              type={show ? "text" : "password"}
              placeholder="Enter password"
            />
            <InputRightElement width="2.5rem">
              <IconButton
                h="1.75rem"
                size="sm"
                background={"transparent!important"}
                onClick={handleClick}
                icon={show ? <ViewOffIcon /> : <ViewIcon />}
                aria-label={show ? "Ocultar contraseña" : "Mostrar contraseña"}
              />
            </InputRightElement>
          </InputGroup>

          <Button
            variant={"primary"}
            h="1.75rem"
            size="sm"
            title="ingresar al dashboard"
          >
            Ingresar
          </Button>
        </Stack>
      </Box>
    </div>
  );
};

export default AuthPage;
