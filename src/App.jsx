import { Route } from "react-router-dom"
import { createRoutesFromElements, createBrowserRouter } from "react-router-dom"
import MainLayout from "./layouts/main"
import HomePage from "./pages"
import BoatsPage from "./pages/boats"
import OrderPage from "./pages/order"
import OrderDetailPage from "./pages/order_detail"
import AdminLayout from "./layouts/AdminLayout"
import DashboardAdmin from "./pages/admin/Dashboard"
import AddDestination from "./pages/admin/AddDestination"
import SignIn from "./pages/admin/Login"
import EditDestination from "./pages/admin/EditDestination"

const router= createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<MainLayout/>}>
        <Route index element={<HomePage/>} />
        <Route path="/boats" element={<BoatsPage/>} />
        <Route path="/order" element={<OrderPage/>} />
        <Route path="/order_detail" element={<OrderDetailPage/>} />
      </Route>

      <Route path="/admin_login" element={<SignIn/>} />

      <Route path="/admin" element={<AdminLayout/>}>
        <Route index element={<DashboardAdmin/>} />
        <Route path="add" element={<AddDestination/>} />
        <Route path="edit/:id" element={<EditDestination/>} />
      </Route>
    </>
  )
)

export default router
