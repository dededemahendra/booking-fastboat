import { Flex, Heading, Text, UnorderedList, ListItem } from "@chakra-ui/layout";
import { Card, CardBody, CardFooter } from "@chakra-ui/card";
import { Button } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import { HiOutlineCurrencyDollar } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { AlertDialog, useDisclosure, AlertDialogOverlay, AlertDialogBody, AlertDialogHeader, AlertDialogContent, AlertDialogCloseButton, AlertDialogFooter, Table, Tbody, Tr, Td } from "@chakra-ui/react";
import { useRef } from "react";

const BoatCard = () => {
  const { isOpen, onOpen, onClose }= useDisclosure()
  const navigate= useNavigate()
  const cancelRef= useRef()

  return (
    <Card w="full" bg="#33344D" margin="7" rounded="10" boxShadow="sm" p="6" marginX="auto">
      <CardBody>
        <Flex alignItems="center" direction={["column", "row"]} w="full" >

          <Flex w="full" alignSelf="flex-start" gap={["2", "6"]} direction={["column", "row"]}>
            <Image src="https://i0.wp.com/girleatworld.net/wp-content/uploads/2018/04/nusa-penida-kelingking-1.jpg?resize=840%2C670&ssl=1" alt="Nusa Penida" w={["full","40%"]} h={["auto", "150px"]} objectFit="contain" rounded="5" alignSelf="flex-start" />
            
            <Flex alignItems="center" direction="column" marginTop="4">
              <Heading fontSize="25" alignSelf="center" marginBottom={["2", "6"]}>Fast Boat 1</Heading>
              <Text fontSize="lg" textAlign="center">Sanur Harbour - Banjar Nyuh</Text>
              <Text fontSize="lg" textAlign="center">07.00 - 07.45 (Local Time)</Text>
            </Flex>
          </Flex>

          <Flex padding="5" direction="column" gap="4" align="center">
            <Heading fontSize="25">IDR 900.000</Heading>
            <Button onClick={()=> navigate("/order")} size="lg" leftIcon={<HiOutlineCurrencyDollar size="25" />} colorScheme="blue">
              <Text fontSize="20">Choose</Text>
            </Button>

            <Text onClick={()=> onOpen()}>Detail</Text>

            <AlertDialog isOpen={isOpen} onClose={onClose} isCentered motionPreset="slideInBottom" leastDestructiveRef={cancelRef}>
              <AlertDialogOverlay/>
              <AlertDialogContent>
                <AlertDialogHeader>Detail</AlertDialogHeader>

                <AlertDialogCloseButton/>

                <AlertDialogBody borderY="1px solid #fff" px="6">
                  <UnorderedList spacing="2" mb="4">
                    <ListItem>Accredited crews and captain</ListItem>
                    <ListItem>Motorized by Suzuki Marine 250 HP and 300 HP</ListItem>
                    <ListItem>Large boat capacity with modern reclining seats</ListItem>
                    <ListItem>VIP area Only for request</ListItem>
                    <ListItem>Full Music on board</ListItem>
                    <ListItem>Free Mineral water on board</ListItem>
                    <ListItem>Safety ; Life jackets adult and child, Life rings, Life rafts, Life buoys,Fire extinguisher</ListItem>
                  </UnorderedList>

                  <Table borderTop="1px solid #fff">
                    <Tbody >
                      <Tr>
                        <Td>1 Ticket</Td>
                        <Td w="fit-content">:</Td>
                        <Td>IDR 350.000 / Pax</Td>
                      </Tr>
                      <Tr>
                        <Td>1 Ticket</Td>
                        <Td w="fit-content">:</Td>
                        <Td>IDR 350.000 / Pax</Td>
                      </Tr>
                    </Tbody>
                  </Table>
                </AlertDialogBody>

                <AlertDialogFooter>
                  <Button ref={cancelRef} onClick={()=> onClose()}>Close</Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </Flex>
        </Flex>

      </CardBody>
      <CardFooter></CardFooter>
    </Card>
  );
};

export default BoatCard;
