import React, { useState, useRef } from "react";
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
} from "@chakra-ui/react";
import { ToDo } from "../../interfaces";
import { BsPlusSquareFill } from "react-icons/bs";
import useFetch from "../../hooks/useFetch";
const DrawerComponent: React.FC<{ onClose: () => void; isOpen: boolean }> = ({
  isOpen,
  onClose,
}) => {
  const { colorMode } = useColorMode();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [technologiesSelected, setTechnologiesSelected] = useState<string[]>(
    []
  );
  const [image, setImage] = useState<File | null>(null);
  const [proyect, setProyect] = useState<ToDo>({
    name: "",
    productionUrl: "",
    repositoryUrl: "",
    proyectType: "",
    description: "",
  });
  const [urlErrors, setUrlErrors] = useState<{ [key: string]: string }>({
    productionUrl: "",
    repositoryUrl: "",
  });

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

  const { /* data, isLoading,*/ errorMessage, makeRequest } = useFetch(
    "proyects/create",
    {
      useInitialFetch: false,
      method: "post",
    }
  );

  const handleSubmit = () => {
    if (urlErrors.productionUrl || urlErrors.repositoryUrl) {
      alert("Por favor, corrige las URLs inválidas antes de enviar.");
      return;
    }

    const formData = new FormData();
    formData.append("proyect", JSON.stringify(proyect));
    if (image) {
      formData.append("image", image);
    }

    makeRequest({
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  const isDisabled =
    proyect.name === "" ||
    proyect.productionUrl === "" ||
    proyect.repositoryUrl === "" ||
    proyect.proyectType === "";
  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={"md"}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Agregar proyecto</DrawerHeader>

        <DrawerBody>
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
                image ? `url(${URL.createObjectURL(image)})` : ""
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
                  {!image
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
            <div style={{ display: "flex", gap: "10px", margin: "2.5px 0px" }}>
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
                  onChange={(e) => handleChangeProyect(e)}
                  placeholder="Seleccion un tipo"
                >
                  <option value="option2">Frontend</option>
                  <option value="option3">Backend</option>
                </Select>
              </div>
            </div>
            <div style={{ display: "flex", gap: "10px", margin: "5px 0px" }}>
              <div style={{ width: "100%" }}>
                <FormLabel>* Tecnologias</FormLabel>
                <div
                  style={{ display: "flex", gap: "10px", margin: "10px 0px" }}
                >
                  {technologiesSelected.length > 0 &&
                    technologiesSelected.map((item: string) => (
                      <Tag>{item}</Tag>
                    ))}
                </div>
                <Select
                  size="md"
                  w={"100%"}
                  placeholder="Seleccionar tecnologias"
                  onChange={handleChange}
                >
                  {/*Esto deberia cargarse con un endpoint, el mismo que traiiga las skiills y herramientas*/}
                  <option value="option1">Rect.js</option>
                  <option value="option2">Node.js</option>
                  <option value="option3">Mongo DB</option>
                  <option value="option1">Rect.js</option>
                  <option value="option2">Node.js</option>
                  <option value="option3">Mongo DB</option>
                </Select>
              </div>
            </div>
            <div style={{ margin: "10px 0px" }}>
              <FormLabel>Descripcion del proyecto</FormLabel>
              <Textarea
                resize={"none"}
                name="description"
                value={proyect.description}
                onChange={(e) => handleChangeProyect(e)}
                placeholder="Descripción de lo desarrollado."
              />
            </div>
          </FormControl>
        </DrawerBody>

        <DrawerFooter>
          <Button
            variant="outline"
            mr={3}
            onClick={() => {
              onClose();
              setTechnologiesSelected([]);
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
            //variant={"primary"}
            color={"white"}
            bg={colorMode === "light" ? "primary" : "secondary"}
            disabled={isDisabled}
            padding={"0px 16px"}
            height={"30px"}
            borderRadius={"5px"}
            onClick={() => {
              //setTechnologiesSelected([]);
              handleSubmit();
              console.log(proyect, "proyect");
            }}
            _disabled={{
              cursor: "not-allowed",
              backgroundColor: "#F5F6F7",
              color: "#4B4F56",
            }}
          >
            Guardar
          </Box>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerComponent;
