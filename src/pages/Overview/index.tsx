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
  useToast,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import AddContent from "../../containers/AddContent";
import { BsFillDoorOpenFill } from "react-icons/bs";
import { SignOutUser } from "../../config/firebase-config";

const OverviewPage = () => {
  const { colorMode } = useColorMode();
  const toast = useToast();

  return (
    <Box
      padding="4"
      color="black"
      w={"85%"}
      h={"85dvh"}
      bg={"#e5e7eb"}
      border={"1px solid #d8d8d8"}
      borderRadius={"5px"}
    >
      <Accordion defaultIndex={[0]} allowToggle marginY={4}>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Ingresar datos
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel p={0} marginY={4}>
            <AddContent />
          </AccordionPanel>
        </AccordionItem>
      </Accordion>

      <Tabs isFitted variant="enclosed">
        <TabList>
          <Tab>Agregar proyecto</Tab>
          <Tab>Mis proyectos</Tab>
          <Tab>Habilidades-Herramientas</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <p>one!</p>
          </TabPanel>
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
          toast({
            title: `Saliendo de la cuenta`,
            position: "top-right",
            isClosable: true,
          });
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
