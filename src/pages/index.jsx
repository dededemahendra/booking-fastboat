import {Box, Heading, Text, Grid, Flex, Image} from '@chakra-ui/react'
import Banner from '../components/Banner'

const HomePage= ()=> {
  return (
    <>
      <Banner />

      <Box textAlign={"center"} marginTop={"10"} paddingX="16">
        <Heading fontSize="3xl">Destination</Heading>
        <Text marginTop="3" marginBottom="6">Boat Destination</Text>

        <Grid templateColumns={{base: "1fr", lg: "repeat(2, 1fr)"}} gap="10">
          {
            [...Array(4)].map((_, k)=> (
              <Box position="relative" key={k}>
                <Image src="boat_bridge.jpeg" />

                <Box marginX="auto" marginTop="-20" width="90%" backgroundColor="gray" borderRadius="md" textAlign="left" padding="8" minH="52" zIndex="2" position="relative">
                  <Heading marginBottom="2" fontSize="xl">Lembongan Island</Heading>
                  <Text fontSize="sm">Lembongan Island Nusa Lembongan is a small holiday island destination 20 km off the southeast coast of Bali. You can reach it with a 45-minute boat ride from Sanur Beach or Benoa Harbour. It’s a lot quieter than the south of Bali, making it a great place to go for a quiet, relaxing break.</Text>
                </Box>
              </Box>
            ))
          }
        </Grid>
      </Box>

      <Box textAlign={"center"} marginTop="16">
        {/* TODO bnerin testimoni */}
        <Heading fontSize="2xl" marginBottom="16">Testimoni</Heading>

        <Grid templateColumns={{base: "repeat(2, 1fr)", lg: "repeat(4, 1fr)"}} paddingX={{base: "10", lg: "28"}} columnGap="5">
          {
            [...Array(4)].map((_, k)=> (
              <Flex key={k} backgroundColor="red" marginBottom={"5"} textAlign="left" >
                <Image src="https://images.unsplash.com/photo-1547256398-b62fc7852828?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE1fHx8ZW58MHx8fHw%3D&w=1000&q=80" width="50%" objectFit="cover" bgPosition="bottom" />

                <Box paddingTop="5" paddingX="4">
                  <Text fontSize="sm">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolore possimus officia tempora facilis omnis, optio rerum ratione voluptatibus perspiciatis adipisci aliquam itaque sint praesentium at libero enim, est modi excepturi?</Text>
                </Box>
              </Flex>
            ))
          }
        </Grid>
      </Box>

    </>
  )
}

export default HomePage