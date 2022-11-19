import { Flex, Stack, Image, useColorMode, Button, Text } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { MdOutlineLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex justify="space-between" alignItems="center" paddingX={"10"} height="80px" bgColor={"gray"} position="fixed" width={"full"} zIndex="100" backgroundColor={"#021528"} boxShadow={"1px 1px 5px #000"} textColor="white">
      <Link to="/">
        {/* <Image src="logo.png" w="60" /> */}

        <Text fontFamily="roboto">Fast Boat To Paradise</Text>
      </Link>

      <Stack display={{ base: "none", lg: "flex" }} direction="row" spacing="5" align="center">
        <Link to="/">Home</Link>
        <Link to="/">About Us</Link>
        <Link to="/">Testimoni</Link>
        <Button onClick={() => toggleColorMode()} variant="outline" colorScheme="#fff">
          {colorMode == "dark" ? <MdOutlineLightMode size={25} /> : <MdDarkMode size={25} />}
        </Button>
      </Stack>

      <Stack display={{ base: "", lg: "none" }}>
        <HamburgerIcon fontSize={"xl"} cursor={"pointer"} />
      </Stack>
    </Flex>
  );
};

export default Header;
