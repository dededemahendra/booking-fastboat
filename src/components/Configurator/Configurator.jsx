// Chakra Imports
import { Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, Flex, Switch, Text, useColorMode, useColorModeValue } from "@chakra-ui/react";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

export default function Configurator(props) {
  const { secondary, isOpen, onClose, fixed, ...rest } = props;
  const [switched, setSwitched] = useState(props.isChecked);

  const { colorMode, toggleColorMode } = useColorMode();
  // Chakra Color Mode
  let fixedDisplay = "flex";
  if (props.secondary) {
    fixedDisplay = "none";
  }

  const settingsRef = React.useRef();
  return (
    <>
      <Drawer isOpen={props.isOpen} onClose={props.onClose} placement={document.documentElement.dir === "rtl" ? "left" : "right"} finalFocusRef={settingsRef} blockScrollOnMount={false}>
        <DrawerContent>
          <DrawerHeader pt="24px" px="24px">
            <DrawerCloseButton />
            <Text fontSize="xl" fontWeight="bold" mt="16px">
              Settings
            </Text>
          </DrawerHeader>
          <DrawerBody w="340px" ps="24px" pe="40px">
            <Flex flexDirection="column">
              <Box display={fixedDisplay} justifyContent="space-between " mb="16px">
                <Text fontSize="md" fontWeight="600" mb="4px">
                  Navbar Fixed
                </Text>
                <Switch
                  colorScheme="teal"
                  isChecked={switched}
                  onChange={(event) => {
                    if (switched === true) {
                      props.onSwitch(false);
                      setSwitched(false);
                    } else {
                      props.onSwitch(true);
                      setSwitched(true);
                    }
                  }}
                />
              </Box>
              <Flex justifyContent="space-between" alignItems="center" mb="24px">
                <Text fontSize="md" fontWeight="600" mb="4px">
                  Dark/Light
                </Text>
                <Button onClick={toggleColorMode}> {colorMode === "light" ? <MoonIcon /> : <SunIcon />}</Button>
              </Flex>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
Configurator.propTypes = {
  secondary: PropTypes.bool,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  fixed: PropTypes.bool,
};
