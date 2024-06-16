import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useColorMode,
  useToast,
} from "@chakra-ui/react";
import { FormLabelInput, FormLabelSelect } from "../";
import { ToDo } from "../../interfaces";
import { GlobalContext } from "../../context/globalContex";
import useFetch from "../../hooks/useFetch";

interface AddSkillModal {
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
}
const AddSkillsModal: React.FC<AddSkillModal> = ({
  openModal,
  setOpenModal,
}) => {
  const toast = useToast();
  const { colorMode } = useColorMode();
  const { setRefresPage } = useContext(GlobalContext);
  const [newSkill, setNewSkill] = useState<ToDo>({
    name: "",
    category: "",
  });
  const handleChangeProyect = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { value, name } = event.target;

    setNewSkill((prevProyect: ToDo) => ({
      ...prevProyect,
      [name]: value,
    }));
  };

  const {
    data,
    isLoading: loadingCreate,
    errorMessage,
    makeRequest,
  } = useFetch<ToDo>("skills/create", {
    useInitialFetch: false,
    method: "post",
  });

  const handleSubmit = () => {
    makeRequest({
      data: newSkill,
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  useEffect(() => {
    if ((!data && errorMessage.status === 400) || errorMessage.status === 404) {
      toast({
        title: `${errorMessage.msg}`,
        description: "Revisa los datos y volve a enviar el formulario",
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
      setRefresPage(true);
      setNewSkill({
        name: "",
        category: "",
      });
    }
  }, [data, errorMessage]);

  return (
    <Modal
      closeOnOverlayClick={false}
      isOpen={openModal}
      isCentered
      onClose={() => setOpenModal(false)}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Agregar habilidad o herramienta</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormLabelInput
            label="* Nombre de la habilidad o herramienta"
            name="name"
            value={newSkill.name}
            onChange={handleChangeProyect}
            placeholder="ej: React.JS"
          />
          <FormLabelSelect
            label="* Categoria de la habilidad o herramienta"
            name="category"
            value={newSkill.category}
            onChange={handleChangeProyect}
            placeholder="Seleccionar una categoria"
            options={[
              { value: "Front End", label: "Front End" },
              { value: "Back End", label: "Back End" },
              { value: "Documentacion", label: "Documentación" },
              { value: "Herramienta", label: "Herramienta" },
            ]}
          />
        </ModalBody>

        <ModalFooter>
          <Button variant="secondary" onClick={() => setOpenModal(false)}>
            Cancelar
          </Button>
          <Box
            as="button"
            color={"white"}
            padding={"0px 16px"}
            height={"30px"}
            borderRadius={"5px"}
            transition="all 0.2s"
            bg={colorMode === "light" ? "primary" : "secondary"}
            onClick={() => {
              handleSubmit();
            }}
            disabled={
              newSkill.name === "" || newSkill.category === "" || loadingCreate
            }
            _disabled={{
              cursor: "not-allowed",
              backgroundColor: "#F5F6F7",
              color: "#4B4F56",
            }}
          >
            Agregar
          </Box>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddSkillsModal;
