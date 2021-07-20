import React, { lazy } from "react";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import CallRoundedIcon from "@material-ui/icons/CallRounded";
import AccountCircle from "@material-ui/icons/AccountCircle";
const Home = lazy(() => import("../../features/frontend/Home/Home"));
const Contact = lazy(() => import("../../features/frontend/Contact/Contact"));
const Login = lazy(() => import("../../features/frontend/Login/Login"));

const ResetLink = lazy(() =>
  import("../../features/frontend/Resetpassword/ResetLink")
);
const ChangePassword = lazy(() =>
  import("../../features/frontend/Resetpassword/ChangePassword")
);

export default [
  {
    title: "Home",
    component: <Home />,
    showInMenu: true,
    path: "/",
    icon: <HomeRoundedIcon />,
  },
  {
    title: "Contact",
    component: <Contact />,
    showInMenu: true,
    path: "/contact",
    icon: <CallRoundedIcon />,
  },
  {
    title: "Login",
    component: <Login />,
    showInMenu: true,
    path: "/login",
    icon: <AccountCircle />,
  },
  {
    title: "Password Reset Link",
    component: <ResetLink />,
    showInMenu: false,
    path: "/resetLink",
    icon: "",
  },
  {
    title: "Change Password",
    component: <ChangePassword />,
    showInMenu: false,
    path: "/change-password/:token",
    icon: "",
  },
];
