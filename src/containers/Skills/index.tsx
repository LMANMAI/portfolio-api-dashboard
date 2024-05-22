import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  SimpleGrid,
  Tag,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import React from "react";
import { ToDo } from "../../interfaces";

import { mockData } from "./static";
const SkillsAndTools = () => {
  const { colorMode } = useColorMode();
  return (
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
      {mockData.map((item: ToDo) => (
        <Card bg={colorMode === "light" ? "bgLigthtMode" : "bgDarkMode"}>
          <CardHeader padding={"10px"}>
            <Heading
              fontSize={"24px"}
              fontFamily={"ChocoBold"}
              textTransform={"capitalize"}
            >
              {item.name}
            </Heading>
          </CardHeader>

          <CardFooter padding={"10px"} justifyContent={"end"}>
            <div style={{ display: "flex", gap: "10px", margin: "10px 0px" }}>
              <Tag>Front end</Tag>
              <Tag>Tech stack</Tag>
            </div>
          </CardFooter>
        </Card>
      ))}
    </SimpleGrid>
  );
};

export default SkillsAndTools;
