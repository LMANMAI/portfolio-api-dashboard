import {
  Box,
  Button,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  Stack,
  Text,
  useColorMode,
  useToast,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { signInUser } from "../../config/firebase-config";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const toast = useToast();
  const { colorMode } = useColorMode();

  const [show, setShow] = useState(false);
  const [load, setLoad] = useState<boolean>(false);
  const [formFields, setFormFields] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formFields;
  const location = useNavigate();

  const resetFormFields = () => {
    return setFormFields({
      email: "",
      password: "",
    });
  };

  const handleSubmit = async () => {
    setLoad(true);
    try {
      const userCredential = await signInUser(email, password);
      if (userCredential) {
        resetFormFields();
        setLoad(false);
        location("/");
        toast({
          title: `Ingresando a la cuenta`,
          position: "top-right",
          isClosable: true,
        });
      }
    } catch (error: any) {
      setLoad(false);
      toast({
        title: `Ocurrio un error ingresando en la cuenta.`,
        position: "top-right",
        isClosable: true,
        status: "error",
      });
    }
  };
  const handleChange = (value: any, fieldName: string) => {
    setFormFields({ ...formFields, [fieldName]: value });
  };

  const handleClick = () => setShow(!show);
  const handleKeyPress = (event: any) => {
    if (event.key === "Enter" && email !== "") {
      handleSubmit();
    }
  };
  return (
    <Box
      w={"85%"}
      h={"85dvh"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Stack
        padding="4"
        border={"1px solid #dbdbdb"}
        color="black"
        maxW="md"
        minW={"350px"}
        height={"250px"}
        borderRadius={"5px"}
        display={"flex"}
        justifyContent={"center"}
        flexDirection={"column"}
        bg={"#ebebeb"}
      >
        <Text
          textAlign={"center"}
          marginY={"10px"}
          textTransform={"capitalize"}
          fontFamily={"ChocoBold"}
          fontSize={"34px"}
        >
          Portfolio
        </Text>
        <Stack
          spacing={3}
          w="100%"
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Input
            placeholder="Correo electronico"
            variant={"border"}
            value={email}
            onChange={(value) => handleChange(value.target.value, "email")}
            onKeyPress={handleKeyPress}
            color={colorMode === "light" ? "black" : "white"}
          />
          <InputGroup size="md">
            <Input
              pr="4.5rem"
              type={show ? "text" : "password"}
              placeholder="Contraseña"
              variant={"border"}
              value={password}
              color={colorMode === "light" ? "#ccc" : "white"}
              onChange={(value) => handleChange(value.target.value, "password")}
              onKeyPress={handleKeyPress}
            />
            <InputRightElement width="2.5rem">
              <IconButton
                h="1.75rem"
                size="sm"
                variant={"primary"}
                background={"transparent!important"}
                color={colorMode === "light" ? "#ccc" : "white"}
                onClick={handleClick}
                icon={show ? <ViewOffIcon /> : <ViewIcon />}
                aria-label={show ? "Ocultar contraseña" : "Mostrar contraseña"}
              />
            </InputRightElement>
          </InputGroup>

          <Box
            as="button"
            h="1.75rem"
            title="ingresar al dashboard"
            color={"white"}
            onClick={() => handleSubmit()}
            disabled={(load && email === "") || password === ""}
            padding={"0px 16px"}
            height={"30px"}
            borderRadius={"5px"}
            _disabled={{
              cursor: "not-allowed",
              backgroundColor: "#F5F6F7",
              color: "#4B4F56",
            }}
            bg={colorMode === "light" ? "primary" : "secondary"}
          >
            {load ? <Spinner size="xs" /> : "Ingresar"}
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
};

export default AuthPage;
