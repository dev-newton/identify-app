import React from "react";
import { AiOutlineLogout, AiFillDashboard } from "react-icons/ai";
import { BiLockOpen } from "react-icons/bi";
import { FaUserAlt } from "react-icons/fa";
import { IoMdBarcode } from "react-icons/io";

export const SidebarData = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <AiFillDashboard fontSize="20px" />,
    cName: "nav-text",
  },
  {
    title: "Profile",
    path: "/profile",
    icon: <FaUserAlt fontSize="20px" />,
    cName: "nav-text",
  },
  {
    title: "Code Generation",
    path: "/code-generation",
    icon: <IoMdBarcode fontSize="20px" />,
    cName: "nav-text",
  },
  {
    title: "Code Validation",
    path: "/code-validation",
    icon: <BiLockOpen fontSize="20px" />,
    cName: "nav-text",
  },
  {
    title: "Logout",
    path: "/",
    icon: <AiOutlineLogout fontSize="20px" />,
    cName: "nav-text",
  },
];
