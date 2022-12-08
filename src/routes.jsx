// import
import Dashboard from "./views/Dashboard/Dashboard/Dashboard";
import Tables from "./views/Dashboard/Tables/TablesBoat";
import SignIn from "views/Auth/Login/Signin";

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
  {
    name: "ACCOUNT PAGES",
    category: "account",
    state: "pageCollapse",
    views: [
      {
        path: "/signin",
        name: "Sign In",
        component: SignIn,
        layout: "/auth",
      },
    ],
  },
];
export default dashRoutes;
