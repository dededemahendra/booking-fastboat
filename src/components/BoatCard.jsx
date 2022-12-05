import { Flex, Heading, Text, UnorderedList, ListItem, VStack, Box } from "@chakra-ui/layout"
import { Card, CardBody, CardFooter } from "@chakra-ui/card"
import { Button } from "@chakra-ui/button"
import { Image } from "@chakra-ui/image"
import { AlertDialog, useDisclosure, AlertDialogOverlay, AlertDialogBody, AlertDialogHeader, AlertDialogContent, AlertDialogCloseButton, AlertDialogFooter, Table, Tbody, Tr, Td } from "@chakra-ui/react"
import { useRef } from "react"
import moment from "moment"
import queryString from "query-string"
import { getPrice } from "../utils/outletCtx"
import { formatRupiah } from "../utils/formatRupiah"
import { useIsDark } from "../utils/colorMode"

const BoatCard = (props) => {
  const {id, canCancel, selectedId, departureTime, departureDate}= props
  const { isOpen, onOpen, onClose }= useDisclosure()
  const cancelRef= useRef()
  const {from, to, passenger}= queryString.parse(location.search)
  const price= getPrice()
  const isDark= useIsDark()

  return (
    <Card w="full" bg={isDark?"#021528":"white"} border={"1px solid #BFA888"} margin="6" rounded="md" boxShadow="sm" p="10" marginX="auto">
      <CardBody>
        <Flex direction={["column", "row"]} w="full" justify="space-between">

          <Flex  gap={["3", "6"]} direction={["column", "row"]} flexGrow="1">
            <Image src="https://i0.wp.com/girleatworld.net/wp-content/uploads/2018/04/nusa-penida-kelingking-1.jpg?resize=840%2C670&ssl=1" alt="Nusa Penida" w={["full","40%"]} h={["150px", ""]} objectFit="cover"  alignSelf="flex-start" />
            
            <Flex alignItems={["flex-start", "center"]} direction="column" marginTop="4" w="full" px="3">
              <Box>
                <Heading fontSize="25" marginBottom={["2", "3"]}>Fast Boat</Heading>
                <Text fontSize="lg">{from} - {to}</Text>
                <Text fontSize="lg">{moment(departureDate).format("ddd, MMMM-D-Y")}</Text>
                <Text fontSize="lg">{departureTime.split(" ").pop() || "-"}</Text>
              </Box>
            </Flex>
          </Flex>

          <Flex direction={["row", "column-reverse"]} gap={["8", "5"]} mt={["3", "0"]} justifySelf={["flex-end"]} alignItems={["center"]}>
              <VStack>
                <Button px={["14", "10"]} variant="outline" borderColor="#BFA888" onClick={()=> canCancel && selectedId!=null?props.onSelectBoat(null):props.onSelectBoat(id)}>
                  <Text fontSize="17">{canCancel && selectedId!=null?"Cancel":"Select"}</Text>
                </Button>

                <Button px={["14", "10"]} variant="outline" borderColor="#BFA888" onClick={()=> onOpen()}>
                  <Text fontSize="17">Detail</Text>
                </Button>
              </VStack>

              <Heading fontSize="24">{formatRupiah(price * passenger)}</Heading>

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
