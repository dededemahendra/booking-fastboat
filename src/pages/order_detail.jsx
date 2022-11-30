import { useEffect, useState } from "react"
import { FormLabel } from "@chakra-ui/form-control"
import { Heading, Flex, Box, VStack, List, ListItem } from "@chakra-ui/layout"
import { Text, Checkbox, Button, FormControl, Input, Radio, RadioGroup, useToast } from "@chakra-ui/react"
import { Select } from "chakra-react-select"
import { useFormik } from "formik"
import { useNavigate } from "react-router-dom"
import * as yup from "yup"
import axios from "./../utils/axios"
import { getOrderData } from "../utils/storage"
import moment from "moment"
import { formatRupiah } from "../utils/formatRupiah"
import { getPrice } from "../utils/outletCtx"

const validationSchema= yup.object().shape({
  passengers: yup.array().of(yup.object().shape({
    fullname: yup.string().required(),
    nationality: yup.string().required(),
    phone: yup.string().required(),
    gender: yup.string().required()
  }))
})

const ErrorMessage= ({form, index, keys, text})=> {
  try {
    if (form.errors.passengers?.at(index)[keys] && form.touched.passengers?.at(index)[keys]) {
      return <Text>{text} is Required</Text>
    } 
    throw null
  } catch (e) {
    return null
  }
}

const FormInput= ({children, title})=> {
  return (
    <FormControl>
      <FormLabel>{title}</FormLabel>
      {children}
    </FormControl>
  )
}

const ReturnSelectNationality= (props)=> {
  const {nationality, returnForm, k}= props
  const [inputValue, setInputValue]= useState("")
  const selectedCountry= returnForm.values.passengers[k].nationality
  const [isChanged, setIsChanged]= useState(false)

  useEffect(()=> {
    if (!isChanged) {
      setInputValue(selectedCountry)
    }

    setIsChanged(false)
  }, [selectedCountry])

  function changeCountry(country) {
    returnForm.setFieldValue(`passengers.${k}.nationality`, country)
    setIsChanged(true)
  }

  return <Select options={nationality} onInputChange={e=> setInputValue(e)} inputValue={inputValue} onChange={e=> changeCountry(e.label)}></Select>
}

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
      fullname: "a",
      nationality: "Indonesia",
      phone: "10101",
      gender: "male"
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

    departureForm.handleSubmit()
    let valid= departureForm.isValid

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
    
    if (isReturn) {
      returnForm.handleSubmit()
      valid= returnForm.isValid

      payment_details.item_details.push({
        ...item_detail,
        name: `Ticket ${orderData?.to} to ${orderData?.from}`
      })
    }

    console.log(payment_details)

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

        <Box width={["full", "60%"]} bg="#032340" mr={[0, 6]} p="7" h="fit-content">
          <Text>Passengers</Text>  

          <Box>
            <Text>Destination</Text>
            {
              departureInitialValue.passengers.map((_, k)=> (
                <Box key={k} mb="8">
                  <FormInput title="Fullname">
                    <Input type="text" name={`passengers.${k}.fullname`} value={departureForm.values.passengers[k].fullname} onChange={departureForm.handleChange} />
                    <ErrorMessage form={departureForm} index={k} keys="fullname" text="Fullname" />
                  </FormInput>

                  <FormInput title="Country">
                    <Select  options={nationality} onChange={e=> departureForm.setFieldValue(`passengers.${k}.nationality`, e.label)}></Select>
                    <ErrorMessage form={departureForm} index={k} keys="country" text="Country" />
                  </FormInput>

                  <FormInput title="Mobile Phone">
                    <Input type="number" name={`passengers.${k}.phone`} value={departureForm.values.passengers[k].phone} onChange={departureForm.handleChange} />
                    <ErrorMessage form={departureForm} index={k} keys="phone" text="Mobile Phone" />
                  </FormInput>

                  <FormInput title="Gender">
                    <RadioGroup name={`passengers.${k}.gender`} onChange={e=> departureForm.setFieldValue(`passengers.${k}.gender`, e)}>
                      <Radio value="male" >Male</Radio>
                      <Radio ml="3" value="female">Female</Radio>
                    </RadioGroup>
                    <ErrorMessage form={departureForm} index={k} keys="gender" text="Gender" />
                  </FormInput>
                </Box>
              ))
            }
          </Box>

          {isReturn&&<Box>
            <Text>Return</Text>
            <Button onClick={()=> returnForm.setValues(departureForm.values)}>Same as Above</Button>
            {
              departureInitialValue.passengers.map((_, k)=> (
                <Box key={k} mb="8">
                  <FormInput title="Fullname">
                    <Input type="text" name={`passengers.${k}.fullname`} value={returnForm.values.passengers[k].fullname} onChange={returnForm.handleChange} />
                    <ErrorMessage form={returnForm} index={k} keys="fullname" text="Fullname" />
                  </FormInput>

                  <FormInput title="Country">
                    <ReturnSelectNationality nationality={nationality} returnForm={returnForm} k={k} />
                    <ErrorMessage form={returnForm} index={k} keys="country" text="Country" />
                  </FormInput>

                  <FormInput title="Mobile Phone">
                    <Input type="number" name={`passengers.${k}.phone`} value={returnForm.values.passengers[k].phone} onChange={returnForm.handleChange} />
                    <ErrorMessage form={returnForm} index={k} keys="phone" text="Mobile Phone" />
                  </FormInput>

                  <FormInput title="Gender">
                    <RadioGroup value={returnForm.values.passengers[k].gender} onChange={e=> returnForm.setFieldValue(`passengers.${k}.gender`, e)}>
                      <Radio value="male" >Male</Radio>
                      <Radio ml="3" value="female">Female</Radio>
                    </RadioGroup>
                    <ErrorMessage form={returnForm} index={k} keys="gender" text="Gender" />
                  </FormInput>
                </Box>
              ))
            }
          </Box>}
        </Box>
        
        <VStack width={["full", "40%"]} bg="#032340" p="7" gap="3" align="left" h="fit-content">
          <Heading size={["lg"]} >Booking Info</Heading>  

          <Box>
            <Text textAlign="center">Booked By</Text>

            <List borderBottom="1px solid #fff">
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

              <Flex justify="space-between">
                <Text>Total</Text>
                <Text>{formatRupiah(price * orderData?.passenger * (orderData?.returnDate?2:1))}</Text>
              </Flex>
            </Box>
          }


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