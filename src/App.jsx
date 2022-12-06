import { Route } from "react-router-dom";
import { createRoutesFromElements, createBrowserRouter } from "react-router-dom";
import MainLayout from "./layouts/main";
import HomePage from "./pages";
import LoginAdmin from "./pages/login_admin";
import BoatsPage from "./pages/boats";
import OrderPage from "./pages/order";
import OrderDetailPage from "./pages/order_detail";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<HomePage />} />
      <Route path="/boats" element={<BoatsPage />} />
      <Route path="/order" element={<OrderPage />} />
      <Route path="/order_detail" element={<OrderDetailPage />} />
      <Route path="/login_admin" element={<LoginAdmin />} />
    </Route>
  )
);

export default router;
