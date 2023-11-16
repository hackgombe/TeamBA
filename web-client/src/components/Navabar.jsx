import { NavLink } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import { UilUser } from "@iconscout/react-unicons";
import Logo from "../assets/logo.svg";
import { useState } from "react";
import { useWinScroll } from "../hooks";
export function StickyNavbar() {
  const [showBg, setShowBg] = useState(!false);

  useWinScroll(
    (oldScrollY, scrollY) => {
      if (scrollY >= 100) {
        setShowBg(true);
      } else {
        setShowBg(false);
      }
    },
    (oldScrollY, scrollY) => {}
  );

  const data = [
    {
      text: "products",
      link: "/product",
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
  return (
    <div
      className={`transition-all py-8 px-4 fixed left-1/2 -translate-x-1/2 flex items-center justify-center w-[90%] mt-4 rounded-full h-14 z-10 ${
        showBg
          ? "bg-[#BC9405]/60 backdrop-blur-md text-black"
          : "bg-transparent"
      }`}
    >
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
          <Button className="font-medium capitalize bg-white text-black rounded-full px-8">
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
}
