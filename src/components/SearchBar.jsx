import React from "react";
import { useState } from "react";
import { useNavigate, createSearchParams } from "react-router-dom";
import moment from "moment";
import { useEffect } from "react";
import { Box, Flex, Button, useColorMode, Input, Checkbox, useToast, Select, Text } from "@chakra-ui/react";
import axios from "./../utils/axios";

const SearchBar = () => {
  const { colorMode } = useColorMode();
  const navigate = useNavigate();
  const isDark = colorMode == "dark";
  const toast = useToast();

  const [availableHarbours, setAvailableHarbours] = useState([])
  const [availableDestinationHarbors, setAvailableDestinationHarbors] = useState([]);

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [nationality, setNationality] = useState("");
  const [departureDate, setDepartureDate] = useState(moment().format("yyyy-M-DD"));
  const [returnDate, setReturnDate] = useState(departureDate);
  const [isReturnChecked, setIsReturnCheked] = useState(false);
  const [passenger, setPassenger] = useState(1);

  async function getAvailableBoats() {
    try {
      const {data}= await axios.get("/api?apicall=loadtrip")

      const harbour= data.map(v=> v.rute)

      setAvailableHarbours(harbour)
    } catch (error) {
      console.log(error)
    }
  }

  function searchBoats() {
    if (!from || !to || !nationality) {
      return toast({
        title: "Warning",
        description: `Please select ${!from || !to ? "boat" : "nationality"}.`,
        status: "warning",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
    }

    const searchParams = {
      from,
      to,
      nationality,
      departure: departureDate,
      passenger,
    };

    if (isReturnChecked) {
      searchParams.returnDate = returnDate;
    }

    navigate({
      pathname: "/boats",
      search: `?${createSearchParams(searchParams)}`,
    });
  }

  useEffect(()=> {
    getAvailableBoats()
  }, [])

  useEffect(() => {
    setAvailableDestinationHarbors(availableHarbours.filter((v) => v != from));
    // setFrom("")
  }, [from]);

  return (
    <Flex width={{ base: "90%", lg: "60%" }} bgColor={"#021526"} marginTop={"10"} paddingX={"14"} paddingY={"7"} borderRadius={"md"} textColor={"white"} flexWrap="wrap" border="1px">
      <Box width="33.33%" borderRight={"1px solid #fff"} paddingRight={"2"}>
        <Text marginBottom={"2"} fontWeight={"bold"}>
          From
        </Text>
        <Select variant={"unstyled"} width={"fit-content"} placeholder="Choose Departure Harbour" color="#fff" onChange={(e) => setFrom(e.target.value)}>
          {availableHarbours.map((v, k) => (
            <option value={v} key={k}>
              {v}
            </option>
          ))}
        </Select>
      </Box>

      <Box width="33.33%" borderRight={"1px solid #fff"} paddingRight={"2"} paddingLeft={"5"}>
        <Text marginBottom={"2"} fontWeight={"bold"}>
          To
        </Text>
        <Select color="#fff" variant={"unstyled"} width={"fit-content"} onChange={(e) => setTo(e.target.value)}>
          <option value="">Choose Destination</option>
          {availableDestinationHarbors.map((v, k) => (
            <option value={v} key={k}>
              {v}
            </option>
          ))}
        </Select>
      </Box>

      <Box width="33.33%" paddingRight={"2"} paddingLeft={"5"}>
        <Text marginBottom={"2"} fontWeight={"bold"}>
          Nationality
        </Text>
        <Select color="#fff" placeholder="Select Nationality" variant={"unstyled"} onChange={(e) => setNationality(e.target.value)}>
          <option value="indonesian">Indonesian</option>
          <option value="forigner">Foreigner</option>
        </Select>
      </Box>

      <Box width="33.33%" marginTop={"6"} borderRight={"1px solid #fff"} paddingRight={"2"}>
        <Text marginBottom={"2"} fontWeight={"bold"}>
          Departure
        </Text>
        <Input type="date" variant="unstyled" value={departureDate} min={departureDate} width="fit-content" onInput={(e) => setDepartureDate(e.target.value)} />
      </Box>

      <Box width="33.33%" marginTop={"6"} borderRight={"1px solid #fff"} paddingRight={"2"} paddingLeft={"5"}>
        <Text marginBottom={"2"} fontWeight={"bold"}>
          Return
        </Text>
        {isReturnChecked && <Input marginRight="3" type="date" variant="unstyled" value={returnDate} min={returnDate} width="fit-content" onInput={(e) => setReturnDate(e.target.value)} />}
        <Checkbox onChange={(e) => setIsReturnCheked(e.target.checked)}>Return</Checkbox>
      </Box>

      <Box width="33.33%" marginTop={"6"} paddingRight={"2"} paddingLeft={"5"}>
        <Text marginBottom={"2"} fontWeight={"bold"}>
          Passenger
        </Text>
        <Select color="#fff" variant={"unstyled"} onChange={(e) => setPassenger(e.target.value)}>
          {[...Array(10)].map((_, k) => (
            <option value={k + 1} key={k}>
              {k + 1} Person
            </option>
          ))}
        </Select>
      </Box>

      <Flex width="100%" alignItems="center" justifyContent="center" marginTop={"6"} paddingTop={"3"} paddingLeft={"5"} gridColumn={"span 3"}>
        <Button bgColor="#4A60A1" width="32" onClick={() => searchBoats()}>
          Search
        </Button>
      </Flex>
    </Flex>
  );
};

export default SearchBar;
