import { Box, Flex, VStack } from "@chakra-ui/layout"
import { Image, Text } from "@chakra-ui/react"
import { useState, useEffect } from "react"
import { Link, useNavigate, Outlet } from "react-router-dom"
import { useClient } from "react-supabase"
import AdminHeader from "../components/AdminHeader"

const AdminLayout= ()=> {
  const [isLoading, setIsLoading]= useState(true)  
  const [user, setUser]= useState({})
  const client= useClient()
  const navigate= useNavigate()

  useEffect(()=> {
    (async ()=> {
      try {
        const {data}= await client.auth.getSession()
        
        const {data: {user}}= await client.auth.getUser(data?.session?.access_token)

        if (!user) {
          return navigate("/admin_login")
        }

        setUser(user)
        setIsLoading(false)
      } catch (error) {
       setIsLoading(false)
       
       console.log(error)
      }
    })()
  }, [])


  if (isLoading) {
    return <>
      <p>loading...</p>
    </>
  }

  return (
    <>
      <AdminHeader user={user} />

      <Box h="full" position="fixed" display={["none", "block"]} w={["0", "20%", "15%"]} bg="#021528" boxShadow="1px 1px 5px #000" p="5">
        <Link to="/">
          <Image src="/favicon.png" w="24" mx="auto" />
        </Link>

        <VStack mt="10" align="flex-start">
          <Text>Menu</Text>

          <Box>
            <Link to="/admin">
              <Text fontWeight="bold" fontSize="lg">Destinations</Text>
            </Link>
          </Box>

        </VStack>
      </Box>

      <Flex justify="flex-end" w="full">
        <Box p="10" pt="28" w={["full", "80%", "85%"]}>
          <Outlet/>
        </Box>
      </Flex>
    </>
  )
}

export default AdminLayout