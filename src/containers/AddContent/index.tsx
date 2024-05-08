import {
  Box,
  Input,
  Select,
  Stack,
  Card,
  Image,
  Text,
  CardBody,
  CardFooter,
  Heading,
  Button,
  ButtonGroup,
  Divider,
  Textarea,
  Menu,
  MenuButton,
  Portal,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
const AddContent = () => {
  return (
    <Box>
      <Stack p={2} border={"1px solid red"} direction={"row"}>
        <Stack flex={2}>
          <Input placeholder="Correo electronico" variant={"border"} />
          <Select
            color="white"
            bg="#2c2c2c"
            placeholder="Select option"
            variant={"border"}
          >
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </Select>
          <Textarea
            placeholder="Here is a sample placeholder"
            resize={"none"}
            variant={"border"}
          />
        </Stack>
        <Stack alignItems={"center"} flex={1}>
          <Card maxW="sm" bg="#2c2c2c">
            <Menu>
              <MenuButton
                position={"absolute"}
                right={"5px"}
                top={"5px"}
                bg={"#2c2c2cab"}
                border={"1px solid #ccc"}
                padding={"5px"}
                borderRadius={"5px"}
              >
                <BsThreeDotsVertical />
              </MenuButton>
              <Portal>
                <MenuList>
                  <MenuItem>Eliminar imagen</MenuItem>
                  <MenuItem>Limpiar proyecto</MenuItem>
                </MenuList>
              </Portal>
            </Menu>
            <Image
              src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
              alt="Green double couch with wooden legs"
            />
            <CardBody>
              <Stack spacing="3">
                <Heading size="md">Living room Sofa</Heading>
              </Stack>
            </CardBody>
            <Divider />
            <CardFooter></CardFooter>
          </Card>
        </Stack>
      </Stack>
    </Box>
  );
};

export default AddContent;
