import { Box, Flex } from "@chakra-ui/layout"
import { Image } from "@chakra-ui/react"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { Outlet } from "react-router-dom"
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

      <Box h="full" position="fixed" display={["none", "block"]} w={["0", "20%", "15%"]} bg="gray" p="5">
        <Image src="/favicon.png" />
        <Link to="/admin">Destinations</Link>
      </Box>

      <Flex justify="flex-end" w="full">
        <Box p="8" pt="24" w={["full", "80%", "85%"]}>
          <Outlet/>
        </Box>
      </Flex>
    </>
  )
}

export default AdminLayout