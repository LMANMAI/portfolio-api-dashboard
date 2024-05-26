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
} from "@chakra-ui/react";
import { ToDo } from "../../interfaces";
import { BsPlusSquareFill } from "react-icons/bs";
const DrawerComponent: React.FC<{ onClose: () => void; isOpen: boolean }> = ({
  isOpen,
  onClose,
}) => {
  const { colorMode } = useColorMode();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [technologiesSelected, setTechnologiesSelected] = useState<string[]>(
    []
  );
  const [image, setImage] = useState<string | null>(null);
  const [proyect, setProyect] = useState<ToDo>({
    name: "Panelify",
    productionUrl: "https://proyecto1.com",
    repositoryUrl: "https://github.com/usuario/proyecto1",
    technologyStack: ["React", "Redux"],
    proyectType: "Front_End",
    description:
      "Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500,1",
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
      console.log("Selected file:", file);
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };
  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={"md"}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Agregar proyecto</DrawerHeader>

        <DrawerBody>
          <FormControl>
            <Stack
              flexDirection={"row"}
              justifyContent={"end"}
              alignItems={"end"}
              width={"100%"}
              h={"150px"}
              marginBottom={"5px"}
              title="Agregar imagen de portada al proyecto"
              backgroundImage={image ? `url(${image})` : ""}
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
                _hover={!image ? {} : { opacity: 0.5 }}
              >
                <Icon fontSize={30} as={BsPlusSquareFill} />
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
                <FormLabel>Nombre del proyecto</FormLabel>
                <Input placeholder="Nombre del proyecto" />
              </div>
              <div style={{ width: "100%" }}>
                <FormLabel>Url del proyecto</FormLabel>
                <Input placeholder="https://url.vercel.com" />
              </div>
            </div>
            <div style={{ display: "flex", gap: "10px", margin: "5px 0px" }}>
              <div style={{ width: "100%" }}>
                <FormLabel>Url del repositorio</FormLabel>
                <Input placeholder="https://github.com/LMANMAI" />
              </div>

              <div style={{ width: "100%" }}>
                <FormLabel>Tipo de proyecto</FormLabel>
                <Select size="md" w={"100%"} placeholder="Seleccion un tipo">
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </Select>
              </div>
            </div>
            <div style={{ display: "flex", gap: "10px", margin: "5px 0px" }}>
              <div style={{ width: "100%" }}>
                <FormLabel>Tecnologias</FormLabel>
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
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </Select>
              </div>
            </div>
            <div style={{ margin: "10px 0px" }}>
              <FormLabel>Descripcion del proyecto</FormLabel>
              <Textarea
                resize={"none"}
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
            borderColor={colorMode === "light" ? "primary" : "secondary"}
            borderWidth={"3px"}
          >
            Cancelar
          </Button>
          <Button
            variant={"primary"}
            color={"white"}
            bg={colorMode === "light" ? "primary" : "secondary"}
            onClick={() => {
              setTechnologiesSelected([]);
            }}
          >
            Guardar
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerComponent;
