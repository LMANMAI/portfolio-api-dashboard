import React, { useState, useEffect, useContext } from "react";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  FormControl,
  Tag,
  useColorMode,
  Box,
  useToast,
} from "@chakra-ui/react";
import { ToDo } from "../../interfaces";
import useFetch from "../../hooks/useFetch";
import { LoadingComponent, CoverImageUploader } from "../index";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../context/globalContex";
import { FormLabelInput, FormLabelSelect, FormLabelTextarea } from "../";
const DrawerComponent: React.FC<{
  onClose: () => void;
  isOpen: boolean;
  initialProyect?: ToDo;
  isEditing?: boolean;
  isLoading?: boolean;
  setEditProyect?: (proyect: any) => void;
}> = ({
  isOpen,
  onClose,
  initialProyect,
  isEditing,
  isLoading = false,
  setEditProyect = () => {},
}) => {
  const toast = useToast();
  const navigate = useNavigate();
  const { colorMode } = useColorMode();

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
  const {
    data,
    isLoading: loadingCreate,
    errorMessage,
    makeRequest,
    setIsLoading,
  } = useFetch<ToDo>("proyects/create", {
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
      onClose();
      setRefresPage(true);
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

      navigate("/");
    }
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
          {isLoading || loadingCreate ? (
            <LoadingComponent
              loading={isLoading || loadingCreate}
              label={isEditing ? "Actualizando proyecto" : "Guardando proyecto"}
            />
          ) : (
            <FormControl>
              <CoverImageUploader
                image={image}
                setImage={setImage}
                isEditing={isEditing || false}
                initialProyect={initialProyect}
              />
              <div
                style={{ display: "flex", gap: "10px", margin: "2.5px 0px" }}
              >
                <FormLabelInput
                  label="* Nombre del proyecto"
                  name="name"
                  value={proyect.name}
                  onChange={handleChangeProyect}
                  placeholder="Nombre del proyecto"
                />
                <FormLabelInput
                  label="* Url del proyecto"
                  name="productionUrl"
                  value={proyect.productionUrl}
                  onChange={handleChangeProyect}
                  placeholder="https://url.vercel.com"
                  errorMessage={urlErrors.productionUrl}
                />
              </div>
              <div style={{ display: "flex", gap: "10px", margin: "5px 0px" }}>
                <FormLabelInput
                  label="* Url del repositorio"
                  name="repositoryUrl"
                  value={proyect.repositoryUrl}
                  onChange={handleChangeProyect}
                  placeholder="https://github.com/LMANMAI"
                  errorMessage={urlErrors.repositoryUrl}
                />
                <FormLabelSelect
                  label="* Tipo de proyecto"
                  name="proyectType"
                  value={proyect.proyectType}
                  onChange={handleChangeProyect}
                  placeholder="Seleccionar un tipo"
                  options={[
                    { value: "Front_end", label: "Frontend" },
                    { value: "Back_end", label: "Backend" },
                  ]}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  margin: "5px 0px",
                  flexDirection: "column",
                }}
              >
                <FormLabelSelect
                  label="* Tecnologías"
                  name="technologies"
                  value=""
                  onChange={handleChange}
                  placeholder="Seleccionar tecnologías"
                  options={[
                    { value: "React.js", label: "React.js" },
                    { value: "Node.js", label: "Node.js" },
                    { value: "Mongo DB", label: "Mongo DB" },
                    { value: "Figma", label: "Figma" },
                    { value: "React Native", label: "React Native" },
                    { value: "CSS", label: "CSS" },
                  ]}
                />
                <div
                  style={{ display: "flex", gap: "10px", margin: "10px 0px" }}
                >
                  {technologiesSelected.length > 0 &&
                    technologiesSelected.map((item: string) => (
                      <Tag key={item}>{item}</Tag>
                    ))}
                </div>
              </div>
              <FormLabelTextarea
                label="Descripción del proyecto"
                name="description"
                value={proyect.description}
                onChange={handleChangeProyect}
                placeholder="Descripción de lo desarrollado."
                height={"200px"}
              />
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
