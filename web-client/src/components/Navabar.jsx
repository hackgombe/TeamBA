import { NavLink } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import { UilUser } from "@iconscout/react-unicons";
import Logo from "../assets/logo.svg";
export function StickyNavbar() {
  const data = [
    {
      text: "product",
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
    <div className="py-8 fixed flex items-center justify-center w-full h-14">
      <div className="flex w-[90%] h-full  justify-between items-center">
        <div>
          <img src={Logo} alt="Logo Market Version" />
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
          <Button className="font-medium capitalize bg-white text-black">
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
}
