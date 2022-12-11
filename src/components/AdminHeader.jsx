import { Box, Flex, HStack } from "@chakra-ui/layout"
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu"
import { Text, Avatar } from "@chakra-ui/react"
import { FaChevronDown, FaBars, FaSignOutAlt } from "react-icons/fa"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { useClient } from "react-supabase"

const AdminHeader= (props)=> {
  const { user }= props

  const client= useClient()
  const navigate= useNavigate()

  async function logout() {
    try {
      const data= await client.auth.signOut()

      console.log(data);

      navigate("/admin_login")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Flex pos="fixed" h="20" bg="#021528" boxShadow="1px 1px 5px #000" zIndex="modal" right="0" w={["full", "80%", "85%"]} alignItems="center" justifyContent="space-between" px="10">
      <Box>
        <Link to="/admin">
          <Text fontWeight="bold" fontSize="lg">Fast Boat to Paradise</Text>
        </Link>
      </Box>

      <HStack gap="3">
        <Text>{user?.email || ""}</Text>
        <Menu>
          <MenuButton>
            <HStack>
              <Avatar size="sm" />
              <FaChevronDown size="10" />
            </HStack>
          </MenuButton>

          <MenuList>
            <MenuItem icon={<FaSignOutAlt/>} onClick={()=> logout()}>Logout</MenuItem>
          </MenuList>

        </Menu>
      </HStack>
    </Flex>
  )
}

export default AdminHeader