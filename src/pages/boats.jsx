import { Flex } from "@chakra-ui/react";
import ListBoatHeader from "../components/ListBoatHeader";
import SearchBar from "../components/SearchBar";

const BoatsPage = () => {
  return (
    <>
      {/* halaman search */}
      <Flex alignItems={"center"} justifyContent={"center"}>
        <SearchBar getSearchParams={true} />
      </Flex>
      <ListBoatHeader />
    </>
  );
};

export default BoatsPage;
