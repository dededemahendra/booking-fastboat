import { Avatar, Button, Flex, Td, Text, Tr, useColorModeValue } from "@chakra-ui/react";

import React from "react";

const TablesBoatContent = (props) => {
  const { picture, name, from, to, time, price } = props;
  const textColor = useColorModeValue("gray.700", "white");

  return (
    <Tr>
      <Td>
        <Avatar src={picture} borderRadius={"7px"} ml={"-20px"} width={"70px"} minH={"70px"} />
      </Td>
      <Td>
        <Text fontSize="md" color={textColor} fontWeight="bold" minWidth="100%">
          {name}
        </Text>
      </Td>
      <Td>
        <Text>{from}</Text>
      </Td>
      <Td>
        <Text>{to}</Text>
      </Td>
      <Td>
        <Text>{time}</Text>
      </Td>
      <Td>
        <Text>Rp{price}</Text>
      </Td>
      <Td>
        <Flex flexDirection={"column"} gap={"5px"}>
          <Button colorScheme={"orange"} color={"white"} borderRadius={"md"}>
            Edit
          </Button>
          <Button colorScheme={"red"} color={"white"} borderRadius={"md"}>
            Delete
          </Button>
        </Flex>
      </Td>
    </Tr>
  );
};

export default TablesBoatContent;
