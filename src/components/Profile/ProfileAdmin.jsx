import { Heading, Avatar, Box, Center, Image, Flex, Text, Stack, Button, useColorModeValue } from "@chakra-ui/react";

export default function ProfileAdmin() {
  return (
    <Center>
      <Box>
        <Flex justify={"center"}>
          <Avatar
            size={"xl"}
            src={"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"}
            alt={"Author"}
            css={{
              border: "2px solid white",
            }}
          />
        </Flex>

        <Box p={6}>
          <Stack spacing={0} align={"center"} mb={5}>
            <Heading fontSize={"2xl"} fontWeight={500} fontFamily={"body"}>
              John Doe
            </Heading>
            <Text color={"gray.500"}>Admin</Text>
          </Stack>
          <Button
            w={"full"}
            mt={8}
            bg={"red.500"}
            color={"white"}
            rounded={"md"}
            _hover={{
              transform: "translateY(-2px)",
              boxShadow: "lg",
            }}
          >
            Log Out
          </Button>
        </Box>
      </Box>
    </Center>
  );
}
