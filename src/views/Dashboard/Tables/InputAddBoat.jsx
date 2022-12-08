// Chakra imports
import { Flex, Box, FormControl, FormLabel, Input, HStack, Stack, Button, Heading, Text, Textarea, Select } from "@chakra-ui/react";
import Card from "components/Card/Card.js";
import React from "react";

const AddBoat = () => {
  return (
    <Card boxShadow={"md"} padding={"30px"}>
      <Flex direction="column">
        <Box>
          <Stack spacing={5}>
            <FormControl id="name">
              <FormLabel>Name</FormLabel>
              <Input type="text" />
            </FormControl>
            <FormControl id="localPrice">
              <FormLabel>Local Price</FormLabel>
              <Input type="number" />
            </FormControl>
            <FormControl id="regulerPrice">
              <FormLabel>Reguler Price</FormLabel>
              <Input type="number" />
            </FormControl>
            <FormControl id="seat">
              <FormLabel>Seat</FormLabel>
              <Input type="number" />
            </FormControl>
            <HStack>
              <Box>
                <FormControl id="date">
                  <FormLabel>Depature Date</FormLabel>
                  <Input type="date" />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="time">
                  <FormLabel>Depature Time</FormLabel>
                  <Input type="time" />
                </FormControl>
              </Box>
            </HStack>
            <HStack>
              <Box>
                <FormControl id="date">
                  <FormLabel>From</FormLabel>
                  <Select placeholder="Depature From">
                    <option value="sanur">Sanur</option>
                    <option value="nusaPenida">Nusa Penida</option>
                    <option value="lembongan">Lembongan</option>
                  </Select>
                </FormControl>
              </Box>
              <Box>
                <FormControl id="time">
                  <FormLabel>To</FormLabel>
                  <Select placeholder="Depature To">
                    <option value="sanur">Sanur</option>
                    <option value="nusaPenida">Nusa Penida</option>
                    <option value="lembongan">Lembongan</option>
                  </Select>
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="description">
              <FormLabel>Description</FormLabel>
              <Textarea placeholder={"Boat Description"}></Textarea>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Flex justifyContent={"flex-end"} gap={"10px"}>
                <Button
                  loadingText="Submitting"
                  size="lg"
                  bg={"red.400"}
                  width={"120px"}
                  color={"white"}
                  _hover={{
                    bg: "red.500",
                  }}
                >
                  Clear
                </Button>
                <Button
                  loadingText="Submitting"
                  size="lg"
                  bg={"blue.400"}
                  width={"120px"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Submit
                </Button>
              </Flex>
            </Stack>
          </Stack>
        </Box>
      </Flex>
    </Card>
  );
};

export default AddBoat;
