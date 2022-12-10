import { Image, Text, Box, VStack, Flex, Link } from "@chakra-ui/react";
import { useIsDark } from "../utils/colorMode";

function DefaultText({ children }) {
  return <Text color="gray">{children}</Text>;
}

const Footer = () => {
  const isDark= useIsDark()

  return (
    <Flex  pt={"9"} pb={"14"} bg="#192A39" justifyContent="space-around" flexDirection={["column", "column", "row"]} id="footer" rowGap={["8", "8", "0"]} px={["7", "12", "0"]}>

      <Flex alignItems={["flex-start", "center"]} direction={"column"} gap={["2", "5"]}>
        <Text fontFamily="Sanchez" fontSize={["3xl", "3xl", "4xl"]} color="#BFA888">Fast Boat To Paradise</Text>
        <Text color="white">Copright &copy; 2022 C22-033 Company</Text>
      </Flex>

      <Box>
        <Text fontSize={"lg"} fontWeight={"bold"} marginBottom={"4"} color="white">Company</Text>
        <VStack alignItems={"start"}>
          <Link color="#808080" to="/">Home</Link>
          <Link color="#808080" to="/#">Book Online Now</Link>
          <Link color="#808080" to="/#testimonials">Testimonials</Link>
        </VStack>
      </Box>

      <Box w="60">
        <Text fontSize={"lg"} fontWeight={"bold"} color="white" marginBottom={"4"}>Payment</Text>
        <Image src="payments.png" w="full" objectFit="scale-down" m={0} />
      </Box>

      <Box paddingRight="3">
        <Text fontSize={"lg"} fontWeight={"bold"} marginBottom={"4"} color="white">Have a Questions ?</Text>
        <VStack alignItems={"start"}>
          <DefaultText>Jl. Hangtuah no. 22 Sanur - Bali - Indonesia</DefaultText>
          <DefaultText>+62-812-3922-7479/+62-821-1005-9178</DefaultText>
          <DefaultText>info@fastboattoparadise.com</DefaultText>
          <DefaultText>reservation@fastboattoparadise.com</DefaultText>
        </VStack>
      </Box>
    </Flex>
  );
};

export default Footer;
