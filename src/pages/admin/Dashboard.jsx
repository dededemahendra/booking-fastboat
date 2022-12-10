import { Button } from "@chakra-ui/button"
import { Box, Flex, Heading } from "@chakra-ui/layout"
import { Table, Thead, Tr, Td, Th, Tbody } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { setDestinationData } from "../../utils/storage"
import axios from "./../../utils/axios"

const DashboardAdmin= ()=> {
  const [destinations, setDestinations]= useState([])
  const [isLoading, setIsLoading]= useState(true)

  const navigate= useNavigate()

  async function getDestinations() {
    try {
      setIsLoading(true)
      const {data}= await axios("/api?apicall=master-trip")
      setIsLoading(false)

      setDestinations(data)
    } catch (error) {
      console.log(error)
    }
  }

  async function deleteDestination(id) {
    if (!confirm("Delete this destination ?")) {
      return  
    }

    try {
      const { data }= await axios(`/api?apicall=delete-trip&kode=${id}`)

      console.log(data);

      alert("berhasil dihapus")

      getDestinations()
    } catch (error) {
      console.log(error);
    }
  }

  async function navigateUpdate(id) {
    const destination= destinations.find(v=> v.kode_trip==id)

    setDestinationData({
      id,
      from: destination.keberangkatan,
      to: destination.tujuan,
      departureTime: destination.jam
    })

    navigate(`/admin/edit/${id}`)
  }

  useEffect(()=> {
    getDestinations()
  }, [])

  return (
    <Box w="full">
      <Box>
        <Heading>Dashboard Admin</Heading>

        <Link to="/admin/add">
          <Button my="3" bg="green.400" _hover={{bg: "green.600"}}>Add Destination</Button>
        </Link>
      </Box>

      <Flex alignItems="center" justifyContent="center" w="full">
        <Table w={["90%"]} variant="simple">
          <Thead>
            <Tr>
              <Th>No</Th>
              <Th>Nama Kapal</Th>
              <Th>Keberangkatan</Th>
              <Th>Tujuan</Th>
              <Th>Jam</Th>
              <Th>Aksi</Th>
            </Tr>
          </Thead>

          <Tbody>
            {isLoading&&
              <Tr>
                <Td colSpan="99" textAlign="center">Getting Data...</Td>
              </Tr>
            }

            {
              destinations.sort((a, b)=> b.kode_trip - a.kode_trip).map((boat, k)=> (
                <Tr key={k}>
                  <Td>{ k+1 }</Td>
                  <Td>Fast Boat</Td>
                  <Td>{ boat.keberangkatan }</Td>
                  <Td>{ boat.tujuan }</Td>
                  <Td>{ boat.jam }</Td>
                  <Td>
                    <Button mr="3" onClick={()=> navigateUpdate(boat.kode_trip)}>Edit</Button>
                    <Button onClick={()=> deleteDestination(boat.kode_trip)} bg="red.500" _hover={{bg: "red.300"}}>Hapus</Button>
                  </Td>
                </Tr>
              ))
            }
          </Tbody>
        </Table>
      </Flex>

    </Box>
  )
}

export default DashboardAdmin