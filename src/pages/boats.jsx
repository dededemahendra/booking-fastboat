import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Grid, Flex, GridItem, HStack } from "@chakra-ui/layout";
import { Heading, Text } from "@chakra-ui/react";
import BoatCard from "./../components/BoatCard";
import SearchBar from "../components/SearchBar";
import queryString from 'query-string'
import { useNavigate } from "react-router-dom";

const NoReturnLayout= (props)=> {
  return (
    <Grid mx="auto" width={["full", "80%"]} px={["8", "16"]} py="6" columnGap="8" rowGap="3" templateColumns={["1fr", "repeat(1, 1fr)"]}>
      {[...Array(3)].map((_, k)=> (
         <BoatCard key={k} id={k} onSelectBoat={props.onSelectBoat} />
      ))}
    </Grid>
  )
}

const ReturnLayout= (props)=> {
  const searchParams= queryString.parse(location.search)
  const { onSelectDepartureBoat, onSelectReturnBoat, departureBoatId }= props
  const departureBoats= [
    {id: 0},
    {id: 1},
    {id: 2},
    {id: 3},
  ]
  const filteredDepartureBoats= departureBoatId!=null?departureBoats.filter(v=> v.id==departureBoatId):departureBoats

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
          <BoatCard onSelectBoat={onSelectDepartureBoat} key={k} id={boat.id} canCancel={true} selectedId={departureBoatId} />
        )) }
      </GridItem>

      <GridItem px="5">
        <Heading size="lg" mb="5">Return</Heading>
        <HStack justifyContent="center" alignItems="center" gap="2">
          <DestinationText type="to" text={searchParams.to} />
          <Text fontSize="2xl">to</Text>
          <DestinationText type="from" text={searchParams.from} />
        </HStack>

        {[...Array(4)].map((boat, k)=> (
          <BoatCard onSelectBoat={selectReturnBoat} key={k} id={k} />
        ))}

      </GridItem>
    </Grid>
  )
}

const BoatsPage = () => {
  const searchParams= queryString.parse(location.search)
  const navigate= useNavigate()
  const [departureBoatId, setDepartureBoatId]= useState(null)
  const [returnBoatId, setReturnBoatId]= useState(null)

  useEffect(()=> {
    if (searchParams.returnDate) {      
      if (departureBoatId!=null && returnBoatId!=null) {
        navigate("/order")
      }

      return
    }

    if (departureBoatId!=null) {
      navigate("/order")
    }
  }, [departureBoatId, returnBoatId])

  useEffect(() => {
    // TODO: search request whenever query string is changed
  }, [useLocation()])
  
  useEffect(()=> {
    const {from, to, departure, passenger}= searchParams

    if (!from || !to || !departure || !passenger) {
      return navigate("/")
    }
  }, [])

  return (
    <>
      <Flex alignItems={"center"} justifyContent={"center"}>
        <SearchBar getSearchParams={true} />
      </Flex>

      <Heading textAlign="center" fontWeight="700" mt="35" marginBottom="5">
        Hasil Pencarian
      </Heading>

      { searchParams.returnDate?
        <ReturnLayout onSelectDepartureBoat={setDepartureBoatId} departureBoatId={departureBoatId} onSelectReturnBoat={setReturnBoatId} /> :
        <NoReturnLayout onSelectBoat={setDepartureBoatId} />
      }
    </>
  )
}

export default BoatsPage