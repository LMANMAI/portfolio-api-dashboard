import React, { useRef } from "react";
import { Stack, Button, Icon, FormLabel, useColorMode } from "@chakra-ui/react";
import { BsPlusSquareFill } from "react-icons/bs";

interface CoverImageUploaderProps {
  image: File | null;
  setImage: (file: File | null) => void;
  isEditing: boolean;
  initialProyect: { posterPath: string };
}

const CoverImageUploader: React.FC<CoverImageUploaderProps> = ({
  image,
  setImage,
  isEditing,
  initialProyect,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { colorMode } = useColorMode();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setImage(file);
      event.target.value = "";
    }
  };

  return (
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
          ? `${import.meta.env.VITE_URL_EP_CLOUD}${initialProyect.posterPath}`
          : ""
      }
      backgroundColor={
        !image ? `${colorMode === "light" ? "bgLigthtMode" : "bgDarkMode"}` : ""
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
        // onClick={() => inputRef.current?.click()}
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
          accept="image/*"
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
  );
};

export default CoverImageUploader;
