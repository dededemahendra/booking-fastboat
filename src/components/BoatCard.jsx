import { Flex, Heading, Text, Box } from "@chakra-ui/layout";
import { Card, CardBody, CardFooter } from "@chakra-ui/card";
import { Button } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import { HiOutlineCurrencyDollar } from "react-icons/hi";

const BoatCard = () => {
  return (
    <>
      <Card maxW="900.card" bg="#33344D" margin="5" rounded="10" boxShadow="sm">
        <CardBody>
          <Flex gap="10" justifyContent="space-between" alignItems="center">
            <Image src="https://i0.wp.com/girleatworld.net/wp-content/uploads/2018/04/nusa-penida-kelingking-1.jpg?resize=840%2C670&ssl=1" alt="Nusa Penida" maxW="300" rounded="5" />
            <Box>
              <Flex direction="column" height="200" justifyContent="space-around" alignItems="center">
                <Heading>KMP Sambo X</Heading>
                <Box>
                  <Text fontSize="xl">Sanur Harbour - Banjar Nyuh</Text>
                  <Text fontSize="xl">07.00 - 07.45 (Local Time)</Text>
                </Box>
              </Flex>
            </Box>
            <Box padding="5">
              <Flex direction="column" gap="5" justifyContent="space-around" height="200">
                <Heading>Rp900.000</Heading>
                <Button size="md" leftIcon={<HiOutlineCurrencyDollar />} colorScheme="blue">
                  Choose
                </Button>
              </Flex>
            </Box>
          </Flex>
        </CardBody>
        <CardFooter></CardFooter>
      </Card>
    </>
  );
};

export default BoatCard;
