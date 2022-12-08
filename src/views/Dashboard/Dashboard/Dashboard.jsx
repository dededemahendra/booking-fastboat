// Chakra imports
import { Flex } from "@chakra-ui/react";
import React from "react";
import TablesBoat from "./TablesBoat";
import { DataBoats } from "../../../data/DataBoats";

function Dashboard() {
  return (
    <Flex direction="column" pt={{ base: "130px", md: "75px" }}>
      <TablesBoat title={"Boat Table"} captions={["Picture", "Name", "From", "To", "Time", "Price"]} data={DataBoats} />
    </Flex>
  );
}

export default Dashboard;
