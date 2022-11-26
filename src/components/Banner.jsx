import { Heading, Text, Flex, Grid, Select, Button, useColorMode, Input, Checkbox, useToast } from "@chakra-ui/react";
import SearchBar from "./SearchBar";

const Banner = () => {
  const { colorMode } = useColorMode();

  return (
    <Flex minH={"65vh"} flexDirection={"column"} bgImage="boats.jpeg" bgSize="cover" bgPosition="center" width={"full"} alignItems={"center"} paddingTop={"20"} textColor="white">
      <Heading size={"lg"}>Fast Boat To Paradise</Heading>
      <Heading size={"md"} textAlign={"center"} mt={"2"}>
        Providing a collection of Fast Boats With Luxury and Safety Equipment
      </Heading>
      <SearchBar />
    </Flex>
  );
};

export default Banner;
