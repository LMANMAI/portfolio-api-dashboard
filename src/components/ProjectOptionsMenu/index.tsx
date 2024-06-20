import React from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  useColorMode,
} from "@chakra-ui/react";
import { SettingsIcon } from "@chakra-ui/icons";

interface ProjectOptionsMenuProps {
  setOpenDrawerEdit: (open: boolean) => void;
  setOpenModalAditionalDesct: (open: boolean) => void;
  setOpenModal: (open: boolean) => void;
  buttonReset: any;
}

const ProjectOptionsMenu: React.FC<ProjectOptionsMenuProps> = ({
  setOpenDrawerEdit,
  setOpenModalAditionalDesct,
  setOpenModal,
  buttonReset,
}) => {
  const { colorMode } = useColorMode();

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<SettingsIcon />}
        variant="outline"
        color="white"
        transition="all 0.2s"
        bg={colorMode === "light" ? "primary" : "secondary"}
        _active={buttonReset}
        _hover={buttonReset}
      />
      <MenuList color={colorMode === "light" ? "#2c2c2c" : "white"}>
        <MenuItem onClick={() => setOpenDrawerEdit(true)}>
          Editar proyecto
        </MenuItem>
        <MenuItem onClick={() => setOpenModalAditionalDesct(true)}>
          Agregar seccion adicional
        </MenuItem>
        <MenuItem onClick={() => setOpenModal(true)}>
          Eliminar Proyecto
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default ProjectOptionsMenu;
