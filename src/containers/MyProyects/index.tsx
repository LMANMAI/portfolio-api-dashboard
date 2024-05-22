import {
  Card,
  SimpleGrid,
  Heading,
  CardHeader,
  CardBody,
  CardFooter,
  Text,
  Button,
  useColorMode,
} from "@chakra-ui/react";
import { mockData } from "./static";
import { ToDo } from "../../interfaces";
import { Link } from "react-router-dom";
const MyProyects = () => {
  const { colorMode } = useColorMode();

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
      {mockData.map((item: ToDo) => (
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
            {/* <Button
              fontWeight={"400"}
              fontSize={"14px"}
              variant={"primary"}
              onClick={() => console.log("")}
              color={colorMode === "light" ? "primary" : "secondary"}
            >
              Ver detalle
            </Button> */}
            <Link to={`/${item.id}`}>Ver detalle</Link>
          </CardFooter>
        </Card>
      ))}
    </SimpleGrid>
  );
};

export default MyProyects;
