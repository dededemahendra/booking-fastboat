import React from "react";
import { useState } from "react";
import { useNavigate, createSearchParams } from "react-router-dom";
import moment from "moment";
import { useEffect } from "react";
import { Box, Flex, Button, Input, Checkbox, useToast, Select, Text } from "@chakra-ui/react";
import axios from "./../utils/axios";
import querystring from 'query-string'
import { useIsDark } from "../utils/colorMode";
import { getDestinations } from "../utils/globalData";

function FormControl(props) {
  const {title, children, showBorder= false}= props
  const isDark= useIsDark()
  
  const rightBorder= isDark?["", "1px solid #fff"]:["", "1px solid #404040"]

  return (
    <Flex w={["full", "33.33%"]} borderRight={showBorder?rightBorder:""} px="4" mb={["6", "4"]} align="center">
      <Box w="full">
        <Text marginBottom={"2"} fontWeight={"bold"}>{title}</Text>
        {children}
      </Box>
    </Flex>
  )
}

const SearchBar = (props) => {
  const {getSearchParams= false, beforeSearch}= props
  const navigate = useNavigate()
  const toast = useToast()
  const searchParams= querystring.parse(location.search)
  const isDark= useIsDark()

  const [availableHarbours, setAvailableHarbours] = useState([]);
  const [availableDestinationHarbors, setAvailableDestinationHarbors] = useState([]);

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departureDate, setDepartureDate] = useState(moment().format("yyyy-M-DD"));
  const [returnDate, setReturnDate] = useState(departureDate);
  const [isReturnChecked, setIsReturnCheked] = useState(false);
  const [passenger, setPassenger] = useState(1);

  async function getAvailableBoats() {
    try {
      const harbour = getDestinations();

      setAvailableHarbours(harbour);
      setAvailableDestinationHarbors(harbour)
    } catch (error) {
      console.log(error);
    }
  }

  function searchBoats() {
    if (!from || !to) {
      return toast({
        title: "Warning",
        description: `Please select boat.`,
        status: "warning",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      })
    }

    const searchParams = {
      from,
      to,
      departure: departureDate,
      passenger,
    };

    if (isReturnChecked) {
      searchParams.returnDate = returnDate;
    }

    if (beforeSearch) {
      beforeSearch()
    }

    navigate({
      pathname: "/boats",
      search: `?${createSearchParams(searchParams)}`,
    });
  }

  useEffect(()=> {
    
    getAvailableBoats()

    if (getSearchParams) {
      const { from, to, departure, returnDate, passenger }= searchParams

      if (returnDate) {
        setReturnDate(returnDate)
        setIsReturnCheked(true)
      }

      setFrom(from)
      setTo(to)
      setDepartureDate(departure)
      setPassenger(passenger)
    }
  }, [])

  useEffect(() => {
    setAvailableDestinationHarbors(availableHarbours.filter((v) => v != from));
  }, [from]);

  return (
    <Flex w={["85%", "80%" ]} bgColor={isDark?"#021526":"#F4F2ED"} mt={"10"} px={["6", "14"]} paddingY={"7"} borderRadius={"md"} color={isDark?"white":"black"} flexWrap="wrap" border="1px" direction={["column", "row"]}>

      <FormControl title="from" showBorder={true}>
        <Select variant={"unstyled"} w={["full", "fit-content"]} placeholder="Choose Departure Harbour" color={isDark?"white":"black"} value={from} onChange={(e) => setFrom(e.target.value)}>
          {availableHarbours.map((v, k) => (
            <option value={v} key={k}>
              {v}
            </option>
          ))}
        </Select>
      </FormControl>

      <FormControl title="To" showBorder={true} >
        <Select color={isDark?"white":"black"} variant={"unstyled"} w={["full", "fit-content"]} value={to} onChange={(e) => setTo(e.target.value)}>
          <option value="">Choose Destination</option>
          {availableDestinationHarbors.map((v, k) => (
            <option value={v} key={k}>
              {v}
            </option>
          ))}
        </Select>
      </FormControl>

      <FormControl title="Passenger">
          <Select w={["full", "fit-content"]} color={isDark?"white":"black"} variant={"unstyled"} value={passenger} onChange={(e) => setPassenger(e.target.value)}>
            {[...Array(10)].map((_, k) => (
              <option value={k + 1} key={k}>
                {k + 1} Person
              </option>
            ))}
          </Select> 
      </FormControl>

      <FormControl showBorder={true} title="Departure">
        <Input type="date"  variant="unstyled" value={departureDate} min={departureDate} w={["full", "fit-content"]} onInput={(e) => setDepartureDate(e.target.value)} />
      </FormControl>

      <FormControl showBorder={true}>
        <Text marginBottom={"2"} fontWeight={"bold"}> Return </Text>
        {isReturnChecked && <Input marginRight="3" type="date" variant="unstyled" value={returnDate} min={returnDate} w={["full", "fit-content"]} onInput={(e) => setReturnDate(e.target.value)} />}
        <Checkbox isChecked={isReturnChecked} onChange={(e) => setIsReturnCheked(e.target.checked)}>Return</Checkbox>
      </FormControl>

      <FormControl>
       <Flex align="center" justify="center" h="full">
        <Button bgColor="transparent" border={`1px solid ${isDark?"#BFA888":""}`} w="36" onClick={() => searchBoats()}> Search </Button>
       </Flex>
      </FormControl>

    </Flex>
  );
};

export default SearchBar;
