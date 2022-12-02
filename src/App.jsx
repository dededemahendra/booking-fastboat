import { Route } from "react-router-dom"
import { createRoutesFromElements, createBrowserRouter } from "react-router-dom"
import MainLayout from "./layouts/main"
import HomePage from "./pages"
import BoatsPage from "./pages/boats"
import OrderPage from "./pages/order"
import OrderDetailPage from "./pages/order_detail"
import "./assets/index.css"

const router= createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout/>}>
      <Route index element={<HomePage/>} />
      <Route path="/boats" element={<BoatsPage/>} />
      <Route path="/order" element={<OrderPage/>} />
      <Route path="/order_detail" element={<OrderDetailPage/>} />
    </Route>
  )
)

export default router
