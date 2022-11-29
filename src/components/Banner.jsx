import { Box } from "@chakra-ui/layout";
import { Heading, Text, Flex, Grid, Select, Button, useColorMode, Input, Checkbox, useToast } from "@chakra-ui/react";
import SearchBar from "./SearchBar";

const Banner = () => {
  const { colorMode } = useColorMode();

  return (
    <Flex h={["120vh", "100vh"]} flexDirection={"column"} bgImage="boats.jpeg" bgSize="cover" bgPosition="center" width={"full"} alignItems={"center"} pt justify="center" textColor="white">
        <Flex mt="-60px" justify="center" align="center" direction="column">
          <Heading size={"lg"}>Fast Boat To Paradise</Heading>
          <Heading size={"md"} textAlign={"center"} mt={"2"}>Providing a collection of Fast Boats With Luxury and Safety Equipment</Heading>
          <SearchBar />
        </Flex>
    </Flex>
  );
};

export default Banner;
