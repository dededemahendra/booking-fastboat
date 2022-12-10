import {ReactSession} from "react-client-session"

ReactSession.setStoreType("sessionStorage")

export function getOrderData() {
  try {
    const order= ReactSession.get("order")

    if (!order) {
      return null
    }
  
    return JSON.parse(order)

  } catch {
    return null
  }
}

export function setOrderData(order) {
   ReactSession.set("order", JSON.stringify(order))
}

export function getDestinationData() {
  try {
    const destination= ReactSession.get("destination")

    if (!destination) {
      return null
    }
  
    return JSON.parse(destination)

  } catch {
    return null
  }
}

export function setDestinationData(destination) {
   ReactSession.set("destination", JSON.stringify(destination))
}