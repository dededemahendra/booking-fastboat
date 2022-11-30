import { Flex, Heading, Text, UnorderedList, ListItem } from "@chakra-ui/layout"
import { Card, CardBody, CardFooter } from "@chakra-ui/card"
import { Button } from "@chakra-ui/button"
import { Image } from "@chakra-ui/image"
import { HiOutlineCurrencyDollar } from "react-icons/hi"
import { AlertDialog, useDisclosure, AlertDialogOverlay, AlertDialogBody, AlertDialogHeader, AlertDialogContent, AlertDialogCloseButton, AlertDialogFooter, Table, Tbody, Tr, Td } from "@chakra-ui/react"
import { useRef } from "react"
import moment from "moment"
import queryString from "query-string"
import { getPrice } from "../utils/outletCtx"
import { formatRupiah } from "../utils/formatRupiah"

const BoatCard = (props) => {
  const {id, canCancel, selectedId, departureTime, departureDate}= props
  const { isOpen, onOpen, onClose }= useDisclosure()
  const cancelRef= useRef()
  const {from, to, passenger}= queryString.parse(location.search)
  const price= getPrice()

  return (
    <Card w="full" bg="#33344D" margin="6" rounded="10" boxShadow="sm" p="6" marginX="auto">
      <CardBody>
        <Flex direction={["column", "row"]} w="full" justify="space-between">

          <Flex  gap={["3", "6"]} direction={["column", "row"]} flexGrow="1">
            <Image src="https://i0.wp.com/girleatworld.net/wp-content/uploads/2018/04/nusa-penida-kelingking-1.jpg?resize=840%2C670&ssl=1" alt="Nusa Penida" w={["full","40%"]} h={["auto", "150px"]} objectFit="contain" rounded="5" alignSelf="flex-start" />
            
            <Flex alignItems="center" direction="column" marginTop="4" w="full" px="3">
              <Heading fontSize="25" alignSelf="center" marginBottom={["2", "6"]}>Fast Boat</Heading>
              <Text fontSize="lg" textAlign="center">{from} - {to}</Text>
              <Text fontSize="lg" textAlign="center">{moment(departureDate).format("ddd, MMMM-D-Y")}, {departureTime || "-"}</Text>
            </Flex>
          </Flex>

          <Flex direction="column" gap="4" align="center" mt={["3", "0"]} justifySelf="flex-end" alignItems="center">
            <Heading fontSize="24">{formatRupiah(price * passenger)}</Heading>
            {canCancel && selectedId!=null?
              <Button size="lg" colorScheme="red" onClick={()=> props.onSelectBoat(null)}>
                <Text fontSize="20">Cancel</Text>
              </Button>
              :
              <Button size="lg" leftIcon={<HiOutlineCurrencyDollar size="25" />} colorScheme="blue" onClick={()=> props.onSelectBoat(id)}>
                <Text fontSize="20">Select</Text>
              </Button>
            }

            <Text cursor="pointer" onClick={()=> onOpen()}>Detail</Text>

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
                        <Td>{formatRupiah(price)} / Pax</Td>
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
  )
}

export default BoatCard
