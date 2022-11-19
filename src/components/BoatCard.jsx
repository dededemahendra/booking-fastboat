import { Flex, Heading, Text, Box } from "@chakra-ui/layout";
import { Card, CardBody, CardFooter } from "@chakra-ui/card";
import { Button } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import { HiOutlineCurrencyDollar } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const BoatCard = () => {
  const navigate= useNavigate()

  return (
    <Card w="full" bg="#33344D" margin="5" rounded="10" boxShadow="sm" p="6" marginX="auto">
      <CardBody>
        <Flex alignItems="center" direction={["column", "row"]} w="full" >

          <Flex w="full" alignSelf="flex-start" gap="6" direction={["column", "row"]}>
            <Image src="https://i0.wp.com/girleatworld.net/wp-content/uploads/2018/04/nusa-penida-kelingking-1.jpg?resize=840%2C670&ssl=1" alt="Nusa Penida" w={["full","40%"]} h={["auto", "150px"]} objectFit="contain" rounded="5" alignSelf="flex-start" />
            
            <Flex alignItems="center" direction="column" marginTop="4">
              <Heading fontSize="25" alignSelf="center" marginBottom="6">Fast Boat 1</Heading>
              <Text fontSize="lg" textAlign="center">Sanur Harbour - Banjar Nyuh</Text>
              <Text fontSize="lg" textAlign="center">07.00 - 07.45 (Local Time)</Text>
            </Flex>
          </Flex>

          <Flex padding="5" direction="column" gap="4" align="center">
            <Heading fontSize="25">IDR 900.000</Heading>
            <Button onClick={()=> navigate("/order")} size="lg" leftIcon={<HiOutlineCurrencyDollar size="25" />} colorScheme="blue">
              <Text fontSize="20">Choose</Text>
            </Button>

            <Text>Detail</Text>
          </Flex>
        </Flex>

      </CardBody>
      <CardFooter></CardFooter>
    </Card>
  );
};

export default BoatCard;
