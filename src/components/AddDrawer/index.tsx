import React, { useState, useRef, useEffect, useContext } from "react";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Stack,
  Input,
  FormControl,
  FormLabel,
  Textarea,
  Select,
  Tag,
  useColorMode,
  Icon,
  Box,
  useToast,
} from "@chakra-ui/react";
import { ToDo } from "../../interfaces";
import { BsPlusSquareFill } from "react-icons/bs";
import useFetch from "../../hooks/useFetch";
import LoadingComponent from "../Loading";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../context/globalContex";

const DrawerComponent: React.FC<{
  onClose: () => void;
  isOpen: boolean;
  initialProyect?: ToDo;
  isEditing?: boolean;
  setEditProyect?: (proyect: any) => void;
}> = ({
  isOpen,
  onClose,
  initialProyect,
  isEditing,
  setEditProyect = () => {},
}) => {
  const toast = useToast();
  const navigate = useNavigate();
  const { colorMode } = useColorMode();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { setRefresPage } = useContext(GlobalContext);

  const [technologiesSelected, setTechnologiesSelected] = useState<string[]>(
    initialProyect?.technologies || []
  );
  const [image, setImage] = useState<File | null>(null);
  const [proyect, setProyect] = useState<ToDo>(
    initialProyect || {
      name: "",
      productionUrl: "",
      repositoryUrl: "",
      proyectType: "",
      description: "",
      technologies: [],
    }
  );
  const [urlErrors, setUrlErrors] = useState<{ [key: string]: string }>({
    productionUrl: "",
    repositoryUrl: "",
  });
  useEffect(() => {
    if (initialProyect) {
      setProyect(initialProyect);
      setTechnologiesSelected(initialProyect.technologies || []);
    }
  }, [initialProyect]);
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    const alreadyIncluded = technologiesSelected.includes(value);
    if (!alreadyIncluded) {
      setTechnologiesSelected([...technologiesSelected, value]);
    } else
      setTechnologiesSelected(
        technologiesSelected.filter((item: string) => item !== value)
      );
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };
  const handleChangeProyect = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { value, name } = event.target;
    if (name === "productionUrl" || name === "repositoryUrl") {
      if (!isValidUrl(value)) {
        setUrlErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "URL no válida",
        }));
      } else {
        setUrlErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "",
        }));
      }
    }
    setProyect((prevProyect: ToDo) => ({
      ...prevProyect,
      [name]: value,
    }));
  };

  const isValidUrl = (url: string) => {
    const urlPattern = new RegExp(
      /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi
    );
    return !!urlPattern.test(url);
  };
  const clearForm = () => {
    setIsLoading(false);
    setTechnologiesSelected([]);
    setImage(null);
    setProyect({
      name: "",
      productionUrl: "",
      repositoryUrl: "",
      proyectType: "",
      description: "",
    });
  };
  const { data, isLoading, errorMessage, makeRequest, setIsLoading } =
    useFetch<ToDo>("proyects/create", {
      useInitialFetch: false,
      method: "post",
    });

  useEffect(() => {
    if ((!data && errorMessage.status === 400) || errorMessage.status === 404) {
      toast({
        title: `${errorMessage.msg}`,
        description: "Revisa los datos y volve a enviar el proyecto",
        status: "error",
        isClosable: true,
        position: "bottom-right",
      });
    } else if (data && data.status === 200) {
      toast({
        title: `${data.message}`,
        description: "Se restablecera el formulario.",
        status: "success",
        isClosable: true,
        position: "bottom-right",
      });
      clearForm();
    }
  }, [data, errorMessage]);

  const handleSubmit = () => {
    if (urlErrors.productionUrl || urlErrors.repositoryUrl) {
      alert("Por favor, corrige las URLs inválidas antes de enviar.");
      return;
    }

    const formData = new FormData();
    proyect.technologyStack = technologiesSelected;

    formData.append("proyect", JSON.stringify(proyect));
    if (image) {
      formData.append("image", image);
    }
    if (isEditing) {
      setEditProyect({
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } else {
      makeRequest({
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setRefresPage(true);
      navigate("/");
    }
    onClose();
  };

  const isDisabled =
    proyect.name === "" ||
    proyect.productionUrl === "" ||
    proyect.repositoryUrl === "" ||
    (proyect.proyectType === "" && image !== null);

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={"md"}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>
          {isEditing ? "Editar proyecto" : "Agregar proyecto"}
        </DrawerHeader>

        <DrawerBody>
          {isLoading ? (
            <LoadingComponent
              loading={isLoading}
              label={isEditing ? "Actualizando proyecto" : "Guardando proyecto"}
            />
          ) : (
            <FormControl>
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
                  image
                    ? `url(${URL.createObjectURL(image)})`
                    : isEditing
                    ? `${import.meta.env.VITE_URL_EP_CLOUD}${
                        initialProyect.posterPath
                      }`
                    : ""
                }
                backgroundColor={
                  !image
                    ? `${colorMode === "light" ? "bgLigthtMode" : "bgDarkMode"}`
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
                    {!image && !isEditing
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
              <div
                style={{ display: "flex", gap: "10px", margin: "2.5px 0px" }}
              >
                <div style={{ width: "100%" }}>
                  <FormLabel>* Nombre del proyecto</FormLabel>
                  <Input
                    name="name"
                    value={proyect.name}
                    onChange={(e) => handleChangeProyect(e)}
                    placeholder="Nombre del proyecto"
                  />
                </div>
                <div style={{ width: "100%" }}>
                  <FormLabel>* Url del proyecto</FormLabel>
                  <Input
                    name="productionUrl"
                    value={proyect.productionUrl}
                    onChange={(e) => handleChangeProyect(e)}
                    placeholder="https://url.vercel.com"
                  />
                  {urlErrors.productionUrl && (
                    <p style={{ color: "red" }}>{urlErrors.productionUrl}</p>
                  )}
                </div>
              </div>
              <div style={{ display: "flex", gap: "10px", margin: "5px 0px" }}>
                <div style={{ width: "100%" }}>
                  <FormLabel>* Url del repositorio</FormLabel>
                  <Input
                    name="repositoryUrl"
                    value={proyect.repositoryUrl}
                    onChange={(e) => handleChangeProyect(e)}
                    placeholder="https://github.com/LMANMAI"
                  />
                  {urlErrors.repositoryUrl && (
                    <p style={{ color: "red" }}>{urlErrors.repositoryUrl}</p>
                  )}
                </div>

                <div style={{ width: "100%" }}>
                  <FormLabel>* Tipo de proyecto</FormLabel>
                  <Select
                    size="md"
                    w={"100%"}
                    name={"proyectType"}
                    value={proyect.proyectType}
                    onChange={(e) => handleChangeProyect(e)}
                    placeholder="Seleccion un tipo"
                  >
                    <option value="Front_end">Frontend</option>
                    <option value="Back_end">Backend</option>
                  </Select>
                </div>
              </div>
              <div style={{ display: "flex", gap: "10px", margin: "5px 0px" }}>
                <div style={{ width: "100%" }}>
                  <FormLabel>* Tecnologias</FormLabel>

                  <Select
                    size="md"
                    w={"100%"}
                    placeholder="Seleccionar tecnologias"
                    onChange={handleChange}
                  >
                    {/*Esto deberia cargarse con un endpoint, el mismo que traiiga las skiills y herramientas*/}
                    <option value="Rect.js">Rect.js</option>
                    <option value="Node.js">Node.js</option>
                    <option value="Mongo DB">Mongo DB</option>
                    <option value="Figma">Figma</option>
                    <option value="React Native">React Native</option>
                    <option value="CSS">CSS</option>
                  </Select>

                  <div
                    style={{ display: "flex", gap: "10px", margin: "10px 0px" }}
                  >
                    {technologiesSelected.length > 0 &&
                      technologiesSelected.map((item: string) => (
                        <Tag>{item}</Tag>
                      ))}
                  </div>
                </div>
              </div>
              <div style={{ margin: "10px 0px" }}>
                <FormLabel>Descripcion del proyecto</FormLabel>
                <Textarea
                  resize={"none"}
                  name="description"
                  height={"275px"}
                  value={proyect.description}
                  onChange={(e) => handleChangeProyect(e)}
                  placeholder="Descripción de lo desarrollado."
                />
              </div>
            </FormControl>
          )}
        </DrawerBody>

        <DrawerFooter>
          <Button
            variant="outline"
            mr={3}
            onClick={() => {
              onClose();
              clearForm();
            }}
            height={"30px"}
            borderRadius={"5px"}
            borderColor={colorMode === "light" ? "primary" : "secondary"}
            borderWidth={"3px"}
          >
            Cancelar
          </Button>
          <Box
            as="button"
            color={"white"}
            bg={colorMode === "light" ? "primary" : "secondary"}
            disabled={isDisabled}
            padding={"0px 16px"}
            height={"30px"}
            borderRadius={"5px"}
            onClick={() => {
              handleSubmit();
            }}
            _disabled={{
              cursor: "not-allowed",
              backgroundColor: "#F5F6F7",
              color: "#4B4F56",
            }}
          >
            {isEditing ? "Actualizar" : "Guardar"}
          </Box>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerComponent;
