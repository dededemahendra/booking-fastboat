import { useEffect, useState } from "react"
import { Text, Input, Radio, RadioGroup, FormControl, FormLabel, Heading, Accordion, AccordionButton, AccordionPanel, AccordionIcon, AccordionItem } from "@chakra-ui/react"
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody } from '@chakra-ui/react'
import { Select } from "chakra-react-select"
import * as yup from "yup"

export const validationSchema= yup.object().shape({
  passengers: yup.array().of(yup.object().shape({
    fullname: yup.string().required(),
    nationality: yup.string().required(),
    phone: yup.string().required(),
    gender: yup.string().required()
  }))
})

export const ErrorMessage= ({form, index, keys, text})=> {
  try {
    if (form.errors.passengers?.at(index)[keys] && form.touched?.passengers?.at(index)[keys]) {
      return <Text color="red" mt="2">*{text} is Required</Text>
    } 
    throw null
  } catch (e) {
    return null
  }
}

export const FormInput= ({children, title})=> {
  return (
    <FormControl mb="3">
      <FormLabel>{title}</FormLabel>
      {children}
    </FormControl>
  )
}

export const ReturnSelectNationality= (props)=> {
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

  return <Select options={nationality} onInputChange={e=> setInputValue(e)} inputValue={inputValue} onChange={e=> changeCountry(e.label)} {...props}></Select>
}

export const PassengersDetailForm= props=> {
  const {form, initialValues, nationality, isReturnForm= false, children}= props

  return (
    <Accordion allowToggle defaultIndex={[0]} mb="6">
      <AccordionItem>
        <AccordionButton size="md">
          <Heading size="md">{isReturnForm?"Return":"Departure"}</Heading>
          <AccordionIcon/>
        </AccordionButton>

        {children&&<AccordionPanel>
          {children}
        </AccordionPanel>}

        {
          initialValues.passengers.map((_, k)=> (
            <AccordionPanel key={k}>
              <FormInput title="Fullname">
                <Input type="text" name={`passengers.${k}.fullname`} value={form.values.passengers[k].fullname} onChange={form.handleChange} onBlur={form.handleBlur} />
                <ErrorMessage form={form} index={k} keys="fullname" text="Fullname" />
              </FormInput>

              <FormInput title="Country">
                {
                  isReturnForm?
                  <ReturnSelectNationality nationality={nationality} returnForm={form} k={k} onBlur={form.handleBlur} />:
                  <Select options={nationality} onChange={e=> form.setFieldValue(`passengers.${k}.nationality`, e.label)} onBlur={form.handleBlur}></Select>
                }
                <ErrorMessage form={form} index={k} keys="nationality" text="Nationality" />
              </FormInput>

              <FormInput title="Mobile Phone">
                <Input type="number" name={`passengers.${k}.phone`} value={form.values.passengers[k].phone} onChange={form.handleChange} />
                <ErrorMessage form={form} index={k} keys="phone" text="Mobile Phone" />
              </FormInput>

              <FormInput title="Gender">
                <RadioGroup value={form.values.passengers[k].gender} onChange={e=> form.setFieldValue(`passengers.${k}.gender`, e)}>
                  <Radio value="male" >Male</Radio>
                  <Radio ml="3" value="female">Female</Radio>
                </RadioGroup>
                <ErrorMessage form={form} index={k} keys="gender" text="Gender" />
              </FormInput>
            </AccordionPanel>
          ))
        }

      </AccordionItem>
    </Accordion>
  )
}

export const LoadingAlert= ({isOpen})=> {
  return (
    <Modal isOpen={isOpen}>
      <ModalOverlay/>

      <ModalContent>
        <ModalHeader>Loading</ModalHeader>

        <ModalBody>
          <Text>Please wait</Text>
          <Text>Do not close or reload the until payment information appeared.</Text>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}