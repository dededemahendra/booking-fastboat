import { Heading, Flex, useColorMode } from "@chakra-ui/react";
import SearchBar from "./SearchBar";

const Banner = () => {
  const { colorMode } = useColorMode();

  return (
    <Flex h={["auto", "auto", "100vh"]} flexDirection={"column"} bgImage="boats.jpeg" bgSize="cover" bgPosition="center" width={"full"} alignItems={"center"}  justify="center" textColor="white" py={["10", "10", "0"]}>
      <Flex mt={["0", "0", "-60px"]} justify="center" align="center" direction="column">
        <Heading size={"lg"}>Fast Boat To Paradise</Heading>
        <Heading size={"md"} textAlign={"center"} mt={"2"}>Providing a collection of Fast Boats With Luxury and Safety Equipment</Heading>
        <SearchBar />
      </Flex>
    </Flex>
  );
};

export default Banner;
