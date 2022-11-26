import React from "react";
import { Box, FormControl, FormLabel, Input, Stack, Link, Button } from "@chakra-ui/react";
import { InputGroup, InputRightElement } from "@chakra-ui/react";
import { BiHide, BiShow } from "react-icons/bi";

const InputLoginAdmin = () => {
  // Hide and Show Password
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  return (
    <>
      {/* Card */}
      <Box rounded={"lg"} bg={"gray.100"} boxShadow={"lg"} p={10} maxW={"lg"}>
        <Stack spacing={4}>
          {/* Input Email */}
          <FormControl id="email">
            <FormLabel color={"black"}>Email</FormLabel>
            <Input
              type="email"
              placeholder="Email"
              color={"gray.500"}
              borderColor={"gray.500"}
              _hover={{
                borderColor: "gray.500",
              }}
              _placeholder={{
                color: "gray.400",
              }}
            />
          </FormControl>
          {/* Input Password */}
          <FormControl id="password">
            <FormLabel color={"black"}>Password</FormLabel>
            <InputGroup size="md">
              <Input
                pr="4.5rem"
                type={show ? "text" : "password"}
                placeholder="Enter password"
                color={"gray.500"}
                borderColor={"gray.500"}
                _hover={{
                  borderColor: "gray.500",
                }}
                _placeholder={{ color: "gray.400" }}
              />
              <InputRightElement width="4.5rem">
                <Button size="md" color={"gray.500"} backgroundColor={"transparent"} _hover={{ backgroundColor: "transparent" }} onClick={handleClick}>
                  {show ? <BiHide /> : <BiShow />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Stack spacing={5}>
            <Stack direction={{ base: "column", sm: "row" }} justify={"end"}>
              <Link to="/forgot-password" color={"blue.400"}>
                Forgot password?
              </Link>
            </Stack>
            <Button
              bg={"blue.400"}
              color={"white"}
              _hover={{
                bg: "blue.500",
              }}
            >
              Sign in
            </Button>
          </Stack>
        </Stack>
      </Box>
    </>
  );
};

export default InputLoginAdmin;
