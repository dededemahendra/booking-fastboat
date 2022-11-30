import { useEffect, useState } from "react"
import { FormLabel } from "@chakra-ui/form-control"
import { Heading, Flex, Box, VStack, List, ListItem } from "@chakra-ui/layout"
import { Text, Checkbox, Button, FormControl, Input, Radio, RadioGroup } from "@chakra-ui/react"
import { Select } from "chakra-react-select"
import { useFormik } from "formik"
import * as yup from "yup"
import axios from "./../utils/axios"
import { getOrderData } from "../utils/storage"
import moment from "moment"
import { formatRupiah } from "../utils/formatRupiah"
import { getPrice } from "../utils/outletCtx"

const validationSchema= yup.object().shape({
  passengers: yup.array().of(yup.object().shape({
    fullname: yup.string().required(),
    country: yup.string().required(),
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
  const {clientData, to, from, returnDate, returnTime, passenger, departureDate, departureTime}= orderData
  const [agreetnc, setAgreetnc]= useState(false)
  const isReturn= !!returnDate
  const [nationality, setNationality]= useState([])
  const price= getPrice()

  const departureInitialValue= {
    passengers: [...Array(+passenger)].fill({
      fullname: "",
      nationality: "",
      phone: "",
      gender: ""
    })
  }

  const departureForm= useFormik({
    initialValues: departureInitialValue,
    validationSchema,
    onSubmit: (values)=> {
      console.log(values);
    }
  })

  const returnForm= useFormik({
    initialValues: departureInitialValue,
    validationSchema
  })

  function submitForm() {
    departureForm.handleSubmit()

    console.log(departureForm.values, returnForm.values);

    if (isReturn) {
      returnForm.handleSubmit()
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
              <ListItem>Name : {clientData.firstName} {clientData.lastName}</ListItem>
              <ListItem>Email : {clientData.email}</ListItem>
              <ListItem>Nationality : {clientData.country}</ListItem>
              <ListItem>Phone Number : {clientData.phone}</ListItem>
            </List>
          </Box>

          <Box>
            <Text textAlign="center">Depart</Text>

            <List borderBottom="1px solid #fff">
              <ListItem>{from} to {to}</ListItem>
              <ListItem>{departureTime}</ListItem>
              <ListItem>{moment(departureDate).format("dddd, MMMM DD Y")}</ListItem>
              <ListItem>{passenger} Person</ListItem>
              <ListItem w="full">
                <Flex justify="space-between">
                  <Text>Ticket Fee</Text>
                  <Text>{formatRupiah(price * passenger)}</Text>
                </Flex>
              </ListItem>
            </List>
          </Box>

          {
            isReturn&&
            <Box>
              <Text textAlign="center">Return</Text>

              <List borderBottom="1px solid #fff">
                <ListItem>{to} to {from}</ListItem>
                <ListItem>{returnTime}</ListItem>
                <ListItem>{moment(returnDate).format("dddd, MMMM DD Y")}</ListItem>
                <ListItem>{passenger} Person</ListItem>
                <ListItem>
                  <Flex justify="space-between">
                    <Text>Ticket Fee</Text>
                    <Text>{formatRupiah(price * passenger)}</Text>
                  </Flex>
                </ListItem>
              </List>

              <Flex justify="space-between">
                <Text>Total</Text>
                <Text>{formatRupiah(price * passenger * (returnDate?2:1))}</Text>
              </Flex>
            </Box>
          }


        </VStack>
      </Flex>

      <Flex flex="1" justify="center">
        <Checkbox mr="3" onChange={e=> setAgreetnc(e.target.value)}>I Agree to Terms and Condition</Checkbox>

        <Button onClick={()=> submitForm()}>Proceed to Payment</Button>
      </Flex>
    </>
  )
}

export default OrderDetailPage