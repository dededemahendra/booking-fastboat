// Chakra imports
import { Flex } from "@chakra-ui/react";
// assets
import AddBoat from "./InputAddBoat";
// Custom icons
import React from "react";

export default function Dashboard() {
  return (
    <Flex pt={{ base: "120px", md: "75px" }} justifyContent={"center"}>
      <AddBoat />
    </Flex>
  );
}
