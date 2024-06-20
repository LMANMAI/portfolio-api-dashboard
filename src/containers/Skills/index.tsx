import {
  Box,
  Button,
  Card,
  CardFooter,
  CardHeader,
  FormLabel,
  Heading,
  Icon,
  SimpleGrid,
  Tag,
  useColorMode,
  useToast,
} from "@chakra-ui/react";
import { ToDo } from "../../interfaces";
import { LoadingComponent, AddSkillsModal } from "../../components";
import { BsPlusSquareFill } from "react-icons/bs";
import { useContext, useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { DeleteIcon } from "@chakra-ui/icons";
import { GlobalContext } from "../../context/globalContex";

const SkillsAndTools: React.FC<{
  isLoading: boolean;
  skilsData: ToDo[];
}> = ({ isLoading, skilsData }) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [currentId, setCurrentId] = useState<string>("");
  const { colorMode } = useColorMode();
  const toast = useToast();
  const { setRefresPage } = useContext(GlobalContext);
  const {
    data,
    isLoading: loadingCreate,
    errorMessage,
    makeRequest,
  } = useFetch<ToDo>(`skills/${currentId}`, {
    useInitialFetch: false,
    method: "delete",
  });

  useEffect(() => {
    if (!data && errorMessage.status === 404 && currentId) {
      toast({
        title: `${errorMessage.msg}`,
        status: "error",
        isClosable: true,
        position: "bottom-right",
      });
    } else if (data && data.status === 200) {
      toast({
        title: `${data.message}`,
        status: "success",
        isClosable: true,
        position: "bottom-right",
      });
      setRefresPage(true);
    }
  }, [data, errorMessage]);

  useEffect(() => {
    makeRequest();
  }, [currentId]);
  return (
    <>
      {isLoading || loadingCreate ? (
        <LoadingComponent loading={isLoading} label="Obteniendo proyectos" />
      ) : (
        <SimpleGrid
          spacing={4}
          templateColumns={{
            base: "repeat(auto-fill, minmax(200px, 1fr))",
            md: "repeat(auto-fill, minmax(210px, 1fr))",
          }}
          templateRows={{
            base: "repeat(auto-fill, minmax(100px, 1fr))",
            md: "repeat(auto-fill, minmax(100px, 1fr))",
          }}
          overflow={"hidden"}
          overflowY={"auto"}
          height={"75dvh"}
          padding={"10px"}
        >
          <Card bg={colorMode === "light" ? "bgLigthtMode" : "bgDarkMode"}>
            <Button
              variant={"primary"}
              color={"white"}
              width={"100%"}
              h={"100%"}
              _hover={{ opacity: 0.5 }}
              flexDirection={"column"}
              onClick={() => setOpenModal(true)}
            >
              <Icon fontSize={30} as={BsPlusSquareFill} />
              <FormLabel fontSize={"13px"} m={2}>
                Agregar habilidad o herramienta
              </FormLabel>
            </Button>
          </Card>
          {skilsData.map((item: ToDo) => (
            <Card
              _hover={{ ".delete-icon": { visibility: "visible" } }}
              bg={colorMode === "light" ? "bgLigthtMode" : "bgDarkMode"}
            >
              <CardHeader
                padding={"10px"}
                display={"flex"}
                alignItems="center"
                justifyContent={"space-between"}
                flexDirection={"row"}
              >
                <Heading
                  fontSize={"24px"}
                  fontFamily={"ChocoBold"}
                  textTransform={"capitalize"}
                >
                  {item.name}
                </Heading>

                <Box
                  className="delete-icon"
                  visibility="hidden"
                  _groupHover={{ visibility: "visible" }}
                  onClick={() => {
                    setCurrentId(item._id);
                  }}
                >
                  <Icon cursor={"pointer"} fontSize={10} as={DeleteIcon} />
                </Box>
              </CardHeader>

              <CardFooter padding={"10px"} justifyContent={"end"}>
                <div
                  style={{ display: "flex", gap: "10px", margin: "10px 0px" }}
                >
                  <Tag>{item.category}</Tag>
                </div>
              </CardFooter>
            </Card>
          ))}
        </SimpleGrid>
      )}
      <AddSkillsModal openModal={openModal} setOpenModal={setOpenModal} />
    </>
  );
};

export default SkillsAndTools;
