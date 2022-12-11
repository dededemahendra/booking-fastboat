import { Flex, Box, FormControl, FormLabel, Input, HStack, Stack, Button, Heading, Text, Textarea, Select, useToast } from "@chakra-ui/react";
import { useFormik } from "formik";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup"
import { getDestinations } from "../../utils/globalData";
import axios from "./../../utils/axios"

const AddDestination= ()=> {
  const [departureFrom, setDepartureFrom]= useState([])
  const [departureTo, setDepartureTo]= useState([])
  const [isLoading, setIsLoading]= useState(false)
  const toast= useToast()
  const navigate= useNavigate()

  const form= useFormik({
    initialValues: {
      from: "",
      to: "",
      departureTime: "",
    },
    validationSchema: yup.object({
      from: yup.string().required(),
      to: yup.string().required(),
      departureTime: yup.string().required(),
    }),
    onSubmit: ()=> null
  })

  async function getRoutes() {
    try {
      const routes= await getDestinations()

      setDepartureTo(routes)
      setDepartureFrom(routes)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=> {
    getRoutes()
  }, [])

  useEffect(()=> {
    if (form.values.from) {
      setDepartureTo(departureFrom.filter(v=> v!=form.values.from))
    }
  }, [form.values.from])

  async function addDestination() {
    form.handleSubmit()
    
    if (!form.isValid || !Object.keys(form.touched).length) {
      return
    }

    try {
      const { from, to, departureTime }= form.values
      
      setIsLoading(true)

      const {data}= await axios(`/api?apicall=insert_trip&jam=${departureTime}&kapasitas=0&keberangkatan=${from}&tujuan=${to}&status=AKTIF`)

      setIsLoading(false)

      toast({
        status: "success",
        title: "Success",
        description: "Destination successfully added.",
        position: "top-right",
        duration: 1000
      })

      setTimeout(() => {
        navigate("/admin")
      }, 1000);
    } catch (error) {
      setIsLoading(false)

      console.log(error);
    }
  }

  return (
    <Box w="full">
      <Flex direction="column" alignItems="center">
        <Box w={["80%", "50%"]}>
          <Stack spacing={5} w="full">
            <Text align="center" fontSize="xl" fontWeight="bold">Add Destination</Text>
            
            <FormControl id="date">
              <FormLabel>From</FormLabel>
              <Select placeholder="Depature From" name="from" onChange={form.handleChange} onBlur={form.handleBlur}>
              {
                  departureFrom.map((v, k)=> (
                    <option value={v} key={k}>{v}</option>
                  ))
                }
              </Select>

              {(form.errors.from && form.touched.from)&&<Text color="red">* Departure {form.errors.from}</Text>}
            </FormControl>

            <FormControl id="time" >
              <FormLabel>To</FormLabel>
              <Select placeholder="Depature To" name="to" onChange={form.handleChange} onBlur={form.handleBlur}>
                {
                  departureTo.map((v, k)=> (
                    <option value={v} key={k}>{v}</option>
                  ))
                }
              </Select>

              {(form.errors.to && form.touched.to)&&<Text color="red">* Departure {form.errors.to}</Text>}
            </FormControl>

            <FormControl id="time">
              <FormLabel>Depature Time</FormLabel>
              <Input type="time" px="4" w="fit-content" name="departureTime" onChange={form.handleChange} onBlur={form.handleBlur} />
              {(form.errors.departureTime && form.touched.departureTime)&&<Text color="red"> * {form.errors.departureTime}</Text>}
            </FormControl>

            <Button
              isLoading={isLoading}
              loadingText="Submitting"
              size="lg"
              w="full"
              bg={"blue.400"}
              color={"white"}
              _hover={{
                bg: "blue.500",
              }}
              onClick={()=> addDestination()}
            >
              Submit
            </Button>
          </Stack>
        </Box>
      </Flex>
    </Box>
  )
}

export default AddDestination