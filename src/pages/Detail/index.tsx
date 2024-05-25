import {
  Box,
  Stack,
  Tag,
  Text,
  useColorMode,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";
import { LoadingComponent } from "../../components";
import { useEffect, useState } from "react";
import { mockData } from "../../containers/MyProyects/static";
import { ToDo } from "../../interfaces";
import { useParams } from "react-router-dom";
import { HamburgerIcon } from "@chakra-ui/icons";
const DetailPage = () => {
  const { id } = useParams<{ id: ToDo }>();
  const { colorMode } = useColorMode();

  const [load, setLoad] = useState<boolean>(false);
  const [activeItem, setActiveItem] = useState<ToDo>({});

  const getDetailsFromProyect = (id: number) => {
    setLoad(true);

    setTimeout(() => {
      //esto tiene que pasar a un ep cuando este listo
      const filteredItem = mockData.filter((item: ToDo) => item.id === id);
      setActiveItem(filteredItem[0]);
      setLoad(false);
    }, 20);
  };

  useEffect(() => {
    getDetailsFromProyect(Number(id));
  }, []);

  const buttonReset = {
    borderColor: colorMode !== "light" ? "secondary" : "primary",
    borderWidth: "2px",
    background: "transparent",
    color: colorMode !== "light" ? "secondary" : "primary",
  };
  console.log(activeItem);
  return (
    <Box
      padding="0px"
      color="black"
      w={"85%"}
      maxWidth={"1000px"}
      h={"85dvh"}
      bg={"#e5e7eb"}
      border={"1px solid #d8d8d8"}
      borderRadius={"5px"}
      //  overflowY="auto"
    >
      {load ? (
        <LoadingComponent
          loading={load}
          label="Obteniendo detalles del proyecto"
        />
      ) : (
        <Stack p={3} overflowY={"auto"}>
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Text
              fontSize={"34px"}
              fontFamily={"ChocoBold"}
              textTransform={"capitalize"}
            >
              {activeItem?.name}
            </Text>
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<HamburgerIcon />}
                variant="outline"
                color={"white"}
                transition="all 0.2s"
                bg={colorMode === "light" ? "primary" : "secondary"}
                _active={buttonReset}
                _hover={buttonReset}
              />
              <MenuList color={colorMode === "light" ? "#2c2c2c" : "white"}>
                <MenuItem>Editar proyecto</MenuItem>
                <MenuItem>Agregar seccion adicional</MenuItem>
                <MenuItem>Eliminar Proyecto</MenuItem>
              </MenuList>
            </Menu>
          </Stack>
          <div
            style={{
              display: "flex",
              gap: "10px",
              margin: "10px 0px",
              padding: "0px 10px",
            }}
          >
            <Tag
              color={"white"}
              bg={colorMode === "light" ? "primary" : "secondary"}
              title="Este tipo de proyecto es: "
            >
              {activeItem?.proyectType &&
                activeItem?.proyectType.replace("_", " ")}
            </Tag>
            {activeItem.technologyStack &&
              activeItem?.technologyStack.map((item: string) => (
                <Tag
                  colorScheme={colorMode === "light" ? "primary" : "secondary"}
                  title={"Tecnologia que se uso para el proyecto: "}
                >
                  {item}
                </Tag>
              ))}
          </div>
          <Stack
            height={" calc(85dvh - 150px)"}
            overflowY={"auto"}
            padding={"10px"}
          >
            <Stack>
              <Stack
                bg={"gray"}
                w={"100%"}
                h={"170px"}
                title="Imagen del proyecto"
              ></Stack>
              <Text>{activeItem.description}</Text>
            </Stack>
            {activeItem.aditionalData &&
              activeItem.aditionalData.map((item: ToDo) => (
                <Stack>
                  <Stack
                    bg={"gray"}
                    w={"100%"}
                    h={"170px"}
                    title={item.img}
                  ></Stack>
                  <Text>{item.text}</Text>
                </Stack>
              ))}
          </Stack>
        </Stack>
      )}
    </Box>
  );
};

export default DetailPage;
