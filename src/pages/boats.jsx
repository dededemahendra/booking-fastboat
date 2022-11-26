import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Grid, Flex, GridItem, HStack } from "@chakra-ui/layout";
import { Heading, Text } from "@chakra-ui/react";
import BoatCard from "./../components/BoatCard";
import SearchBar from "../components/SearchBar";
import queryString from 'query-string'
import { useNavigate } from "react-router-dom";

const NoReturnLayout= ()=> {
  return (
    <Grid mx="auto" width={["full", "80%"]} px={["8", "16"]} py="6" columnGap="8" rowGap="3" templateColumns={["1fr", "repeat(1, 1fr)"]}>
      <BoatCard />
      <BoatCard />
      <BoatCard />
    </Grid>
  )
}

const ReturnLayout= ()=> {
  const searchParams= queryString.parse(location.search)

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

        <BoatCard/>
        <BoatCard/>
        <BoatCard/>
      </GridItem>

      <GridItem px="5">
        <Heading size="lg" mb="5">Return</Heading>
        <HStack justifyContent="center" alignItems="center" gap="2">
          <DestinationText type="to" text={searchParams.to} />
          <Text fontSize="2xl">to</Text>
          <DestinationText type="from" text={searchParams.from} />
        </HStack>

        <BoatCard/>
        <BoatCard/>
        <BoatCard/>
      </GridItem>
    </Grid>
  )
}

const BoatsPage = () => {
  const searchParams= queryString.parse(location.search)
  const navigate= useNavigate()

  useEffect(() => {
    // TODO: search request whenever query string is changed
  }, [useLocation()])
  
  useEffect(()=> {
    const {from, to, departure, passenger}= searchParams

    if (!from || !to || !departure || !passenger) {
      // return navigate("/")
      console.log(searchParams);
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
        <ReturnLayout/> :
        <NoReturnLayout/>
      }
    </>
  );
};

export default BoatsPage