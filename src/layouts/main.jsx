import { Outlet } from "react-router-dom"
import { Box, Image, Flex } from '@chakra-ui/react'
import { useState, useEffect } from "react"
import Header from "./../components/Header"
import Footer from "./../components/Footer"
import { ScrollRestoration } from "react-router-dom"

const price= 200000

const MainLayout= ()=> {
  const [isLoading, setIsLoading]= useState(true)

  useEffect(() => {
    setIsLoading(false)
    setTimeout(() => {
    }, 500);
  }, [])

  if (isLoading) {
    return <Flex width="full" height="100vh" backgroundColor="white" justifyContent="center" alignItems="center">
      <Image src="loading.gif" alignSelf="center" />
    </Flex>
  } else {
    return (
      <>
        <ScrollRestoration/>
        <Header/>
  
        <Box paddingTop={"80px"} minH={"100vh"} width={"full"}>
          <Outlet context={{price}} />
        </Box>
  
        <Footer/>
      </>
    )
  }

}

export default MainLayout