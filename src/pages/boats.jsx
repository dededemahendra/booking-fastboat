import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import queryString from 'query-string'
import { Grid, Flex, GridItem, HStack } from "@chakra-ui/layout"
import { Heading, Text } from "@chakra-ui/react"
import axios from "./../utils/axios"
import BoatCard from "./../components/BoatCard"
import SearchBar from "../components/SearchBar"
import { setOrderData } from "../utils/storage"

const NoReturnLayout= (props)=> {
  const {boats= [], departureDate, from, to}= props

  return (
    <Grid mx="auto" width={["full", "80%"]} px={["8", "16"]} columnGap="8" rowGap="3" templateColumns={["1fr", "repeat(1, 1fr)"]}>
      {boats.map((data, k)=> (
         <BoatCard key={k} id={k} departureDate={departureDate} departureTime={data.jam_keberangkatan} from={from} to={to} onSelectBoat={props.onSelectBoat} />
      ))}
    </Grid>
  )
}

const ReturnLayout= (props)=> {
  const searchParams= queryString.parse(location.search)
  const { onSelectDepartureBoat, onSelectReturnBoat, departureBoatId, departureBoats= [], returnBoats= [], departureDate, from, to }= props

  const filteredDepartureBoats= departureBoatId!=null?departureBoats.filter((_, k)=> k==departureBoatId):departureBoats

  const selectReturnBoat= id=> {
    if (departureBoatId==null) {
      return
    }

    onSelectReturnBoat(id)
  }

  function DestinationText({text, type}) {
    return <Text bg={type=="from"?"green":"red"} px="4" py="2" fontWeight="bold" borderRadius="md" fontSize="lg">{text}</Text>
  }

  return (
    <Grid templateColumns={{base: "1fr", lg: "repeat(2, 1fr)"}} paddingX={["6", "8"]} textAlign="center">
      <GridItem borderRight={["", "3px solid #fff"]} px="5">
        <Heading size="lg" mb="5">Departure</Heading>
        <HStack justifyContent="center" alignItems="center" gap="2">
          <DestinationText type="from" text={searchParams.from} />
          <Text fontSize="2xl">to</Text>
          <DestinationText type="to" text={searchParams.to} />
        </HStack>

        { filteredDepartureBoats.map((boat, k)=> (
          <BoatCard onSelectBoat={onSelectDepartureBoat} key={k} id={k} canCancel={true} departureTime={boat.jam_keberangkatan} selectedId={departureBoatId} from={from} to={to} departureDate={departureDate} />
        )) }
      </GridItem>

      <GridItem px="5">
        <Heading size="lg" mb="5">Return</Heading>
        <HStack justifyContent="center" alignItems="center" gap="2">
          <DestinationText type="to" text={searchParams.to} />
          <Text fontSize="2xl">to</Text>
          <DestinationText type="from" text={searchParams.from} />
        </HStack>

        {returnBoats.map((boat, k)=> (
          <BoatCard onSelectBoat={selectReturnBoat} key={k} id={k} departureTime={boat.jam_keberangkatan} selectedId={departureBoatId} from={to} to={from} departureDate={departureDate} />
        ))}

      </GridItem>
    </Grid>
  )
}

const BoatsPage = () => {
  const searchParams= queryString.parse(location.search)
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
      from: searchParams.from,
      to: searchParams.to,
      departureDate: searchParams.departure,
      passenger: searchParams.passenger
    }

    orderData.departureTime= departureBoats[departureBoatId]?.jam_keberangkatan || ""

    if (searchParams.returnDate) {      
      if (departureBoatId!=null && returnBoatId!=null) {
        orderData.returnDate= searchParams.returnDate
        orderData.returnTime= departureBoats[returnBoatId].jam_keberangkatan
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
    // TODO: search request whenever query string is changed
    const {from, to, departure, passenger, returnDate}= searchParams

    if (!from || !to || !departure || !passenger) {
      return navigate("/")
    }

    (async _=> {
      
      if (returnDate) {
        setReturnBoats(await getBoats(to, from))
        setDepartureBoats(await getBoats(from, to))
      }

      else {
        setDepartureBoats(await getBoats(to, from))
      }

      setIsLoading(false)
    })()

  }, [search])

  const Body= ()=> {
    if (isLoading) {
      return (
        <Text>Loading....</Text>
      )
    }

    if (searchParams.returnDate) {
      if (!departureBoats || !returnBoats) {
        return <Text>Boat is not available.</Text>
      }

      return <ReturnLayout onSelectDepartureBoat={setDepartureBoatId} departureBoatId={departureBoatId} onSelectReturnBoat={setReturnBoatId} departureBoats={departureBoats} returnBoats={returnBoats} departureDate={searchParams.departure} from={searchParams.from} to={searchParams.to} />
    } 
    
    else {
      if (!departureBoats) {
        return <Text>Boat is not available.</Text>
      }

      return <NoReturnLayout onSelectBoat={setDepartureBoatId}  boats={departureBoats} departureDate={searchParams.departure} from={searchParams.from} to={searchParams.to}  />
    }

  }

  return (
    <>
      <Flex alignItems={"center"} justifyContent={"center"}>
        <SearchBar getSearchParams={true} beforeSearch={()=> setIsLoading(true)} />
      </Flex>

      <Heading textAlign="center" fontWeight="700" mt="35" mb="3"> Hasil Pencarian</Heading>

      <Body />
    </>
  )
}

export default BoatsPage