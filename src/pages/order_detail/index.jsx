import { useEffect, useState } from "react"
import { Heading, Flex, Box, VStack, List, ListItem } from "@chakra-ui/layout"
import { Text, Checkbox, Button,  useToast, useDisclosure } from "@chakra-ui/react"
import { useFormik } from "formik"
import { useNavigate } from "react-router-dom"
import emailjs from '@emailjs/browser'
import axios from "../../utils/axios"
import { getOrderData, setOrderData } from "../../utils/storage"
import moment from "moment"
import { formatRupiah } from "../../utils/formatRupiah"
import { getPrice } from "../../utils/globalData"
import { validationSchema, PassengersDetailForm, LoadingAlert } from "./OrderDetailComponents"

const OrderDetailPage= ()=> {
  const orderData= getOrderData()
  const isReturn= !!orderData?.returnDate

  const [agreetnc, setAgreetnc]= useState(false)
  const [nationality, setNationality]= useState([])

  const {isOpen, onClose, onOpen} = useDisclosure()
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
  })

  const returnForm= useFormik({
    initialValues: departureInitialValue,
    validationSchema,
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
    let valid= departureForm.isValid &&  Object.keys(departureForm.touched).length > 0 

    if (isReturn) {
      returnForm.handleSubmit()
      valid= returnForm.isValid &&  Object.keys(returnForm.touched).length > 0

      payment_details.item_details.push({
        ...item_detail,
        name: `Ticket ${orderData?.to} to ${orderData?.from}`
      })
    }

    if (!valid) {
      window.scroll(0, 0)

      return toast({
        status: "warning",
        position: "top-right",
        isClosable: true,
        title: "Please fill out all passanger information.",
        duration: 2000
      })
    }

    try {
      onOpen()

      const {data}= await axios.post("/edge-func/payment-func", {
        ...payment_details
      })

      onClose()

      window?.snap.pay(data.token, {
        onSuccess: payload=> {
          emailjs.send("service_fokhgy8", "template_jf6cx6i", {
            to: orderData?.clientData.email,
          }, "73ipGvvk1l1hXGRzr")
          
          setOrderData(null)
          navigate("/")
        }
      })
    } catch (error) {
      onClose()
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
  }, [])

  return (
    <>
      <Flex paddingX={["8", "20" ,"24"]} pt="10" flexDirection={["column", "row"]} mb="7">

        <Box width={["full", "60%"]} border="1px solid #BFA888" mr={[0, 6]} mb={[8, 0]} p="7" h="fit-content">
          <PassengersDetailForm form={departureForm} initialValues={departureInitialValue} nationality={nationality} />

          {isReturn&&<>
            <PassengersDetailForm form={returnForm} initialValues={departureInitialValue} nationality={nationality} isReturnForm={true} >
              <Button onClick={()=> returnForm.setValues(departureForm.values)}>Same as Above</Button>
            </PassengersDetailForm>
          </>}

        </Box>
        
        <VStack width={["full", "40%"]} border="1px solid #BFA888" p="7" gap="3" align="left" h="fit-content">
          <Heading size={["lg"]} >Booking Info</Heading>  

          <Box>
            <Heading textAlign="center" size="md">Booked By</Heading>

            <List borderBottom="1px solid #fff" spacing="3" mb="4" pb="3">
              <ListItem>Name : {orderData?.clientData.firstName} {orderData?.clientData.lastName}</ListItem>
              <ListItem>Email : {orderData?.clientData.email}</ListItem>
              <ListItem>Nationality : {orderData?.clientData.country}</ListItem>
              <ListItem>Phone Number : {orderData?.clientData.phone}</ListItem>
            </List>
          </Box>

          <Box>
            <Heading textAlign="center" size="md">Depart</Heading>

            <List borderBottom="1px solid #fff" spacing="3">
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
              <Heading textAlign="center" size="md">Return</Heading>

              <List borderBottom="1px solid #fff" spacing="3">
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
      
      <LoadingAlert isOpen={isOpen} />

      <Flex flex="1" justify="center" flexDirection={["column", "row"]} align="center" gap="5" mt="10">
        <Checkbox mr="3" onChange={e=> setAgreetnc(e.target.checked)}>I Agree to Terms and Condition</Checkbox>

        <Button w="fit-content" size="lg" onClick={()=> submitForm()}>Proceed to Payment</Button>
      </Flex>
    </>
  )
}

export default OrderDetailPage