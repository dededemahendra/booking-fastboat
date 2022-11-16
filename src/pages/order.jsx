import { Flex, Box, Heading, Text, VStack, FormControl, FormLabel, Input, Button, Image  } from '@chakra-ui/react'
import { Select } from 'chakra-react-select'
import { ErrorMessage } from 'formik'
import { Form, Formik, Field } from 'formik'
import { useRef } from 'react'
import * as yup from 'yup'

const FormSection= (props)=> {
  const {label, name, type="text", setFieldValue}= props

  const options= [
    {
      label: "I am red",
      value: "i-am-red",
      colorScheme: "red"
    },
    {
      label: "I fallback to purple",
      value: "i-am-purple",
    },
  ]

  return (
    <FormControl paddingX="4" color="white">
      <FormLabel>{label}</FormLabel>
      {type=="select"?
        <Select placeholder="test123" name={name} options={options} onChange={e=> setFieldValue(name, e.value)}  bg="tomato" selectedOptionStyle="check" />
        :<Field as={Input} name={name} type={type} options={options} variant="filled" size="md" outlineColor="gray" />
      }
      <ErrorMessage marginTop="2" color="red" name={name} component={Text} />
    </FormControl>
  )
}

const OrderPage= ()=> {
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

  const btnSubmit= useRef(null)

  function formSubmit(values) {
    console.log(values);
  }

  return (
    <>
      <Flex paddingX={["8", "10"]} paddingY="10" flexDirection={["column", "row"]} textColor="black">

        <Box width={["full", "35%"]} marginRight="5" marginBottom={["5", "0"]}>
          <Heading size={"lg"} color="white" marginBottom="5">Booked By</Heading>
          <Box borderRadius="md" bgColor="#032340" >
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
                    </VStack>
                  </Form>
                )
              }
            </Formik>
          </Box>
        </Box>

        <Box width={["full", "65%"]}>
          <Heading size={"lg"} color="white" marginBottom="5">Booking Cart</Heading>

          <Flex bgColor="#032340" padding="6">
            <Image src="boats.jpeg" width="52" />

            <Flex>
              
            </Flex>
          </Flex>

          <Box bgColor="#032340" marginTop="7" padding="4">
            <p>checkout.</p>
            <Button onClick={()=> btnSubmit.current.click()} variant="solid" bgColor="whatsapp.400" _hover={{bgColor: "whatsapp.600"}}>Checkout.</Button>
          </Box>
        </Box>
      </Flex>
    </>
  )
}

export default OrderPage