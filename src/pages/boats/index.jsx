import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import queryString from 'query-string'
import {Box, Center, Divider, Flex} from "@chakra-ui/layout"
import { Text } from "@chakra-ui/react"
import axios from "../../utils/axios"
import SearchBar from "../../components/SearchBar"
import { setOrderData } from "../../utils/storage"
import {LoadingState, NoReturnLayout, ReturnLayout} from "./BoatsComponents"
import { useIsDark } from "../../utils/colorMode"

const BoatsPage = () => {
  const {from, to, departure, passenger, returnDate}= queryString.parse(location.search)
  const [search]= useSearchParams()
  const navigate= useNavigate()
  const [isLoading, setIsLoading]= useState(true)
  const [departureBoats, setDepartureBoats]= useState([])
  const [departureBoatId, setDepartureBoatId]= useState(null)
  const [returnBoats, setReturnBoats]= useState([])
  const [returnBoatId, setReturnBoatId]= useState(null)

  const isDark= useIsDark()

  async function getBoats(from, to) {
    try {
      const {data}= await axios(`/api?apicall=jamtrip&keberangkatan=${from}&tujuan=${to}`)

      return data
    } catch (error) {
      return []
    }

  }

  useEffect(()=> {
    const orderData= {
      from: from,
      to: to,
      departureDate: departure,
      departureTime: departureBoats[departureBoatId]?.jam_keberangkatan || "",
      passenger: passenger
    }

    if (returnDate) {      
      if (departureBoatId!=null && returnBoatId!=null) {
        orderData.returnDate= returnDate
        orderData.returnTime= returnBoats[returnBoatId].jam_keberangkatan
        setOrderData(orderData)

        navigate("/order")
      }

      return
    }

    if (departureBoatId!=null) {
      setOrderData(orderData)
      navigate("/order")
    }
  }, [departureBoatId, returnBoatId])

  useEffect(() => {
    if (!from || !to || !departure || !passenger) {
      return navigate("/")
    }

    (async _=> {
      if (returnDate) {
        setReturnBoats(await getBoats(to, from))
      }
      
      setDepartureBoats(await getBoats(from, to))

      setIsLoading(false)
    })()

  }, [search])

  const Body= ()=> {
    if (isLoading) {
      return <LoadingState/>
    }

    if (returnDate) {
      if (!departureBoats || !returnBoats) {
        return <Text textAlign="center">Boat is not available.</Text>
      }

      return <ReturnLayout onSelectDepartureBoat={setDepartureBoatId} departureBoatId={departureBoatId} onSelectReturnBoat={setReturnBoatId} departureBoats={departureBoats} returnBoats={returnBoats}  />
    } 
    
    else {
      if (!departureBoats) {
        return <Text textAlign="center">Boat is not available.</Text>
      }

      return <NoReturnLayout onSelectBoat={setDepartureBoatId}  boats={departureBoats}   />
    }
  }

  return (
    <>
      <Flex alignItems={"center"} justifyContent={"center"} direction="column">
        <SearchBar getSearchParams={true} beforeSearch={()=> setIsLoading(true)} />

        <Text fontSize="4xl" textAlign="center" fontWeight="700" mt="35" mb="3" textTransform="uppercase" fontFamily="cormorant upright">schedule</Text>
        <Divider bg="#BFA888" w="60%" />
      </Flex>

      <Box >
        <Body/>
      </Box>
    </>
  )
}

export default BoatsPage