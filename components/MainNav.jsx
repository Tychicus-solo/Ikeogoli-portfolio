import React from "react";
import NavList from "./NavList";
import MascotImg from "../public/assets/dark mode images/portfolio-logo.svg";
import { ContactMeBtn } from ".";
import Image from "next/image";

const MainNav = () => {
  return (
    <div className="main-nav flex items-center gap-x-[67px] w-full justify-between px-[160px] py-[28px]">
      <Image src={MascotImg} width={56} height={56} alt="Ike Ogoli portfolio logo" />
      <NavList />
      <ContactMeBtn />
    </div>
  );
};

export default MainNav;
