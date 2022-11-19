import { Grid, Flex } from "@chakra-ui/layout";
import { Heading } from "@chakra-ui/react";
import BoatCard from "./BoatCard";

const ListBoatHeader = () => {
  return (
    <>
      <Heading textAlign="center" fontWeight="700" mt="35">
        Hasil Pencarian
      </Heading>
      <Grid mx="auto" width={["full", "80%"]} px={["8", "16"]} py="6" columnGap="8" rowGap="3" templateColumns={["1fr", "repeat(1, 1fr)"]}>
        <BoatCard />
        <BoatCard />
        <BoatCard />
      </Grid>
    </>
  );
};

export default ListBoatHeader;
