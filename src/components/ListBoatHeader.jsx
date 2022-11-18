import { Heading } from "@chakra-ui/react";
import { Flex } from "@chakra-ui/react";
import BoatCard from "./BoatCard";

const ListBoatHeader = () => {
  return (
    <>
      <Heading textAlign="center" fontWeight="700" mt="35">
        Hasil Pencarian
      </Heading>
      <Flex align="center" width="100%" p="6" mt="10" wrap="wrap" direction="column">
        <BoatCard />
        <BoatCard />
      </Flex>
    </>
  );
};

export default ListBoatHeader;
