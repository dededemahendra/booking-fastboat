import { useRef, useState } from 'react'
import { HStack, Grid, GridItem } from '@chakra-ui/layout'
import { Flex, Box, Heading, Text, VStack, FormControl, FormLabel, Input, Button, Image, Select as Sel  } from '@chakra-ui/react'
import { Select } from 'chakra-react-select'
import { Form, Formik, Field, ErrorMessage } from 'formik'
import FormikErrorFocus from "formik-error-focus"
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom'

const initialValues= {
  firstName: "",
  lastName: "",
  email: "",
  country: "",
  phone: ""
}

const validationSchema= yup.object().shape({
  firstName: yup.string().required("First Name is Required."),
  lastName: yup.string().required("Last Name is Required."),
  email: yup.string().email().required(),
  country: yup.string().required(),
  phone: yup.string().required(),
})

const FormSection= (props)=> {
  const {label, name, type="text", setFieldValue}= props

  const options= [
    {
      label: "Indonesian",
      value: "indonesian",
    },
    {
      label: "Foreigner",
      value: "foreigner",
    },
  ]

  return (
    <FormControl paddingX="4" color="white">
      <FormLabel>{label}</FormLabel>
      {type=="select"?
        <Select placeholder="Select Your Nationality" name={name} options={options} onChange={e=> setFieldValue(name, e.value)}  bg="tomato" selectedOptionStyle="check" />
        :<Field as={Input} name={name} type={type} options={options} height="9" variant="filled" size="md" outlineColor="gray" />
      }
      <ErrorMessage marginTop="2" color="red" name={name} component={Text}   />
    </FormControl>
  )
}

const CheckoutButton= (props)=> {
  const { text, background, onClick }= props

  return <Button onClick={onClick} color="#fff" variant="solid" bgColor={background} width="fit-content" marginX="auto" paddingX="7" paddingY="5" _hover={{bgColor: "whatsapp.700"}}>{text}</Button>
}

const OrderPage= ()=> {
  const [passenger, setPassenger]= useState(1)

  const navigate= useNavigate()

  const btnSubmit= useRef(null)

  function formSubmit(values) {
    console.log(values);
    navigate("/order_detail")
  }

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
                      <FormSection label="country" name="country" type="select" setFieldValue={setFieldValue} />
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

          <Flex flexDirection="column" bgColor="#032340" paddingY="12" paddingX="10" borderRadius="md" marginBottom="7">
            <Flex flexDirection={["column", "row"]} w="full" spacing="10" alignItems="center">
              <Image src="boats.jpeg" width="50%" marginRight="10" />
              
              <VStack color="white" spacing="6">
                <Heading size="md">Fast Boat 1</Heading>
                <HStack>
                  <Text>Passenger</Text>
                  <Sel width="24" onChange={e=> setPassenger(e.target.value)} value={passenger}>
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
                <Text>Bali</Text>
                <Text color="white">Sun, November 27 2022</Text>
              </Box>

              <Box alignSelf="flex-end" width="32">
                <hr />
                <Text marginTop="1" fontSize="lg" color="white" fontWeight="bold">6 : 40</Text>
              </Box>

              <Box>
                <Text>Bali</Text>
                <Text color="white">Sun, November 27 2022</Text>
              </Box>
            </Flex>

            <Grid textColor="#979EA6" marginTop="5" marginX="auto" templateColumns="repeat(2, 1fr)" columnGap="16" rowGap="3">
              <GridItem>Ticket Fee</GridItem>
              <GridItem>IDR 100.000</GridItem>

              <GridItem>Total</GridItem>
              <GridItem fontWeight="bold" color="white">IDR 100.000</GridItem>
            </Grid>

          </Flex>

          <Flex bgColor="#032340" textAlign="center" paddingX="10" paddingY="9" justifyContent="center">
            <Grid templateColumns="repeat(2, 1fr)" columnGap="10" rowGap="5" >
              <Text color="white" fontSize="xl" fontWeight="bold">Grand Total</Text>
              <Text color="white" fontSize="xl" fontWeight="bold">IDR 350.000</Text>

              <CheckoutButton onClick={()=> navigate(-1)} text="Book Other Trip." background="#4A60A1"  />
              <CheckoutButton onClick={()=> btnSubmit.current.click()} text="Checkout" background="whatsapp.600"  />
            </Grid>
          </Flex>

        </Box>
      </Flex>
    </>
  )
}

export default OrderPage