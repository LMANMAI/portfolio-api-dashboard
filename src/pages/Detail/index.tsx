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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useToast,
} from "@chakra-ui/react";
import { LoadingComponent, DrawerComponent } from "../../components";
import { useEffect, useState } from "react";
import { ToDo } from "../../interfaces";
import { useNavigate, useParams } from "react-router-dom";
import { HamburgerIcon } from "@chakra-ui/icons";
import useFetch from "../../hooks/useFetch";
const DetailPage = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const { id } = useParams<{ id: ToDo }>();
  const { colorMode } = useColorMode();
  const [activeItem, setActiveItem] = useState<ToDo>({});
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openDrawerEdit, setOpenDrawerEdit] = useState<boolean>(false);
  const buttonReset = {
    borderColor: colorMode !== "light" ? "secondary" : "primary",
    borderWidth: "2px",
    background: "transparent",
    color: colorMode !== "light" ? "secondary" : "primary",
  };

  //me traigo los detalles del poryecto
  const { data, isLoading, makeRequest, setIsLoading } = useFetch<ToDo>(
    `proyects/${id}`,
    {
      useInitialFetch: false,
      method: "get",
    }
  );

  useEffect(() => {
    setIsLoading(true);
    makeRequest();
  }, []);

  useEffect(() => {
    if (data && data.status === 200) {
      setIsLoading(false);
      setActiveItem(data.proyect);
    }
  }, [data]);

  //elimino el proyecto
  const {
    data: proyectDeleted,
    isLoading: deletedLoad,
    makeRequest: setDeleteProyect,
    errorMessage,
    setIsLoading: setDeletedLoad,
  } = useFetch<ToDo>(`proyects/${id}`, {
    useInitialFetch: false,
    method: "delete",
  });
  const handleDeleteProyect = () => {
    setOpenModal(false);
    setDeleteProyect();
  };
  useEffect(() => {
    if (proyectDeleted && proyectDeleted.status === 200) {
      setDeletedLoad(false);
      toast({
        title: `Proyecto eliminado correctamennte`,
        description: `El proyecto ${proyectDeleted.data.name} fue eliminado correctamente.`,
        status: "success",
        isClosable: true,
        position: "bottom-right",
      });
      navigate("/");
    } else if (errorMessage && errorMessage.status === 400) {
      setDeletedLoad(false);
      toast({
        title: `${errorMessage.msg} #${errorMessage.status}`,
        description: "Revisa los datos y volve a enviar el proyecto",
        status: "error",
        isClosable: true,
        position: "bottom-right",
      });
    }
  }, [proyectDeleted, errorMessage]);

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
      {isLoading ? (
        <LoadingComponent
          loading={isLoading}
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
                <MenuItem
                  onClick={() => {
                    setOpenDrawerEdit(true);
                  }}
                >
                  Editar proyecto
                </MenuItem>
                <MenuItem>Agregar seccion adicional</MenuItem>
                <MenuItem
                  onClick={() => {
                    setOpenModal(true);
                  }}
                >
                  Eliminar Proyecto
                </MenuItem>
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
              <Text>{activeItem.desc}</Text>
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

      <Modal
        closeOnOverlayClick={false}
        isOpen={openModal}
        isCentered
        onClose={() => setOpenModal(false)}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Eliminar proyecto</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {deletedLoad ? (
              <LoadingComponent
                loading={deletedLoad}
                label="Eliminando el proyecto"
              />
            ) : (
              <Text>
                ¿Está seguro que desea eliminar el proyecto "
                <strong>{activeItem.name}</strong>"? Este será eliminado y no se
                podrá recuperar.
              </Text>
            )}
          </ModalBody>

          <ModalFooter>
            <Button variant="secondary" onClick={() => setOpenModal(false)}>
              Cancelar
            </Button>
            <Button
              color={"white"}
              transition="all 0.2s"
              bg={colorMode === "light" ? "primary" : "secondary"}
              _active={buttonReset}
              onClick={() => handleDeleteProyect()}
            >
              Eliminar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <DrawerComponent
        isOpen={openDrawerEdit}
        onClose={() => {
          setOpenDrawerEdit(false);
        }}
        isEditing={true}
        initialProyect={{
          name: activeItem.name,
          productionUrl: activeItem.productionUrl,
          repositoryUrl: activeItem.repositoryUrl,
          proyectType: activeItem.proyectType,
          description: activeItem.description,
          technologies: activeItem.technologyStack,
        }}
      />
    </Box>
  );
};

export default DetailPage;
