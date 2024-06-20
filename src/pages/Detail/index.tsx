import {
  Box,
  Stack,
  Tag,
  Text,
  useColorMode,
  useToast,
} from "@chakra-ui/react";
import {
  LoadingComponent,
  DrawerComponent,
  DeleteProjectModal,
  AddDescriptionModal,
  ProjectOptionsMenu,
} from "../../components";
import { useEffect, useState } from "react";
import { ToDo } from "../../interfaces";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

const DetailPage = () => {
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
    isLoading: editedEntryLoad,
    makeRequest: setEditedEntry,
    errorMessage: errorEditedEntry,
  } = useFetch<ToDo>(`proyects/edit/${id}/${aditionalId}`, {
    useInitialFetch: false,
    method: "put",
  });

  //eliminar entrada
  const {
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
    if (currentProyectEdited && currentProyectEdited.status === 200) {
      setIsLoading(false);
    }
  }, [currentProyectEdited, id]);

  useEffect(() => {
    setIsLoading(true);
    if (data && data.status === 200) {
      // setTimeout(() => {
      setIsLoading(false);
      //}, 750);
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
    setIsLoading(true);
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
            <ProjectOptionsMenu
              setOpenDrawerEdit={setOpenDrawerEdit}
              setOpenModalAditionalDesct={setOpenModalAditionalDesct}
              setOpenModal={setOpenModal}
              buttonReset={buttonReset}
            />
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

      <DeleteProjectModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        deletedLoad={deletedLoad}
        activeItem={activeItem}
        handleDeleteProyect={handleDeleteProyect}
      />
      <AddDescriptionModal
        openModalAditionalDesct={openModalAditionalDesct}
        setOpenModalAditionalDesct={setOpenModalAditionalDesct}
        deletedLoad={deletedLoad}
        image={image}
        setImage={setImage}
        activeItem={activeItem}
        aditionalDescription={aditionalDescription}
        setAditionalDescription={setAditionalDescription}
        isEditingAditional={isEditingAditional}
        isDisabled={isDisabled}
        editedEntryLoad={editedEntryLoad}
        editedProyectLoad={editedProyectLoad}
        handleEditAditionalData={handleEditAditionalData}
        handleAditionalData={handleAditionalData}
        handleDeleteAditionalData={handleDeleteAditionalData}
      />

      <DrawerComponent
        isOpen={openDrawerEdit}
        onClose={() => {
          setOpenDrawerEdit(false);
        }}
        isEditing={true}
        setEditProyect={editCurrentProyectByID}
        isLoading={isLoading}
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
