import {Grid, Heading, Text, Box, VStack, Flex} from '@chakra-ui/react'

function DefaultText({children}) {
  return <Text color="gray">{children}</Text>
}

const Footer= ()=> {
  return (
    <Flex paddingX={{base: "10", lg: "36"}} paddingTop={"7"} paddingBottom={"14"}  backgroundColor={"#192A39"} templateColumns={"repeat(4, 1fr)"} justifyContent="space-between" flexDirection={{base: "column", lg: "row"}}>
      <Box>
        <Text fontSize={"lg"} fontWeight={"bold"} marginBottom={"4"}>Company</Text>
        <VStack alignItems={"start"}>
          <DefaultText>About us</DefaultText>
          <DefaultText>Why Book Through us</DefaultText>
          <DefaultText>Testimonial</DefaultText>
        </VStack>
      </Box>

      <Box>
        <Text fontSize={"lg"} fontWeight={"bold"} marginBottom={"4"}>Resources</Text>
        <VStack alignItems={"start"}>
          <DefaultText>Privacy Policy</DefaultText>
          <DefaultText>Terms and Condition</DefaultText>
          <DefaultText>Contact Us</DefaultText>
        </VStack>
      </Box>

      <Box paddingRight="3">
        <Text fontSize={"lg"} fontWeight={"bold"} marginBottom={"4"}>Company</Text>
        <VStack alignItems={"start"}>
          <DefaultText>Jl. Hangtuah no. 22 Sanur - Bali - Indonesia</DefaultText>
          <DefaultText>+62-812-3922-7479/+62-821-1005-9178</DefaultText>
          <DefaultText>info@fastboattoparadise.com</DefaultText>
          <DefaultText>reservation@fastboattoparadise.com</DefaultText>
        </VStack>
      </Box>

      <Flex alignItems="center">
       <Text fontFamily="Sanchez" fontSize="3xl">Fast Boat To Paradise</Text>
      </Flex>

    </Flex>
  )
}

export default Footer