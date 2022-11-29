import {Box, Heading, Text, Grid, Flex, Image} from '@chakra-ui/react'
import Banner from '../components/Banner'
import ChakraCarousel from '../components/ChakraCarousel'

const HomePage= ()=> {
  return (
    <>
      <Banner />

      <Box textAlign={"center"} marginTop={"10"} paddingX={["10", "32", "40"]}>
        <Heading fontSize="3xl">Destination</Heading>
        <Text marginTop="3" marginBottom="6">Boat Destination</Text>

        <Grid templateColumns={{base: "1fr", lg: "repeat(2, 1fr)"}} gap={["10", "14"]}>
          {
            [...Array(4)].map((_, k)=> (
              <Box position="relative" key={k}>
                <Box p="4" border="1px solid #BFA888">
                  <Box p="6" border="1px solid #fff" textAlign="left" pb="10">
                    <Image src="boat_bridge.jpeg" h="56" w="full" objectFit="cover" mx="auto" mb="8" />
                    <Heading marginBottom="4" fontSize="2xl">Lembongan Island</Heading>
                    <Text fontSize="sm">Lembongan Island Nusa Lembongan is a small holiday island destination 20 km off the southeast coast of Bali. You can reach it with a 45-minute boat ride from Sanur Beach or Benoa Harbour. It’s a lot quieter than the south of Bali, making it a great place to go for a quiet, relaxing break.</Text>
                  </Box>
                </Box>
              </Box>
            ))
          }
        </Grid>
      </Box>

      <Flex textAlign={"center"} marginTop="16" justify="center" alignItems="center" direction="column">
        <Heading fontSize="2xl" marginBottom="16">Testimoni</Heading>

        <Box w={["80%", "50%"]} border="1px solid #fff" px={["3", "10"]} py="5">
          <ChakraCarousel gap={0} >
            {
              [...Array(4)].map((_, k)=> (
                <Flex key={k} w="full" p="5" alignItems="center" justifyContent="center" bg="red">
                  <p>test</p>
                </Flex>
              ))
            }
          </ChakraCarousel>
        </Box>
      </Flex>
      
    </>
  )
}

export default HomePage