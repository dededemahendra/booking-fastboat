import { useRef, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { HStack, Grid, GridItem } from "@chakra-ui/layout"
import { Flex, Box, Heading, Text, VStack, Image, Select as Sel  } from "@chakra-ui/react"
import { Form, Formik } from "formik"
import FormikErrorFocus from "formik-error-focus"
import moment from "moment"
import axios from "./../utils/axios"
import {initialValues, validationSchema, FormSection, CheckoutButton} from "./../components/OrderPage"
import { getOrderData, setOrderData } from "../utils/storage"
import { getPrice } from "../utils/outletCtx"
import { formatRupiah } from "../utils/formatRupiah"

const BoatDetail= (props)=> {
  const {setPassenger, passenger, from, to, date, time, price}= props

  return (
    <Flex flexDirection="column" bgColor="#032340" paddingY="12" paddingX="10" borderRadius="md" marginBottom="7">
      <Flex flexDirection={["column", "row"]} w="full" spacing="10" alignItems="center">
        <Image src="boats.jpeg" width="50%" marginRight="10" />
        
        <VStack color="white" spacing="6">
          <Heading size="md">Fast Boat 1</Heading>
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

      <Flex marginTop="8" justifyContent="space-between" alignItems="center" textAlign="center" textColor="#979EA6">
        <Box>
          <Text>{from}</Text>
          <Text color="white">{moment(date).format("ddd, MMMM-D-Y")}</Text>
        </Box>

        <Box alignSelf="flex-end" width="32">
          <hr />
          <Text marginTop="1" fontSize="lg" color="white" fontWeight="bold">{time}</Text>
        </Box>

        <Box>
          <Text>{to}</Text>
          <Text color="white">{moment(date).format("ddd, MMMM-D-Y")}</Text>
        </Box>
      </Flex>

      <Grid textColor="#979EA6" marginTop="5" marginX="auto" templateColumns="repeat(2, 1fr)" columnGap="16" rowGap="3">
        <GridItem>Ticket Fee</GridItem>
        <GridItem>{formatRupiah(price)}</GridItem>

        <GridItem>Total</GridItem>
        <GridItem fontWeight="bold" color="white">{formatRupiah(price * passenger)}</GridItem>
      </Grid>

    </Flex>
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
      <Flex paddingX={["8", "20"]} pt="10" flexDirection={["column", "row"]} textColor="black">

        <Box width={["full", "35%"]} marginRight="16" marginBottom={["5", "0"]} position="sticky" height="full">
          <Heading size={"lg"} color="white" marginBottom="5">Booked By</Heading>
          <Box borderRadius="md" bgColor="#032340" padding="7">
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
          <Heading size={"lg"} color="white" marginBottom="5">Booking Cart</Heading>

          <BoatDetail setPassenger={setPassenger} passenger={passenger} from={from} to={to} date={departureDate} time={departureTime} price={price} />

          {returnDate&&<BoatDetail passenger={passenger} from={to} to={from} date={returnDate} time={returnTime} price={price} />}

          <Flex bgColor="#032340" textAlign="center"  py="9" justifyContent="center">
            <Grid templateColumns="repeat(2, 1fr)" columnGap="10" rowGap="5">
              <GridItem>
                <Text color="white" fontSize="xl" fontWeight="bold">Grand Total</Text>
              </GridItem>

              <GridItem>
                <Text color="white" fontSize="xl" fontWeight="bold">{formatRupiah(price * passenger * (returnDate?2:1))}</Text>
              </GridItem>

              <GridItem colSpan={["2", "1"]}>
                <CheckoutButton onClick={()=> navigate(-1)} text="Book Other Trip." background="#4A60A1"  />
              </GridItem>

              <GridItem colSpan={["2", "1"]}>
                <CheckoutButton onClick={()=> btnSubmit.current.click()} text="Checkout" background="whatsapp.600"   />
              </GridItem>

            </Grid>
          </Flex>

        </Box>
      </Flex>
    </>
  )
}

export default OrderPage