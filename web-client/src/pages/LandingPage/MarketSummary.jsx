import { Button } from "@material-tailwind/react";
import React from "react";
import { ProductSwiper } from "./ProductSwiper";

const MarketSummary = () => {
  const [active, setActive] = React.useState("beans");
  return (
    <div className="mt-8 py-16 bg-white px-10">
      <h2 className="font-semibold text-4xl">Market Summary&gt; </h2>
      <div className="mt-8 flex gap-5">
        {["beans", "rice", "tomatoes", "maize"].map((item, idx) => {
          return (
            <Button
              onClick={() => setActive(item)}
              className={`bg-white capitalize shadow-none 
            transition-opacity
                  ${active === item ? "bg-green-50 opacity-100" : "opacity-80"}
                  hover:bg-green-50 hover:shadow-sm hover:animate-pulse font-medium text-black`}
              key={idx}
            >
              {item}
            </Button>
          );
        })}
      </div>

      <div className="mt-10">
        <ProductSwiper />
      </div>
    </div>
  );
};

export default MarketSummary;
