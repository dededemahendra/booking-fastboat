import { useState } from "react"
import { Box, Flex, Button, FormControl, FormLabel, Heading, Input, useColorModeValue, Text, useToast } from "@chakra-ui/react"
import { useClient } from "react-supabase"
import { useFormik } from "formik"
import * as yup from "yup"
import { useNavigate } from "react-router-dom"

function SignIn() {
  const [isLoading, setIsLoading]= useState(false)
  const titleColor = useColorModeValue("teal.300", "teal.200");
  const toast= useToast()
  const navigate= useNavigate()
  const { auth }= useClient()

  const form= useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: yup.object().shape({
      email: yup.string().email().required(),
      password: yup.string().required(),
    }),
    onSubmit: ()=> null
  }) 

  async function login(e) {
    e?.preventDefault()

    form.handleSubmit()

    if (!form.isValid || !Object.keys(form.touched).length) {
      return toast({
        duration: 1500,
        position: "top-right",
        status: "warning",
        title: "Warning",
        description: "Please fill out all form",
        isClosable: true
      })
    }

    try {
      setIsLoading(true)
      const { data }= await auth.signInWithPassword(form.values)
      setIsLoading(false)

      if (!data.user) {
        return toast({
          duration: 1500,
          position: "top-right",
          status: "error",
          title: "Error",
          description: "Email or password is wrong.",
        })
      }

      toast({
        duration: 1000,
        position: "top-right",
        status: "success",
        title: "Success",
        description: `Welcome ${data.user.email}`,
      })

      setTimeout(()=> {
        navigate("/admin")
      }, 1000)

    } catch (error) {
      setIsLoading(false)

      toast({
        duration: 1500,
        status: "error",
        title: "Error",
        description: "Sorry unexpected error occured.",
        position: "top-right",
      })

      console.log(error);
    }
  }

  return (
    <Flex position="relative" mb="40px">
      <Flex h={{ sm: "initial", md: "75vh", lg: "85vh" }} w="100%" maxW="1044px" mx="auto" justifyContent="center" mb="30px" pt={{ sm: "100px", md: "0px" }}>
        <Flex alignItems="center" justifyContent="start" style={{ userSelect: "none" }} w={{ base: "100%", md: "50%", lg: "42%" }}>
          <Flex direction="column" w="100%" backgroundColor={""} boxShadow={"md"} p="48px" borderRadius={"lg"} mt={{ md: "150px", lg: "80px" }} alignItems={"center"}>
            <Heading color={titleColor} fontSize="32px" mb="10px">Sign in</Heading>

            <form style={{width: "100%"}} onSubmit={e=> login(e)}>
              <FormControl mb="24px">
                <FormLabel ms="4px" fontSize="sm" fontWeight="normal">Email</FormLabel>
                <Input borderRadius="15px" mb="3" fontSize="sm" type="text" placeholder="Your email adress" size="lg" onChange={form.handleChange} onBlur={form.handleBlur} name="email" />
                {(form.errors.email && form.touched.email)&&<Text color="red">*{form.errors.email}</Text>}
              </FormControl>

              <FormControl mb="36px">
                <FormLabel ms="4px" fontSize="sm" fontWeight="normal">Password</FormLabel>
                <Input borderRadius="15px" mb="3px" fontSize="sm" type="password" placeholder="Your password" size="lg" onChange={form.handleChange} onBlur={form.handleBlur} name="password" />
                {(form.errors.password && form.touched.password)&&<Text color="red">*{form.errors.password}</Text>}
              </FormControl>

              <Button
                fontSize="15px"
                type="submit"
                bg="teal.300"
                w="100%"
                h="45"
                mb="20px"
                color="white"
                mt="20px"
                isLoading={isLoading}
                _hover={{
                  bg: "teal.200",
                }}
                _active={{
                  bg: "teal.400",
                }}
                onClick={()=> login()}
              >
                SIGN IN
              </Button>
            </form>

          </Flex>
        </Flex>
        <Box display={{ base: "none", md: "block" }} overflowX="hidden" h="100%" w="40vw" position="absolute" right="0px"></Box>
      </Flex>
    </Flex>
  );
}

export default SignIn;