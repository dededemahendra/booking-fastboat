// Chakra Icons
import { SearchIcon, SettingsIcon } from "@chakra-ui/icons";
// Chakra Imports
import { Avatar, Flex, IconButton, Input, InputGroup, InputLeftElement, Menu, MenuButton, MenuList, useColorModeValue } from "@chakra-ui/react";
// Custom Icons
// Custom Components
import PropTypes from "prop-types";
import React from "react";
import ProfileAdmin from "components/Profile/ProfileAdmin";

export default function HeaderLinks(props) {
  const { variant, children, fixed, secondary, onOpen } = props;

  // Chakra Color Mode
  let mainTeal = useColorModeValue("teal.300", "teal.300");
  let inputBg = useColorModeValue("white", "gray.800");
  let mainText = useColorModeValue("gray.700", "gray.200");
  let navbarIcon = useColorModeValue("gray.500", "gray.200");
  let searchIcon = useColorModeValue("gray.700", "gray.200");

  if (secondary) {
    navbarIcon = "white";
    mainText = "white";
  }
  const settingsRef = React.useRef();
  return (
    <Flex pe={{ sm: "0px", md: "16px" }} w={{ sm: "100%", md: "auto" }} alignItems="center" flexDirection="row">
      <InputGroup
        cursor="pointer"
        bg={inputBg}
        borderRadius="15px"
        w={{
          sm: "128px",
          md: "200px",
        }}
        me={{ sm: "auto", md: "20px" }}
        _focus={{
          borderColor: { mainTeal },
        }}
        _active={{
          borderColor: { mainTeal },
        }}
      >
        <InputLeftElement
          children={
            <IconButton
              bg="inherit"
              borderRadius="inherit"
              _hover="none"
              _active={{
                bg: "inherit",
                transform: "none",
                borderColor: "transparent",
              }}
              _focus={{
                boxShadow: "none",
              }}
              icon={<SearchIcon color={searchIcon} w="15px" h="15px" />}
            ></IconButton>
          }
        />
        <Input fontSize="xs" py="11px" color={mainText} placeholder="Type here..." borderRadius="inherit" />
      </InputGroup>
      <SettingsIcon cursor="pointer" ms={{ base: "16px", xl: "0px" }} me="16px" ref={settingsRef} onClick={props.onOpen} color={navbarIcon} w="25px" h="25px" />
      <Menu>
        <MenuButton>
          <Avatar
            size={"sm"}
            src={"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"}
            alt={"Author"}
            css={{
              border: "2px solid white",
            }}
          />
        </MenuButton>
        <MenuList>
          <ProfileAdmin />
        </MenuList>
      </Menu>
    </Flex>
  );
}

HeaderLinks.propTypes = {
  variant: PropTypes.string,
  fixed: PropTypes.bool,
  secondary: PropTypes.bool,
  onOpen: PropTypes.func,
};
