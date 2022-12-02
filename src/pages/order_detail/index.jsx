import { useEffect, useState } from "react"
import { Heading, Flex, Box, VStack, List, ListItem } from "@chakra-ui/layout"
import { Text, Checkbox, Button,  useToast } from "@chakra-ui/react"
import { useFormik } from "formik"
import { useNavigate } from "react-router-dom"
import axios from "../../utils/axios"
import { getOrderData } from "../../utils/storage"
import moment from "moment"
import { formatRupiah } from "../../utils/formatRupiah"
import { getPrice } from "../../utils/outletCtx"
import { validationSchema, PassengersDetailForm } from "./OrderDetailComponents"

const OrderDetailPage= ()=> {
  const orderData= getOrderData()
  const [agreetnc, setAgreetnc]= useState(false)
  const isReturn= !!orderData?.returnDate
  const [nationality, setNationality]= useState([])
  const price= getPrice()
  const navigate= useNavigate()
  const toast= useToast()

  const departureInitialValue= {
    passengers: [...Array(+orderData?.passenger || 1)].fill({
      fullname: "",
      nationality: "",
      phone: "",
      gender: ""
    })
  }

  const departureForm= useFormik({
    initialValues: departureInitialValue,
    validationSchema,
    onSubmit: ()=> null
  })

  const returnForm= useFormik({
    initialValues: departureInitialValue,
    validationSchema,
    onSubmit: ()=> null
  })

  async function submitForm() {
    if (!agreetnc) {
      return toast({
        status: "warning",
        position: "top-right",
        isClosable: true,
        title: "Please check agree Terms and Condition.",
        duration: 2000
      })
    }

    const item_detail= {
      name: `Ticket ${orderData?.from} to ${orderData?.to}`,
      price,
      quantity: orderData?.passenger,     
    }

    const payment_details= {
      total_price: price * orderData?.passenger * (isReturn?2:1),
      item_details: [
        item_detail
      ],
      first_name: orderData?.clientData.firstName,
      last_name: orderData?.clientData.lastName,
      email: orderData?.clientData.email,
      phone: orderData?.clientData.phone
    }
      
    departureForm.handleSubmit()
    let valid= departureForm.isValid

    if (isReturn) {
      returnForm.handleSubmit()
      valid= returnForm.isValid

      payment_details.item_details.push({
        ...item_detail,
        name: `Ticket ${orderData?.to} to ${orderData?.from}`
      })
    }

    if (!isValid) {
      return
    }

    try {
      const {data}= await axios.post("/edge-func/test-func", {
        ...payment_details
      })

      window?.snap.pay(data.token, {
        onSuccess: payload=> {
          console.log(payload)
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  async function getNationality() {
    try {
      const {data}= await axios("/api?apicall=nationality")

      setNationality(data.map(v=> {
        return {
          label: v.nationality,
          value: v.nationality,
          // value: v.kode,
        }
      }))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=> {
    if (!orderData) {
      navigate("/")
    }
    getNationality()
    // departureForm.handleSubmit()
  }, [])

  return (
    <>
      <Flex paddingX={["8", "20"]} pt="10" flexDirection={["column", "row"]} mb="7">

        <Box width={["full", "60%"]} bg="#032340" mr={[0, 6]} mb={[8, 0]} p="7" h="fit-content">
          <PassengersDetailForm form={departureForm} initialValues={departureInitialValue} nationality={nationality} />

          {isReturn&&<>
            <PassengersDetailForm form={returnForm} initialValues={departureInitialValue} nationality={nationality} isReturnForm={true} >
              <Button onClick={()=> returnForm.setValues(departureForm.values)}>Same as Above</Button>
            </PassengersDetailForm>
          </>}
        </Box>
        
        <VStack width={["full", "40%"]} bg="#032340" p="7" gap="3" align="left" h="fit-content">
          <Heading size={["lg"]} >Booking Info</Heading>  

          <Box>
            <Text textAlign="center">Booked By</Text>

            <List borderBottom="1px solid #fff" spacing="2" mb="3">
              <ListItem>Name : {orderData?.clientData.firstName} {orderData?.clientData.lastName}</ListItem>
              <ListItem>Email : {orderData?.clientData.email}</ListItem>
              <ListItem>Nationality : {orderData?.clientData.country}</ListItem>
              <ListItem>Phone Number : {orderData?.clientData.phone}</ListItem>
            </List>
          </Box>

          <Box>
            <Text textAlign="center">Depart</Text>

            <List borderBottom="1px solid #fff">
              <ListItem>{orderData?.from} to {orderData?.to}</ListItem>
              <ListItem>{orderData?.departureTime}</ListItem>
              <ListItem>{moment(orderData?.departureDate).format("dddd, MMMM DD Y")}</ListItem>
              <ListItem>{orderData?.passenger} Person</ListItem>
              <ListItem w="full">
                <Flex justify="space-between">
                  <Text>Ticket Fee</Text>
                  <Text>{formatRupiah(price * orderData?.passenger)}</Text>
                </Flex>
              </ListItem>
            </List>
          </Box>

          {
            isReturn&&
            <Box>
              <Text textAlign="center">Return</Text>

              <List borderBottom="1px solid #fff">
                <ListItem>{orderData?.to} to {orderData?.from}</ListItem>
                <ListItem>{orderData?.returnTime}</ListItem>
                <ListItem>{moment(orderData?.returnDate).format("dddd, MMMM DD Y")}</ListItem>
                <ListItem>{orderData?.passenger} Person</ListItem>
                <ListItem>
                  <Flex justify="space-between">
                    <Text>Ticket Fee</Text>
                    <Text>{formatRupiah(price * orderData?.passenger)}</Text>
                  </Flex>
                </ListItem>
              </List>

            </Box>
          }

          <Flex justify="space-between">
            <Text fontWeight="bold" fontSize="xl">Total</Text>
            <Text fontWeight="bold" fontSize="lg">{formatRupiah(price * orderData?.passenger * (orderData?.returnDate?2:1))}</Text>
          </Flex>
        </VStack>
      </Flex>

      <Flex flex="1" justify="center">
        <Checkbox mr="3" onChange={e=> setAgreetnc(e.target.checked)}>I Agree to Terms and Condition</Checkbox>

        <Button onClick={()=> submitForm()}>Proceed to Payment</Button>
      </Flex>
    </>
  )
}

export default OrderDetailPage