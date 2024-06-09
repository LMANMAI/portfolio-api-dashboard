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
  Icon,
  FormLabel,
  Textarea,
} from "@chakra-ui/react";
import { LoadingComponent, DrawerComponent } from "../../components";
import { useContext, useEffect, useRef, useState } from "react";
import { ToDo } from "../../interfaces";
import { useNavigate, useParams } from "react-router-dom";
import { SettingsIcon } from "@chakra-ui/icons";
import useFetch from "../../hooks/useFetch";
import { BsPlusSquareFill } from "react-icons/bs";
import { GlobalContext } from "../../context/globalContex";
const DetailPage = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const toast = useToast();
  const navigate = useNavigate();
  const { id } = useParams<{ id: ToDo }>();
  const { colorMode } = useColorMode();
  const [activeItem, setActiveItem] = useState<ToDo>({});
  const [image, setImage] = useState<File | null>(null);
  const [aditionalDescription, setAditionalDescription] = useState<string>("");
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openModalAditionalDesct, setOpenModalAditionalDesct] =
    useState<boolean>(false);
  const [openDrawerEdit, setOpenDrawerEdit] = useState<boolean>(false);

  const [isEditingAditional, setIsEditingAditional] = useState<boolean>(false);
  const [aditionalId, setAditionalId] = useState<string | null>(null);
  const [aditionalIMG, setAditionalIMG] = useState<string>("");

  const buttonReset = {
    borderColor: colorMode !== "light" ? "secondary" : "primary",
    borderWidth: "2px",
    background: "transparent",
    color: colorMode !== "light" ? "secondary" : "primary",
  };
  const isDisabled = image == null || aditionalDescription == "";
  //me traigo los detalles del proyecto
  const { data, isLoading, makeRequest, setIsLoading } = useFetch<ToDo>(
    `proyects/${id}`,
    {
      useInitialFetch: false,
      method: "get",
    }
  );
  const {
    data: editedProyect,
    isLoading: editedProyectLoad,
    makeRequest: setEditedProyect,
    errorMessage: errorEditedProyect,
    setIsLoading: setEditedProyectLoad,
  } = useFetch<ToDo>(`proyects/aditionalData/${id}`, {
    useInitialFetch: false,
    method: "put",
  });

  //editar entrada
  const {
    data: editedEntry,
    isLoading: editedEntryLoad,
    makeRequest: setEditedEntry,
    errorMessage: errorEditedEntry,
  } = useFetch<ToDo>(`proyects/edit/${id}/${aditionalId}`, {
    useInitialFetch: false,
    method: "put",
  });
  //eliminar entrada
  const {
    data: deletedEntry,
    isLoading: deletedEntryLoad,
    makeRequest: setDeletedEntry,
    errorMessage: errorDeletedEntry,
    setIsLoading: setDeletedEntryLoad,
  } = useFetch<ToDo>(`proyects/deleteentry/${id}/${aditionalId}`, {
    useInitialFetch: false,
    method: "put",
  });
  const {
    data: currentProyectEdited,
    errorMessage: editMsg,
    makeRequest: editCurrentProyect,
  } = useFetch<ToDo>(`proyects/editproyect/${activeItem._id}`, {
    useInitialFetch: false,
    method: "put",
  });

  useEffect(() => {
    setIsLoading(true);
    makeRequest();
  }, [currentProyectEdited, id]);

  useEffect(() => {
    setIsLoading(true);
    if (data && data.status === 200) {
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
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

  //Adicion de la descripcion extra
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  const handleAditionalData = async () => {
    setEditedProyectLoad(true);
    const formData = new FormData();
    formData.append("description", JSON.stringify(aditionalDescription));
    if (image) {
      formData.append("image", image);
    }
    setEditedProyect({
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  useEffect(() => {
    if (editedProyect && editedProyect.status === 200) {
      setDeletedLoad(false);
      makeRequest();
      toast({
        title: `Descripcion agregada correctamente`,
        description: `El proyecto ${editedProyect.data.name} fue actualizado correctamente.`,
        status: "success",
        isClosable: true,
        position: "bottom-right",
      });
      setImage(null);
      setAditionalDescription("");
    }
  }, [editedProyect]);

  useEffect(() => {
    const errors = [
      errorEditedProyect,
      errorDeletedEntry,
      errorEditedEntry,
      editMsg,
    ];
    errors.forEach((error) => {
      if (error && error.status === 400) {
        setDeletedLoad(false);
        toast({
          title: `${error.msg} error#${error.status}`,
          status: "error",
          isClosable: true,
          position: "bottom-right",
        });
      }
    });
  }, [errorEditedProyect, errorDeletedEntry, errorEditedEntry, editMsg]);

  const openAditionalModal = (id?: string) => {
    if (id) {
      setIsEditingAditional(true);
      setAditionalId(id);
      const aditionalData = activeItem.aditionalData.find(
        (item: ToDo) => item._id === id
      );
      if (aditionalData) {
        setAditionalDescription(aditionalData.text);
        setAditionalIMG(aditionalData.img);
        setImage(null);
      }
    } else {
      setIsEditingAditional(false);
      setAditionalId(null);
      setAditionalDescription("");
      setImage(null);
    }
    setOpenModalAditionalDesct(true);
  };
  const handleEditAditionalData = async () => {
    const formData = new FormData();
    formData.append("text", aditionalDescription);

    if (image) {
      formData.append("image", image);
    } else formData.append("image", aditionalIMG);

    setEditedEntry({
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };
  const handleDeleteAditionalData = async () => {
    setDeletedEntryLoad(true);
    setDeletedEntry();
  };
  const editCurrentProyectByID = (edited: any) => {
    editCurrentProyect(edited);
    makeRequest();
  };

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
                icon={<SettingsIcon />}
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
                <MenuItem
                  onClick={() => {
                    setOpenModalAditionalDesct(true);
                  }}
                >
                  Agregar seccion adicional
                </MenuItem>
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
                h={"270px"}
                title="Imagen del proyecto"
                backgroundImage={
                  activeItem.posterPath &&
                  `${import.meta.env.VITE_URL_EP_CLOUD}${activeItem.posterPath}`
                }
                backgroundPosition="center"
                backgroundSize="cover"
                backgroundRepeat="no-repeat"
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
                    onClick={() => openAditionalModal(item._id)}
                    backgroundImage={`${import.meta.env.VITE_URL_EP_CLOUD}${
                      item.img
                    }`}
                    backgroundPosition="center"
                    backgroundSize="cover"
                    backgroundRepeat="no-repeat"
                    cursor={"pointer"}
                    title="click para editar"
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

      <Modal
        closeOnOverlayClick={false}
        isOpen={openModalAditionalDesct}
        isCentered
        size={"xl"}
        onClose={() => setOpenModalAditionalDesct(false)}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Agregar descripcion adicional</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {deletedLoad ? (
              <LoadingComponent
                loading={deletedLoad}
                label="Eliminando el proyecto"
              />
            ) : (
              <Stack>
                {/*Boton para agregar imagen*/}
                <Stack
                  flexDirection={"row"}
                  justifyContent={"end"}
                  alignItems={"end"}
                  width={"100%"}
                  h={"150px"}
                  marginBottom={"5px"}
                  title="Agregar imagen de portada al proyecto"
                  backgroundImage={
                    isEditingAditional && !image
                      ? `${import.meta.env.VITE_URL_EP_CLOUD}${aditionalIMG}`
                      : `url(${image !== null && URL.createObjectURL(image)})`
                  }
                  backgroundColor={
                    !image
                      ? `${
                          colorMode === "light" ? "bgLigthtMode" : "bgDarkMode"
                        }`
                      : ""
                  }
                  backgroundSize="cover"
                  backgroundPosition="center"
                  borderRadius={"5px"}
                  _hover={!image ? {} : { opacity: 0.75 }}
                  position={"relative"}
                >
                  <Button
                    variant={"primary"}
                    color={"white"}
                    width={"100%"}
                    h={"100%"}
                    _hover={{ opacity: 0.5 }}
                    flexDirection={"column"}
                  >
                    <Icon fontSize={30} as={BsPlusSquareFill} />
                    <FormLabel fontSize={"13px"} m={2}>
                      {!aditionalIMG
                        ? "Agregar portada del proyecto"
                        : "Cambiar imagen del proyecto"}
                    </FormLabel>
                    <input
                      type="file"
                      ref={inputRef}
                      style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        opacity: 0,
                        cursor: "pointer",
                      }}
                      accept="*.jpeg"
                      onChange={handleFileChange}
                    />
                  </Button>
                  <Button
                    onClick={() => setImage(null)}
                    h="10px"
                    width="10px"
                    fontSize={"10px"}
                    position={"absolute"}
                    right={"5px"}
                    bottom={"5px"}
                    className="delete_button"
                    visibility={image ? "visible" : "hidden"}
                    zIndex={2}
                    title="Eliminar imagen"
                  >
                    X
                  </Button>
                </Stack>
                <div style={{ margin: "10px 0px" }}>
                  <FormLabel>Descripcion del proyecto</FormLabel>
                  <Textarea
                    resize={"none"}
                    name="description"
                    value={aditionalDescription}
                    onChange={(e) => setAditionalDescription(e.target.value)}
                    placeholder="Descripción de lo desarrollado."
                  />
                </div>
              </Stack>
            )}
          </ModalBody>

          <ModalFooter>
            <Button
              variant="secondary"
              onClick={() => setOpenModalAditionalDesct(false)}
            >
              Cerrar
            </Button>
            <Box
              as="button"
              color={"white"}
              bg={colorMode === "light" ? "primary" : "secondary"}
              disabled={
                (!isEditingAditional && isDisabled) ||
                editedEntryLoad ||
                editedProyectLoad
              }
              padding={"0px 16px"}
              height={"30px"}
              borderRadius={"5px"}
              _active={buttonReset}
              onClick={() => {
                isEditingAditional
                  ? handleEditAditionalData()
                  : handleAditionalData();
              }}
              _disabled={{
                cursor: "not-allowed",
                backgroundColor: "#F5F6F7",
                color: "#4B4F56",
              }}
            >
              {isEditingAditional ? "Editar" : "Agregar"}
            </Box>
            {isEditingAditional && (
              <Button
                color={"red.500"}
                marginLeft={"10px"}
                onClick={() => handleDeleteAditionalData()}
                disabled={deletedEntryLoad}
                _disabled={{
                  cursor: "not-allowed",
                  backgroundColor: "#F5F6F7",
                  color: "#4B4F56",
                }}
              >
                Eliminar
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
      <DrawerComponent
        isOpen={openDrawerEdit}
        onClose={() => {
          setOpenDrawerEdit(false);
          makeRequest();
        }}
        isEditing={true}
        setEditProyect={editCurrentProyectByID}
        initialProyect={{
          name: activeItem.name,
          productionUrl: activeItem.productionUrl || "",
          repositoryUrl: activeItem.repositoryUrl || "",
          proyectType: activeItem.proyectType || "",
          description: activeItem.description || "",
          technologies: activeItem.technologyStack,
          aditionalData: activeItem.aditionalData,
          posterPath: activeItem.posterPath || "",
        }}
      />
    </Box>
  );
};

export default DetailPage;
