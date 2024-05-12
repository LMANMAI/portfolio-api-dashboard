import {
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Button,
  useColorMode,
  Icon,
  useToast,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Stack,
} from "@chakra-ui/react";
import { MyProyects } from "../../containers";
import { BsFillDoorOpenFill, BsPlusSquareFill } from "react-icons/bs";
import { SignOutUser } from "../../config/firebase-config";
import React from "react";

const OverviewPage = () => {
  const { colorMode } = useColorMode();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      padding="0px"
      color="black"
      w={"85%"}
      h={"85dvh"}
      bg={"#e5e7eb"}
      border={"1px solid #d8d8d8"}
      borderRadius={"5px"}
    >
      <Tabs variant="enclosed" height={"100%"}>
        <TabList padding={"0px 15px"}>
          <Tab
            _selected={{
              color: colorMode === "light" ? "primary" : "secondary",
              borderBottomColor:
                colorMode === "light" ? "primary" : "secondary",
              borderBottomWidth: "2px",
              fontWeight: "500",
            }}
          >
            Mis proyectos
          </Tab>
          <Tab
            _selected={{
              color: colorMode === "light" ? "primary" : "secondary",
              borderBottomColor:
                colorMode === "light" ? "primary" : "secondary",
              borderBottomWidth: "2px",
              fontWeight: "500",
            }}
          >
            Habilidades y Herramientas
          </Tab>
        </TabList>

        <TabPanels h={"100%"}>
          <TabPanel padding={"10px 5px"}>
            <MyProyects />
          </TabPanel>
          <TabPanel padding={"10px 5px"}>
            <p>two!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>

      <Stack
        direction={"row"}
        w={"100%"}
        justifyContent={"end"}
        margin={"15px 0px"}
      >
        <Button
          onClick={() => {
            toast({
              title: `Saliendo de la cuenta`,
              position: "top-right",
              isClosable: true,
            });
            SignOutUser();
          }}
          title="Cerrar sesion"
          variant={"primary"}
          bg={colorMode === "light" ? "primary" : "secondary"}
          color={"white"}
        >
          <Icon as={BsFillDoorOpenFill} />
        </Button>
        <Button
          onClick={onOpen}
          title="Agregar proyecto"
          variant={"primary"}
          bg={colorMode === "light" ? "primary" : "secondary"}
          color={"white"}
        >
          <Icon as={BsPlusSquareFill} />
        </Button>
        <div style={{ width: "48px", height: "40px" }}></div>
      </Stack>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={"md"}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Agregar Proyecto</DrawerHeader>

          <DrawerBody></DrawerBody>

          <DrawerFooter>
            <Button
              variant="outline"
              mr={3}
              onClick={onClose}
              borderColor={colorMode === "light" ? "primary" : "secondary"}
              borderWidth={"3px"}
              //color={colorMode === "light" ? "primary" : "secondary"}
            >
              Cancelar
            </Button>
            <Button
              variant={"primary"}
              color={"white"}
              bg={colorMode === "light" ? "primary" : "secondary"}
            >
              Guardar
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default OverviewPage;
