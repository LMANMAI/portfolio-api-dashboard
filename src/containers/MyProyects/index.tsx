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
import useFetch from "../../hooks/useFetch";
import { useEffect, useState } from "react";
const MyProyects = () => {
  const [proyectsData, setProyectsData] = useState<ToDo[]>([]);
  const { colorMode } = useColorMode();
  const { data: proyectsFetch, makeRequest: getProyects } = useFetch<any>(
    "proyects",
    {
      useInitialFetch: true,
      method: "get",
    }
  );
  useEffect(() => {
    if (proyectsFetch && proyectsFetch.status === 200) {
      setProyectsData(proyectsFetch.proyects);
    } else setProyectsData([]);
  }, [proyectsFetch]);

  return (
    <SimpleGrid
      spacing={4}
      templateColumns={{
        base: "repeat(auto-fill, minmax(45%, 1fr))",
        md: "repeat(auto-fill, minmax(30%, 1fr))",
      }}
      templateRows={{
        base: "repeat(auto-fill, minmax(250px, 1fr))",
        md: "repeat(auto-fill, minmax(250px, 1fr))",
      }}
      overflow={"hidden"}
      overflowY={"auto"}
      height={"75dvh"}
      padding={"10px"}
    >
      {proyectsData.map((item: ToDo) => (
        <Card bg={colorMode === "light" ? "bgLigthtMode" : "bgDarkMode"}>
          <CardHeader padding={"10px"}>
            <Heading
              fontSize={"34px"}
              fontFamily={"ChocoBold"}
              textTransform={"capitalize"}
            >
              {item.name}
            </Heading>
          </CardHeader>
          <CardBody padding={"10px"}>
            <Text fontSize={"13px"}>{item.description}</Text>
          </CardBody>
          <CardFooter padding={"10px"} justifyContent={"end"}>
            <Link to={`/${item.name}`}>Ver detalle</Link>
          </CardFooter>
        </Card>
      ))}
    </SimpleGrid>
  );
};

export default MyProyects;
