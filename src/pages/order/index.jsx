import { useRef, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { HStack, Grid, GridItem } from "@chakra-ui/layout"
import { Flex, Box, Heading, Text, VStack, Image, Select as Sel  } from "@chakra-ui/react"
import { Form, Formik } from "formik"
import FormikErrorFocus from "formik-error-focus"
import moment from "moment"
import axios from "../../utils/axios"
import {initialValues, validationSchema, FormSection, CheckoutButton} from "./OrderPage"
import { getOrderData, setOrderData } from "../../utils/storage"
import { getPrice } from "../../utils/outletCtx"
import { formatRupiah } from "../../utils/formatRupiah"
import { useIsDark } from "../../utils/colorMode"

const BoatDetail= (props)=> {
  const {setPassenger, passenger, from, to, date, time, price, type= "Departure"}= props
  const isDark= useIsDark()

  return (
    <Box p="7" border="1px solid #BFA888" mb="7">
      <Flex flexDirection="column" bg={isDark?"":"white"} py="12" px="10" radius="md">
        <Flex flexDirection={["column", "row"]} w="full" spacing="10" alignItems="center">
          <Image src="boats.jpeg" width={["full", "50%"]} mr={["0", "10"]} />
          
          <VStack color={isDark?"white":"black"} spacing="6" mt={["4", "0"]}>
            <Heading size={["lg"]}>{type} Fast Boat</Heading>
            <HStack>
              <Text>Passenger</Text>
              <Sel disabled={!setPassenger} width="24" onChange={e=> setPassenger(e.target.value)} value={passenger}>
                {
                  [...Array(10)].map((_, k)=> (
                    <option value={k+1} key={k}>{k+1}</option>
                  ))
                }
              </Sel>
            </HStack>
          </VStack>
        </Flex>

        <Flex marginTop="10" justifyContent="space-around" alignItems="center" textAlign="center" color={isDark?"white":"black"}>
          <Box>
            <Text fontSize="18">{from}</Text>
            <Text fontWeight="bold">{moment(date).format("ddd, MMMM-D-Y")}</Text>
          </Box>

          <Flex align="center" direction="column">
            <Image src="https://booking.dcamelfastferry.com/images/arrow.png" w="20" />
            <Text mt="2" fontSize="xl"fontWeight="bold">{time.split(" ").pop()}</Text>
          </Flex>

          <Box>
            <Text fontSize="18">{to}</Text>
            <Text fontWeight="bold">{moment(date).format("ddd, MMMM-D-Y")}</Text>
          </Box>
        </Flex>

        <Grid  textColor={isDark?"#979EA6":"black"} marginTop="8" marginX="auto" templateColumns="repeat(2, 1fr)" columnGap="16" rowGap="3">
          <GridItem fontSize="17">Ticket Fee</GridItem>
          <GridItem fontSize="17">{formatRupiah(price)}</GridItem>
          <GridItem fontSize="17">Total</GridItem>
          <GridItem fontSize="17" fontWeight="bold" color={isDark?"white":"black"}>{formatRupiah(price * passenger)}</GridItem>
        </Grid>

      </Flex>
    </Box>
  )
}

const OrderPage= ()=> {
  const [passenger, setPassenger]= useState(1)
  const [from, setFrom]= useState("") 
  const [to, setTo]= useState("") 
  const [departureDate, setDepartureDate]= useState("") 
  const [departureTime, setDepartureTime]= useState("")
  const [nationality, setNationality]= useState([])
  const [returnDate, setReturnDate]= useState(null) 
  const [returnTime, setReturnTime]= useState(null)
  const btnSubmit= useRef(null)

  const navigate= useNavigate()
  const price= getPrice()
  const isDark= useIsDark()

  async function getNationality() {
    try {
      const {data}= await axios("/api?apicall=nationality")

      setNationality(data)
    } catch (error) {
      console.log(error)
    }
  }

  function formSubmit(values) {
    setOrderData({
      ...getOrderData(),
      clientData: values,
      passenger,
    })

    navigate("/order_detail")
  }

  useEffect(()=> {
    const orderData= getOrderData()

    if (!orderData) {
      navigate("/")
    }
    
    setFrom(orderData.from)
    setTo(orderData.to)
    setPassenger(orderData.passenger)
    setDepartureDate(orderData.departureDate)
    setDepartureTime(orderData.departureTime)
    
    if (orderData.returnDate) {
      setReturnDate(orderData.returnDate)
      setReturnTime(orderData.returnTime)   
    }

    getNationality()
  }, [])

  return (
    <>
      <Flex px={["8", "20", "24"]} pt="10" flexDirection={["column", "row"]} color="black">

        <Box width={["full", "35%"]} mr="16" mb={["5", "0"]} position="sticky" height="full">
          <Heading size={"lg"} color={isDark?"white":""} marginBottom="5">Booked By</Heading>
          <Box borderRadius="md" bgColor={isDark?"":"white"} border="1px solid #BFA888" padding="7">
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={e=> formSubmit(e)}>
              {
                ({handleSubmit, setFieldValue})=> (
                  <Form onSubmit={handleSubmit}>
                    <VStack spacing={4}>
                      <FormSection label="First Name" name="firstName" />
                      <FormSection label="Last Name" name="lastName" />
                      <FormSection label="Email" name="email" type="email" />
                      <FormSection label="country" name="country" type="select" nationality={nationality} setFieldValue={setFieldValue}  />
                      <FormSection label="Phone" name="phone" type="number" />

                      <button style={{visibility: "hidden"}} ref={btnSubmit} type="submit">send</button>
                      
                      <FormikErrorFocus
                        offset={60}
                        align={"top"}
                        ease={"linear"}
                        duration={500}
                      />
                    </VStack>
                  </Form>
                )
              }
            </Formik>
          </Box>
        </Box>

        <Box width={["full", "65%"]}>
          <Heading size={"lg"} color={isDark?"white":"black"} marginBottom="5">Booking Cart</Heading>

          <BoatDetail setPassenger={setPassenger} passenger={passenger} from={from} to={to} date={departureDate} time={departureTime} price={price} />

          {returnDate&&<BoatDetail passenger={passenger} from={to} to={from} date={returnDate} time={returnTime} price={price} />}

          <Flex bgColor={isDark?"":"white"} border={`1px solid #BFA888`} textAlign="center" py="9" justifyContent="center" color={isDark?"white":"black"}>
            <Grid templateColumns="repeat(2, 1fr)" columnGap="10" rowGap="5">
              <GridItem>
                <Text fontSize="xl" fontWeight="bold">Grand Total</Text>
              </GridItem>

              <GridItem>
                <Text fontSize="xl" fontWeight="bold">{formatRupiah(price * passenger * (returnDate?2:1))}</Text>
              </GridItem>

              <GridItem colSpan={["2", "1"]}>
                <CheckoutButton onClick={()=> navigate(-1)} text="Book Other Trip."   />
              </GridItem>

              <GridItem colSpan={["2", "1"]}>
                <CheckoutButton onClick={()=> btnSubmit.current.click()} text="Checkout"    />
              </GridItem>

            </Grid>
          </Flex>

        </Box>
      </Flex>
    </>
  )
}

export default OrderPage