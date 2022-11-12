import { Route } from "react-router-dom"
import { createRoutesFromElements, createBrowserRouter } from "react-router-dom"
import MainLayout from "./layouts/main"
import HomePage from "./pages"
import BoatsPage from "./pages/boats"
import OrderPage from "./pages/order"

const router= createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout/>}>
      <Route index element={<HomePage/>} />
      <Route path="/boats" element={<BoatsPage/>} />
      <Route path="/order" element={<OrderPage/>} />
    </Route>
  )
)

export default router
