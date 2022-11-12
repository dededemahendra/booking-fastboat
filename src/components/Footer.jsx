import {Grid, Heading, Text, Box, VStack} from '@chakra-ui/react'

const Footer= ()=> {
  return (
    <Grid paddingX={{base: "10", lg: "40"}} paddingTop={"5"} paddingBottom={"8"} templateColumns={"repeat(4, 1fr)"} backgroundColor={"gray"}>
      <Box>
        <Text fontSize={"lg"} fontWeight={"bold"} marginBottom={"2"}>Company</Text>
        <VStack alignItems={"start"}>
          <Text>About us</Text>
          <Text>About us</Text>
          <Text>About us</Text>
        </VStack>
      </Box>
    </Grid>
  )
}

export default Footer