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

  const truncateText = (text: string, maxLength: number) => {
    console.log(text);
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  return (
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
          <CardBody padding={"10px"}>
            <Text
              fontSize={"13px"}
              overflow="hidden"
              textOverflow="ellipsis"
              display="-webkit-box"
            >
              {item.description && truncateText(item?.description, 200)}
            </Text>
          </CardBody>
          <CardFooter padding={"10px"} justifyContent={"end"}>
            <Link to={`/${item._id}`}>Ver detalle</Link>
          </CardFooter>
        </Card>
      ))}
    </SimpleGrid>
  );
};

export default MyProyects;
