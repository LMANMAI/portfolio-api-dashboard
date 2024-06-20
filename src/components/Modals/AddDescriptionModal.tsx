import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Stack,
  Box,
  useColorMode,
} from "@chakra-ui/react";
import { LoadingComponent, CoverImageUploader, FormLabelTextarea } from "../";

interface AddDescriptionModalProps {
  openModalAditionalDesct: boolean;
  setOpenModalAditionalDesct: (open: boolean) => void;
  deletedLoad: boolean;
  image: File | null;
  setImage: (file: File | null) => void;
  activeItem: { posterPath: string };
  aditionalDescription: string;
  setAditionalDescription: (description: string) => void;
  isEditingAditional: boolean;
  isDisabled: boolean;
  editedEntryLoad: boolean;
  editedProyectLoad: boolean;
  handleEditAditionalData: () => void;
  handleAditionalData: () => void;
  handleDeleteAditionalData: () => void;
}

const AddDescriptionModal: React.FC<AddDescriptionModalProps> = ({
  openModalAditionalDesct,
  setOpenModalAditionalDesct,
  deletedLoad,
  image,
  setImage,
  activeItem,
  aditionalDescription,
  setAditionalDescription,
  isEditingAditional,
  isDisabled,
  editedEntryLoad,
  editedProyectLoad,
  handleEditAditionalData,
  handleAditionalData,
  handleDeleteAditionalData,
}) => {
  const { colorMode } = useColorMode();
  const buttonReset = {}; // Define tu estilo personalizado aquí

  return (
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
              <CoverImageUploader
                image={image}
                setImage={setImage}
                isEditing={false}
                initialProyect={activeItem}
              />
              <div style={{ margin: "10px 0px" }}>
                <FormLabelTextarea
                  label="Descripcion del proyecto"
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
              onClick={handleDeleteAditionalData}
              disabled={deletedLoad}
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
  );
};

export default AddDescriptionModal;
