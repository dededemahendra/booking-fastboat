import { Box, Button, Flex, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import { NavLink, useLocation } from "react-router-dom";

const SidebarContent = ({ logoText, routes }) => {
  let location = useLocation();
  const [state, setState] = React.useState({});
  const activeRoute = (routeName) => {
    return location.pathname === routeName ? "active" : "";
  };

  const createLinks = (routes) => {
    const activeBg = useColorModeValue("white", "gray.700");
    const activeColor = useColorModeValue("gray.700", "white");
    const inactiveColor = useColorModeValue("gray.400", "gray.400");

    return routes.map((prop) => {
      if (prop.redirect) {
        return null;
      }
      if (prop.category) {
        var st = {};
        st[prop["state"]] = !state[prop.state];
        return (
          <div key={prop.name}>
            <Text
              color={activeColor}
              fontWeight="bold"
              mb={{
                xl: "12px",
              }}
              mx="auto"
              ps={{
                sm: "10px",
                xl: "16px",
              }}
              py="12px"
            >
              {prop.name}
            </Text>
            {createLinks(prop.views)}
          </div>
        );
      }
      return (
        <NavLink to={prop.layout + prop.path} key={prop.name}>
          {activeRoute(prop.layout + prop.path) === "active" ? (
            <Button
              boxSize="initial"
              justifyContent="flex-start"
              alignItems="center"
              bg={activeBg}
              mb={{
                xl: "12px",
              }}
              mx={{
                xl: "auto",
              }}
              ps={{
                sm: "10px",
                xl: "16px",
              }}
              py="12px"
              borderRadius="15px"
              _hover="none"
              w="100%"
              _active={{
                bg: "inherit",
                transform: "none",
                borderColor: "transparent",
              }}
              _focus={{
                boxShadow: "none",
              }}
            >
              <Flex gap={"5px"}>
                <Text color={activeColor} my="auto" fontSize="md">
                  {prop.icon}
                </Text>
                <Text color={activeColor} my="auto" fontSize="md">
                  {prop.name}
                </Text>
              </Flex>
            </Button>
          ) : (
            <Button
              boxSize="initial"
              justifyContent="flex-start"
              alignItems="center"
              bg="transparent"
              mb={{
                xl: "12px",
              }}
              mx={{
                xl: "auto",
              }}
              py="12px"
              ps={{
                sm: "10px",
                xl: "16px",
              }}
              borderRadius="15px"
              _hover="none"
              w="100%"
              _active={{
                bg: "inherit",
                transform: "none",
                borderColor: "transparent",
              }}
              _focus={{
                boxShadow: "none",
              }}
            >
              <Flex gap={"5px"}>
                <Text color={inactiveColor} my="auto" fontSize="md">
                  {prop.icon}
                </Text>
                <Text color={inactiveColor} my="auto" fontSize="md">
                  {prop.name}
                </Text>
              </Flex>
            </Button>
          )}
        </NavLink>
      );
    });
  };

  const links = <>{createLinks(routes)}</>;

  return (
    <>
      <Box pt={"25px"} mb="40px">
        <Text fontSize="lg" mt="3px">
          {logoText}
        </Text>
      </Box>
      <Stack direction="column" mb="40px">
        <Box>{links}</Box>
      </Stack>
    </>
  );
};

export default SidebarContent;
