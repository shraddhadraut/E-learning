import React, { lazy } from "react";

import DashboardIcon from "@material-ui/icons/Dashboard";
import CourseIcon from "@material-ui/icons/Group";
import UserIcon from "@material-ui/icons/People";
const Dashboard = lazy(() =>
  import("../../features/admin/Dashboard/Dashboard")
);
const User = lazy(() => import("../../features/admin/User/User"));
const Course = lazy(() => import("../../features/admin/Course/Course"));

export default [
  {
    title: "Dashboard",
    component: <Dashboard />,
    path: "/",
    showInMenu: true,
    icon: <DashboardIcon />,
    accessTo: "all",
  },
  {
    title: "User",
    component: <User />,
    path: "/user",
    showInMenu: true,
    icon: <UserIcon />,
    accessTo: "superadmin",
  },
  {
    title: "Course",
    component: <Course />,
    path: "/Course",
    showInMenu: true,
    icon: <CourseIcon />,
    accessTo: "all",
  },
];
