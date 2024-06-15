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
  Text,
  useColorMode,
} from "@chakra-ui/react";
import LoadingComponent from "../Loading";

interface DeleteProjectModalProps {
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
  deletedLoad: boolean;
  activeItem: { name: string };
  handleDeleteProyect: () => void;
}

const DeleteProjectModal: React.FC<DeleteProjectModalProps> = ({
  openModal,
  setOpenModal,
  deletedLoad,
  activeItem,
  handleDeleteProyect,
}) => {
  const { colorMode } = useColorMode();

  return (
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
            onClick={handleDeleteProyect}
          >
            Eliminar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteProjectModal;
