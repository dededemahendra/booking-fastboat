import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import queryString from 'query-string'
import {Flex} from "@chakra-ui/layout"
import { Heading, Text } from "@chakra-ui/react"
import axios from "../../utils/axios"
import SearchBar from "../../components/SearchBar"
import { setOrderData } from "../../utils/storage"
import {LoadingState, NoReturnLayout, ReturnLayout} from "./BoatsComponents"
import { BreadCrumb } from "../../components/BreadCrumb"

const BoatsPage = () => {
  const {from, to, departure, passenger, returnDate}= queryString.parse(location.search)
  const [search]= useSearchParams()
  const navigate= useNavigate()
  const [isLoading, setIsLoading]= useState(true)
  const [departureBoats, setDepartureBoats]= useState([])
  const [departureBoatId, setDepartureBoatId]= useState(null)
  const [returnBoats, setReturnBoats]= useState([])
  const [returnBoatId, setReturnBoatId]= useState(null)

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
        return <Text>Boat is not available.</Text>
      }

      return <ReturnLayout onSelectDepartureBoat={setDepartureBoatId} departureBoatId={departureBoatId} onSelectReturnBoat={setReturnBoatId} departureBoats={departureBoats} returnBoats={returnBoats}  />
    } 
    
    else {
      if (!departureBoats) {
        return <Text>Boat is not available.</Text>
      }

      return <NoReturnLayout onSelectBoat={setDepartureBoatId}  boats={departureBoats}   />
    }

  }

  return (
    <>
      <BreadCrumb/>

      <Flex alignItems={"center"} justifyContent={"center"}>
        <SearchBar getSearchParams={true} beforeSearch={()=> setIsLoading(true)} />
      </Flex>

      <Heading textAlign="center" fontWeight="700" mt="35" mb="6"> Hasil Pencarian</Heading>

      <Body />
    </>
  )
}

export default BoatsPage