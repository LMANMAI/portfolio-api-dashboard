import { Box, Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import AddContent from "../../containers/AddContent";

const OverviewPage = () => {
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
    </Box>
  );
};

export default OverviewPage;
