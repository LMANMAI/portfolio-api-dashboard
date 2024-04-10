import {
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Button,
  useColorMode,
  Icon,
} from "@chakra-ui/react";
import AddContent from "../../containers/AddContent";
import { BsFillDoorOpenFill } from "react-icons/bs";
import { SignOutUser } from "../../config/firebase-config";

const OverviewPage = () => {
  const { colorMode } = useColorMode();

  return (
    <Box padding="4" color="black" w={"90%"} h={"60dvh"}>
      <Tabs>
        <TabList>
          <Tab>Agregar proyecto</Tab>
          <Tab>Mis proyectos</Tab>
          <Tab>Habilidades-Herramientas</Tab>
        </TabList>

        <TabPanels>
          <AddContent />

          <TabPanel>
            <p>two!</p>
          </TabPanel>
          <TabPanel>
            <p>three!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
      <Button
        onClick={() => {
          SignOutUser();
        }}
        title="Cerrar sesion"
        position={"absolute"}
        bottom={"10px"}
        right={"65px"}
        variant={"primary"}
        bg={colorMode === "light" ? "primary" : "secondary"}
        color={"white"}
      >
        <Icon as={BsFillDoorOpenFill} />
      </Button>
    </Box>
  );
};

export default OverviewPage;
