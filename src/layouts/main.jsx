import { Outlet } from "react-router-dom"
import Header from "./../components/Header"
import Footer from "./../components/Footer"
import {Box} from '@chakra-ui/react'
import { useState } from "react"
import { useEffect } from "react"

const MainLayout= ()=> {
  const [isLoading, setIsLoading]= useState(true)

  useEffect(() => {
    setIsLoading(false)
    setTimeout(() => {
    }, 500);
  }, [])

  if (isLoading) {
    return <>
      <p>Loading</p>
    </>
  } else {
    return (
      <>
        <Header/>
  
        <Box paddingTop={"65px"} minH={"100vh"} width={"full"}>
          <Outlet/>
        </Box>
  
        <Footer/>
      </>
    )
  }

}

export default MainLayout