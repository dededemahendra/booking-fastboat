import { useState } from 'react'
import queryString from 'query-string'
import { Grid, GridItem, HStack, Box } from "@chakra-ui/layout"
import { Heading, Text } from "@chakra-ui/react"
import BoatCard from "../../components/BoatCard"
import { useEffect } from 'react'
import { useIsDark } from '../../utils/colorMode'

export const LoadingState= ()=> {
  const [dots, setDots]= useState("")
  const [dotsCount, setDotsCount]= useState(0)

  let count= dotsCount

  useEffect(()=> {
    const timeout= setInterval(() => {
      if (count>=5) {
        count= 0
        setDotsCount(count)
        return setDots("")
      }

      setDots(prev=> prev+=".")
      count+= 1
      setDotsCount(count)
    }, 500);

    return ()=> clearInterval(timeout)
  }, [])

  return (
    <Box w="full" align="center" mt="7">
      <Text fontSize="xl">Loading {dots}</Text>
    </Box>
  )
}

export const NoReturnLayout= (props)=> {
  const {boats= [], departureDate, from, to}= props

  return (
    <Grid mx="auto" width={["full", "90%"]} px={["10", "0"]} columnGap="4" rowGap="3" templateColumns={["1fr", "1fr", "repeat(2, 1fr)"]}>
      {boats.map((data, k)=> (
         <BoatCard key={k} id={k} departureDate={departureDate} departureTime={data.jam_keberangkatan} from={from} to={to} onSelectBoat={props.onSelectBoat} />
      ))}
    </Grid>
  )
}

export const ReturnLayout= (props)=> {
  const {from, to, departureDate, returnDate}= queryString.parse(location.search)
  const { onSelectDepartureBoat, onSelectReturnBoat, departureBoatId, departureBoats= [], returnBoats= [] }= props

  const filteredDepartureBoats= departureBoatId!=null?departureBoats.filter((_, k)=> k==departureBoatId):departureBoats

  const isDark= useIsDark()

  const selectReturnBoat= id=> {
    if (departureBoatId==null) {
      return
    }

    onSelectReturnBoat(id)
  }

  function DestinationText({text, type}) {
    return <Text bg={type=="from"?"green":"red"} px="4" py="2" fontWeight="bold" borderRadius="md" fontSize="lg" color="white">{text}</Text>
  }

  return (
    <Grid templateColumns={["1fr", "1fr", "repeat(2, 1fr)"]} paddingX={["8"]} textAlign="center">
      <GridItem borderRight={isDark?["", "", "3px solid #fff"]:["", "" , "3px solid gold"]} px="5">
        <Heading size="lg" mb="5">Departure</Heading>

        <HStack justifyContent="center" alignItems="center" gap="2">
          <DestinationText type="from" text={from} />
          <Text fontSize="2xl">to</Text>
          <DestinationText type="to" text={to} />
        </HStack>

        { filteredDepartureBoats.map((boat, k)=> (
          <BoatCard onSelectBoat={onSelectDepartureBoat} key={k} id={k} canCancel={true} departureTime={boat.jam_keberangkatan} selectedId={departureBoatId} from={from} to={to} departureDate={departureDate} />
        )) }
      </GridItem>

      <GridItem px="5">
        <Heading size="lg" mb="5">Return</Heading>
        <HStack justifyContent="center" alignItems="center" gap="2">
          <DestinationText type="to" text={to} />
          <Text fontSize="2xl">to</Text>
          <DestinationText type="from" text={from} />
        </HStack>

        {returnBoats.map((boat, k)=> (
          <BoatCard onSelectBoat={selectReturnBoat} key={k} id={k} departureTime={boat.jam_keberangkatan} selectedId={departureBoatId} from={to} to={from} departureDate={returnDate} />
        ))}

      </GridItem>
    </Grid>
  )
}