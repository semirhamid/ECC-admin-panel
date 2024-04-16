"use client";
import { signOut } from "next-auth/react"
import React from "react";
import Image from "next/image";
import { MenuItem, MenuItemProps } from "./sidebarItem";
import {
  CreateAJobIcon,
  DashboardIcon,
  SettingsIcon,
  logoutIcon,
  userMgmtIcon,
  down,
} from "./menuIcons";

const MenuItems: MenuItemProps[] = [
  {
    icon: CreateAJobIcon,
    text: "after sale",
    href: "/after-sale",
  },
  {
    icon: CreateAJobIcon,
    text: "ssl",
    href: "/ssl",
  },
  {
    icon: userMgmtIcon,
    text: "User Management",
    href: "/user-management",
  },
  {
    icon: SettingsIcon,
    text: "Settings",
    href: "/settings",
  },
];
const Sidebar: React.FC = () => {



  return (
    <aside
      className="min-w-80 max-h-full h-[100%] flex justify-between flex-col sidebar-bg"
      aria-label="Sidebar"
    >
      <div>
        <div className="pt-10 w-full flex justify-center items-center">
          <Image src="/ecc_logo.svg" alt="Logo" width={150} height={120} />
        </div>
        <ul className="flex flex-col mt-10 justify-end items-end pr-6 space-y-2">
          <MenuItem
            icon={DashboardIcon}
            classes="justify-left pl-0"
            text="Overview"
            href="/"
          />

          <div className={`cursor-pointer  w-56  rounded-xl p-2  `}>
            <p className={" ml-5"}>Create a job</p>
          </div>

          {MenuItems.map((item, index) => (
            <MenuItem key={index} {...item} />
          ))}
        </ul>
      </div>
      <div className="pb-10 w-full list-none flex justify-center items-center">
        <MenuItem
          icon={logoutIcon}
          classes="justify-center pl-0"
          text="Logout"
          href="/login"
          onClick={signOut} 

        />
      </div>

      <div></div>
    </aside>
  );
};

export default Sidebar;
