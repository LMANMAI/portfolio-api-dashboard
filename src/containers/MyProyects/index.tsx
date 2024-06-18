import {
  Card,
  SimpleGrid,
  Heading,
  CardHeader,
  CardBody,
  CardFooter,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { ToDo } from "../../interfaces";
import { Link } from "react-router-dom";
import { LoadingComponent } from "../../components";
const MyProyects: React.FC<{ isLoading: boolean; proyectsData: ToDo[] }> = ({
  isLoading,
  proyectsData,
}) => {
  const { colorMode } = useColorMode();

  return (
    <>
      {isLoading ? (
        <LoadingComponent loading={isLoading} label="Obteniendo proyectos" />
      ) : proyectsData.length > 0 ? (
        <SimpleGrid
          spacing={4}
          templateColumns={{
            base: "1fr",
            sm: "repeat(auto-fill, minmax(45%, 1fr))",
            md: "repeat(auto-fill, minmax(30%, 1fr))",
          }}
          templateRows={{
            base: "1fr",
            sm: "repeat(auto-fill, minmax(250px, 1fr))",
            md: "repeat(auto-fill, minmax(250px, 1fr))",
          }}
          overflow={"hidden"}
          overflowY={"auto"}
          height={"75dvh"}
          padding={"10px"}
        >
          {proyectsData.map((item: ToDo) => (
            <Card
              height={"250px"}
              bg={colorMode === "light" ? "bgLigthtMode" : "bgDarkMode"}
            >
              <CardHeader padding={"10px"}>
                <Heading
                  fontSize={"34px"}
                  fontFamily={"ChocoBold"}
                  textTransform={"capitalize"}
                >
                  {item.name}
                </Heading>
              </CardHeader>
              <CardBody padding={"10px"} overflow={"hidden"}>
                <Text
                  fontSize={"13px"}
                  overflow="hidden"
                  textOverflow="ellipsis"
                  display="-webkit-box"
                >
                  {item.description}
                </Text>
              </CardBody>
              <CardFooter padding={"10px"} justifyContent={"end"}>
                <Link to={`/${item._id}`}>Ver detalle</Link>
              </CardFooter>
            </Card>
          ))}
        </SimpleGrid>
      ) : (
        <Text>No se encontraron datos</Text>
      )}
    </>
  );
};

export default MyProyects;
