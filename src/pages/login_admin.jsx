import InputLoginAdmin from "../components/InputLoginAdmin";
import { Flex, Stack, Heading } from "@chakra-ui/react";

const LoginAdmin = () => {
  return (
    <>
      <Flex align={"center"} justify={"center"}>
        <Stack spacing={8} mx={"auto"} maxW={"xl"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          </Stack>
          <InputLoginAdmin />
        </Stack>
      </Flex>
    </>
  );
};

export default LoginAdmin;
