import {
  Box,
  Button,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { signInUser } from "../../config/firebase-config";
import { useDispatch } from "react-redux";
import { setUser } from "../../features/authenticationSlice";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const [show, setShow] = useState(false);
  const [load, setLoad] = useState<boolean>(false);
  const [formFields, setFormFields] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formFields;
  const dispatch = useDispatch();
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
        dispatch(setUser(userCredential.user));
        resetFormFields();
        setLoad(false);
        location("/");
      }
    } catch (error: any) {
      setLoad(false);
    }
  };
  const handleChange = (value: any, fieldName: string) => {
    setFormFields({ ...formFields, [fieldName]: value });
  };

  const handleClick = () => setShow(!show);
  const { colorMode } = useColorMode();

  return (
    <div>
      <Box
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
          <Input
            placeholder="Basic usage"
            variant={"border"}
            value={email}
            onChange={(value) => handleChange(value.target.value, "email")}
          />
          <InputGroup size="md">
            <Input
              pr="4.5rem"
              type={show ? "text" : "password"}
              placeholder="Enter password"
              variant={"border"}
              value={password}
              onChange={(value) => handleChange(value.target.value, "password")}
            />
            <InputRightElement width="2.5rem">
              <IconButton
                h="1.75rem"
                size="sm"
                variant={"primary"}
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
            color={"white"}
            onClick={() => handleSubmit()}
            bg={colorMode === "light" ? "primary" : "secondary"}
          >
            Ingresar
          </Button>
        </Stack>
      </Box>
    </div>
  );
};

export default AuthPage;
