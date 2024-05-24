import React from "react";
import { Spinner, Stack, Text } from "@chakra-ui/react";
interface IPropsLoad {
  loading: boolean;
  label: string;
}
const LoadingComponent: React.FC<IPropsLoad> = ({ loading, label }) => {
  return (
    <>
      {loading ? (
        <Stack
          direction="column"
          spacing={4}
          justify={"center"}
          align={"center"}
          h={"50%"}
        >
          <Spinner size="xl" />
          <Text>{label}</Text>
        </Stack>
      ) : null}
    </>
  );
};

export default LoadingComponent;
