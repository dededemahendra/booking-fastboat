import {Box, Heading, Text, Grid, Flex, Image} from '@chakra-ui/react'
import Banner from '../components/Banner'
import ChakraCarousel from '../components/ChakraCarousel'
import { useIsDark } from '../utils/colorMode'

const HomePage= ()=> {
  const isDark= useIsDark()

  return (
    <>
      <Banner />

      <Box textAlign={"center"} marginTop={"10"} paddingX={["10", "32", "40"]} bgImage={isDark?"/BGPulau.png":"/BgPutihBertekstur.jpg"} bgRepeat="no-repeat" backgroundPosition="center" position="relative" pt="8">
        <Text position="absolute" top="0" left="50%" transform="translateX(-50%)" opacity=".5" fontSize="6xl" fontWeight="bold" color="#BFA888" zIndex="base">FastBoat</Text>

        <Box pos="relative" zIndex="dropdown" color={isDark?"#BFA888":"black"}>
          <Text mb="-2">Boat Destination</Text>
          <Heading fontSize="4xl" mb="10">Destination</Heading>
        </Box>

        <Grid templateColumns={{base: "1fr", lg: "repeat(2, 1fr)"}} gap={["10", "14"]}>
          {
            [...Array(4)].map((_, k)=> (
              <Box position="relative" key={k}>
                <Box p="4" border="1px solid #BFA888">
                  <Box p="6" border={`1px solid ${isDark?"#fff":"#000"}`} textAlign="left" pb="10">
                    <Image src="boat_bridge.jpeg" h="56" w="full" objectFit="cover" mx="auto" mb="7" />
                    <Heading marginBottom="4" fontSize="2xl">Lembongan Island</Heading>
                    <Text fontSize="md">Lembongan Island Nusa Lembongan is a small holiday island destination 20 km off the southeast coast of Bali. You can reach it with a 45-minute boat ride from Sanur Beach or Benoa Harbour. It’s a lot quieter than the south of Bali, making it a great place to go for a quiet, relaxing break.</Text>
                  </Box>
                </Box>
              </Box>
            ))
          }
        </Grid>
      </Box>

      <Flex textAlign={"center"} mt="12" py="8" justify="center" alignItems="center" direction="column" id="testimonials"  background={isDark?"":"#F4F2ED"}>
        <Box color={isDark?"#BFA888":"black"}>
          <Text fontSize="lg">Testimonials</Text>
          <Heading fontSize="4xl" marginBottom="12">PEOPLE ABOUT US</Heading>
        </Box>

        <Box w={["80%", "50%"]} border={`1px solid ${isDark?"#fff":"#000"}`} px={["3", "10"]} py="5">
          <ChakraCarousel gap={0} >
            {
              [...Array(4)].map((_, k)=> (
                <Flex key={k} w="full" p="5" alignItems="center" justifyContent="center"  direction="column" gap="5">
                  <Text noOfLines={2} fontSize={["lg"]}>Membeli ticket di website ini sangat memudahkan saya dalam mengatur perjalanan liburan saya</Text>
                  <Text fontSize="md">ANTHONIO BLANCO I / Waitress</Text>
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