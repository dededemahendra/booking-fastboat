import {Flex, Stack, Heading, useColorMode, Box} from '@chakra-ui/react'
import {HamburgerIcon, SunIcon, MoonIcon} from "@chakra-ui/icons"
import { Link } from 'react-router-dom'

const Header= ()=> {
  const {colorMode, toggleColorMode}= useColorMode()

  return (
    <Flex justify="space-between" alignItems="center" paddingX={"10"} height="65px" bgColor={"gray"} position="fixed" 
    width={"full"} zIndex="100">
      <Link to="/">
        <Heading size={["md", "lg"]}>Title</Heading>
      </Link>

      <Stack display={{base: "none", lg: "flex"}} direction="row">
        <p>Menus</p>
        <p>Menus</p>
        <p>Menus</p>
        <p onClick={()=> toggleColorMode()}>{colorMode=="dark"?<SunIcon/>:<MoonIcon/>}</p>
      </Stack>

      <Stack display={{base: "", lg: "none"}}>
        <HamburgerIcon fontSize={"xl"} cursor={"pointer"} />
      </Stack>
    </Flex>
  )
}

export default Header