// import
import Dashboard from "./views/Dashboard/Dashboard/Dashboard";
import Tables from "./views/Dashboard/Tables/TablesBoat";

import { IoMdBoat } from "react-icons/io";
import { AiFillHome } from "react-icons/ai";

var dashRoutes = [
  {
    path: "/dashboard",
    name: "DASHBOARD",
    icon: <AiFillHome color="inherit" />,
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/tables",
    name: "ADD BOAT",
    icon: <IoMdBoat color="inherit" />,
    component: Tables,
    layout: "/admin",
  },
];
export default dashRoutes;
