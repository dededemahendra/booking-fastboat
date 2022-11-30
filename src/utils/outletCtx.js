import { useOutletContext } from "react-router-dom"

export const getPrice= ()=> {
  const {price}= useOutletContext()

  return price
}