import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./";
import { logo, menu, search, thirdweb } from "../assets";
import { navlinks } from "../constants";
import { useStateContext } from "../context";
const Navbar = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState("dashboard");
  const [toggleDrawer, setToggleDrawer] = useState(false);
  // const address = "0x1234567890123456789012345678901234567890";
  const { connect, address } = useStateContext();
  return (
    <div className="flex md:flex-row flex-col-reverse justify-between gap-6 mb-[35px]">
      <div className="lg:flex-1 flex flex-row max-w-[458px] rounded-[15px] py-2 pl-4 pr-2 h-[52px] bg-[#1c1c24]">
        <input
          type="text"
          placeholder="Search"
          className="flex w-full font-epilogue font-normal text-[14px] placeholder:text-[#4b5264] text-white bg-transparent outline-none"
        />
        <div className="w-[72px] h-full rounded-[20px] bg-[#4acd8d] flex justify-center items-center curser-pointer">
          <img
            src={search}
            alt="Search"
            className="w-[15px] h-[15px] object-contain"
          />
        </div>
      </div>
      <div className="sm:flex hidden flex-row justify-end gap-4">
        <Button
          btnType="button"
          title={address ? "Create Campaign" : "Connect Wallet"}
          // styles here might need to be changed
          styles={
            address ? "bg-[#1dc071] text-white" : "bg-[#8c6dfd] text-white"
          }
          handleClick={() => {
            if (address) {
              navigate("create-campaign");
            } else {
              connect();
            }
          }}
        />

        <Link to="/profile">
          <div className="w-[52px] h-[52px] rounded-full bg-[#2c2f32] flex justify-center items-center cursor-pointer ">
            <img
              src={thirdweb}
              alt="user"
              className="w-[70%] h-[70%] object-contain "
            />
          </div>
        </Link>
      </div>

      {/* small screen nav */}
      <div className="sm:hidden flex justify-between items-center">
        <div className="w-[40px] h-[40px] rounded-[10px] bg-[#2c2f32] flex justify-center items-center cursor-pointer ">
          <img
            src={thirdweb}
            alt="user"
            className="w-[70%] h-[70%] object-contain "
          />
        </div>
        <img
          src={menu}
          className="w-[34px] h-[34px]  object-contain cursor-pointer "
          onClick={() => setToggleDrawer((prev) => !prev)}
        />
        <div
          className={`absolute top-[60px] right-[0] left-[0] bg-[#1c1c24] z-10 shadow-secondary py-4 
          ${
            !toggleDrawer ? "-translate-y-[100vh]" : "translate-y-[0]"
          } transition-all duration-700 ease-in-out `}
        >
          <ul className="mb-4">
            {navlinks.map((link) => (
              <li
                key={link.name}
                className={`flex p-4 ${
                  active === link.name && "bg-[#3a3a43]"
                } `}
                onClick={() => {
                  setActive(link.name);
                  setToggleDrawer(false);
                  navigate(link.link);
                }}
              >
                <img
                  src={link.imgurl}
                  alt={link.name}
                  className={`w-[24px] h-[24px] object-contain 
                ${
                  active === link.name
                    ? "grayscale-0"
                    : "grayscale filter-invert"
                }
                `}
                />
                <p
                  className={`ml-[20px] font-epilogue font-semibold text-[14px] 
                ${active === link.name ? "text-[#1dc071]" : "text-[#808191]"}
                `}
                >
                  {link.name}
                </p>
              </li>
            ))}
          </ul>
          <div className="flex mx-4 ">
            <Button
              btnType="button"
              title={address ? "Create Campaign" : "Connect Wallet"}
              // styles here might need to be changed
              styles={
                address ? "bg-[#4acd8d] text-white" : "bg-[#1c1c24] text-white"
              }
              handleClick={() => {
                if (address) {
                  navigate("create-campaign");
                } else {
                  connect();
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
