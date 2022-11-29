import {ReactSession} from "react-client-session"

ReactSession.setStoreType("cookie")

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