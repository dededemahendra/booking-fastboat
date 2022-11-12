import {Box, Heading, Text, Grid, Flex, Image} from '@chakra-ui/react'
import Banner from '../components/Banner'

const HomePage= ()=> {
  return (
    <>
      <Banner />

      <Box textAlign={"center"} marginTop={"10"}>
        <Heading>Destination</Heading>
        <Text marginTop="4">Boat Destination</Text>
      </Box>

      <Box textAlign={"center"} marginTop="8" paddingBottom="20">
        <Heading fontSize="xl" marginBottom="16">Testimoni</Heading>

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