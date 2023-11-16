import React from "react";
import Logo from "../../assets/logo.svg";
import { NavLink } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import { UilUser } from "@iconscout/react-unicons";

const data = [
  {
    text: "products",
    link: "/products",
  },
  {
    text: "Community",
    link: "/community",
  },
  {
    text: "market",
    link: "/market",
  },
  {
    text: "news",
    link: "/news",
  },
  {
    text: "more",
    link: "/more-features",
  },
];
const GNavbar = () => {
  return (
    <div className="bg-[#BC9405]/60 backdrop-blur-md w-full flex items-center justify-center shadow-md h-14">
      <div className="w-[80%]">
        <div className="flex w-full h-full  justify-between items-center">
          <div>
            <img src={Logo} alt="Logo Market Version" className="w-[70px]" />
          </div>
          <div>
            <nav>
              <nav className="flex flex-row gap-10">
                {data.map(({ link, text }, idx) => {
                  return (
                    <NavLink
                      key={idx}
                      to={link}
                      className={
                        "capitalize hover:font-semibold transition-colors text-base text-white font-medium"
                      }
                    >
                      {text}
                    </NavLink>
                  );
                })}
              </nav>
            </nav>
          </div>
          <div className="flex gap-4 justify-center items-center">
            <UilUser className="text-white" />
            <Button className="font-medium capitalize rounded-full px-8">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GNavbar;
