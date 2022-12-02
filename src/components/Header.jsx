import { Flex, Stack, Image, useColorMode, Button, IconButton } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { MdOutlineLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import { MenuDivider } from "@chakra-ui/menu";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex justify="space-between" alignItems="center" paddingX={"10"} height="80px" bgColor={"gray"} position="fixed" width={"full"} zIndex="100" backgroundColor={"#021528"} boxShadow={"1px 1px 5px #000"} textColor="white">
      <Link to="/">
        <Image src="logoTulisan.png" w="64" />
      </Link>

      <Stack display={{ base: "none", lg: "flex" }} direction="row" spacing="5" align="center">
        <Link to="/">Home</Link>
        <Link to="#footer">Contact</Link>
        <Link to="/#testimonials">Testimonials</Link>
        <Button onClick={() => toggleColorMode()} variant="outline" colorScheme="#fff">
          {colorMode == "dark" ? <MdOutlineLightMode size={25} /> : <MdDarkMode size={25} />}
        </Button>
      </Stack>

      <Stack display={{ base: "", lg: "none" }}>
        <Menu>
          <MenuButton as={IconButton} size="lg" variant="outline" icon={<HamburgerIcon />} />
          
          <MenuList>
            <MenuItem closeOnSelect={false} onClick={() => toggleColorMode()} textAlign="center" fontSize="3xl" variant="unstyled" icon={colorMode == "dark" ? <MdOutlineLightMode /> : <MdDarkMode />}  />
            <MenuDivider/>
            <MenuItem><Link to="/">Home</Link></MenuItem>
            <MenuItem><Link to="#footer">Contact</Link></MenuItem>
            <MenuItem><Link to="/#testimonials">Testimonials</Link></MenuItem>
          </MenuList>
        </Menu>
      </Stack>

    </Flex>
  )
}

export default Header;
