import { Box, Stack } from "@chakra-ui/react";
import { LoadingComponent } from "../../components";
import { useEffect, useState } from "react";
import { mockData } from "../../containers/MyProyects/static";
import { ToDo } from "../../interfaces";
import { useParams } from "react-router-dom";
const DetailPage = () => {
  const { id } = useParams<{ id: ToDo }>();
  const [load, setLoad] = useState<boolean>(false);
  const [activeItem, setActiveItem] = useState<ToDo>({});

  const getDetailsFromProyect = (id: number) => {
    setLoad(true);

    setTimeout(() => {
      //esto tiene que pasar a un ep cuando este listo
      const filteredItem = mockData.filter((item: ToDo) => item.id === id);
      setActiveItem(filteredItem[0]);
      setLoad(false);
    }, 2000);
  };

  useEffect(() => {
    getDetailsFromProyect(Number(id));
  }, []);

  console.log(activeItem);
  return (
    <Box
      padding="0px"
      color="black"
      w={"85%"}
      h={"85dvh"}
      bg={"#e5e7eb"}
      border={"1px solid #d8d8d8"}
      borderRadius={"5px"}
    >
      {load ? (
        <LoadingComponent
          loading={load}
          label="Obteniendo detalles del proyecto"
        />
      ) : (
        <Stack>
          <p>{activeItem.name}</p>
        </Stack>
      )}
    </Box>
  );
};

export default DetailPage;
