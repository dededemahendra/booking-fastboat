import { useState } from 'react'
import { createSearchParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import moment from "moment"
import { useEffect } from 'react'
import {Box, Heading, Text, Flex, Grid, Select, Button, useColorMode, Input, Checkbox} from '@chakra-ui/react'

const Banner= ()=> {
  const {colorMode}= useColorMode()
  const navigate= useNavigate()
  const isDark= colorMode=="dark"

  const availableHarbors= ["Lembongan Island", "Nusa Penida", "Sanur"]
  const [availableDestinationHarbors, setAvailableDestinationHarbors]= useState(availableHarbors)

  const [from, setFrom]= useState("")
  const [to, setTo]= useState("")
  const [nationality, setNationality]= useState("") 
  const [departureDate, setDepartureDate]= useState(moment().format("yyyy-M-DD"))
  const [returnDate, setReturnDate]= useState(moment().format("yyyy-MM-DD"))
  const [isReturnChecked, setIsReturnCheked]= useState(false)
  const [passenger, setPassenger]= useState(1) 

  useEffect(() => {
    setAvailableDestinationHarbors(availableHarbors.filter(v=> v!=from))
    // setFrom("")
  }, [from])
  

  function searchBoats() {
    const searchParams= {
      from,
      to,
      nationality,
      departure: departureDate,
      passenger
    }

    if (isReturnChecked) {
      searchParams.returnDate= returnDate
    }

    navigate({
      pathname: "/boats",
      search: `?${createSearchParams(searchParams)}`
    })
  }

  return (
    <Flex height={"65vh"} flexDirection={"column"} bgImage="boats.jpeg" bgSize="cover" bgPosition="center" width={"full"} alignItems={"center"} paddingTop={"20"} textColor="white">
      <Heading size={"lg"}>Fast Boat To Paradise</Heading>
      <Heading size={"md"} textAlign={"center"} mt={"2"}>Providing a collection of Fast Boats With Luxury and Safety Equipment</Heading>

      <Grid width={{base: "90%", lg: "60%"}} bgColor={"#021526"} marginTop={"10"} paddingX={"14"} paddingY={"7"} 
      templateColumns={"repeat(3, 1fr)"} borderRadius={"md"} textColor={"white"}>

        <Box borderRight={"1px solid #fff"} paddingRight={"2"}>
          <Text marginBottom={"2"} fontWeight={"bold"}>From</Text>
          <Select variant={"unstyled"} width={"fit-content"} placeholder="Choose Departure Harbour" color="#fff" onChange={e=> setFrom(e.target.value)}>
            {availableHarbors.map((v, k)=> (
              <option value={v} key={k}>{v}</option>
            ))}
          </Select>
        </Box>

        <Box borderRight={"1px solid #fff"} paddingRight={"2"} paddingLeft={"5"}>
          <Text marginBottom={"2"} fontWeight={"bold"}>To</Text>
          <Select color="#fff" variant={"unstyled"} width={"fit-content"} onChange={e=> setTo(e.target.value)}>
            <option value="">Choose Destination</option>
            {availableDestinationHarbors.map((v, k)=> (
              <option value={v} key={k}>{v}</option>
            ))}
          </Select>
        </Box>

        <Box paddingRight={"2"} paddingLeft={"5"}>
          <Text marginBottom={"2"} fontWeight={"bold"}>Nationality</Text>
          <Select color="#fff" placeholder="Select Nationality" variant={"unstyled"} onChange={e=> setNationality(e.target.value)}>
            <option value="indonesian">Indonesian</option>
            <option value="forigner">Foreigner</option>
          </Select>
        </Box>

        <Box marginTop={"6"} borderRight={"1px solid #fff"} paddingRight={"2"}>
          <Text marginBottom={"2"} fontWeight={"bold"}>Departure</Text>
          <Input type="date" variant="unstyled" value={departureDate} min={departureDate} width="fit-content" onInput={e=> setDepartureDate(e.target.value)} />
        </Box>

        <Box marginTop={"6"} borderRight={"1px solid #fff"} paddingRight={"2"} paddingLeft={"5"}>
          <Text marginBottom={"2"} fontWeight={"bold"}>Return</Text>
          {
            isReturnChecked&&<Input type="date" variant="unstyled" value={returnDate} min={returnDate} width="fit-content" onInput={e=> setReturnDate(e.target.value)} />
          }
          <Checkbox onChange={e=> setIsReturnCheked(e.target.checked)}>Return</Checkbox>
        </Box>

        <Box marginTop={"6"} paddingRight={"2"} paddingLeft={"5"}>
          <Text marginBottom={"2"} fontWeight={"bold"}>Passenger</Text>
          <Select color="#fff" variant={"unstyled"} onChange={e=> setPassenger(e.target.value)}>
            {[...Array(10)].map((_, k)=> (
              <option value={k+1} key={k}>{k+1} Person</option>
            ))}
          </Select>
        </Box>

        <Flex alignItems="center" justifyContent="center" marginTop={"6"} paddingTop={"3"} paddingLeft={"5"} gridColumn={"span 3"}>
          <Button bgColor="#4A60A1" width="32" onClick={()=> searchBoats()}>Search</Button>
        </Flex>
      </Grid>
  </Flex>
  )
}

export default Banner