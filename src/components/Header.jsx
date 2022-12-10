import { Flex, Stack, Image, useColorMode, Button, IconButton } from "@chakra-ui/react"
import { HamburgerIcon } from "@chakra-ui/icons"
import { Link } from "react-router-dom"
import { MdOutlineLightMode } from "react-icons/md"
import { MdDarkMode } from "react-icons/md"
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu"
import { MenuDivider } from "@chakra-ui/menu"
import { useIsDark } from "../utils/colorMode"

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const isDark= useIsDark()

  return (
    <Flex justify="space-between" alignItems="center" paddingX={"10"} height="80px" bgColor={"gray"} position="fixed"  width={"full"} zIndex="overlay" bg={isDark?"#021528":"white"} boxShadow={"1px 1px 5px #000"} color={isDark?"white":"#BFA888"}>
      <Link to="/">
        <Image src={isDark?"logoTulisan.png":"logoTulisanLight.png"} w={["48","64"]} />
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
            <MenuItem as={Link} to="/#" >Home</MenuItem>
            <MenuItem as={Link} to="/#footer" >Contact</MenuItem>
            <MenuItem as={Link} to="/#testimonials" >Testimonials</MenuItem>
          </MenuList>
        </Menu>
      </Stack>

    </Flex>
  )
}

export default Header;
