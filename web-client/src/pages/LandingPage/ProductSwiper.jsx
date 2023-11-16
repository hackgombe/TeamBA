import React from "react";
import { formatToNaira } from "../../utils";

export const ProductSwiper = () => {
  const data = [
    {
      name: "Maize",
      price: 20000,
      prev_value: 30000,
    },
    {
      name: "Rice",
      price: 40000,
      prev_value: 40000,
    },
    {
      name: "Tomatoes",
      price: 2000,
      prev_value: 3000,
    },
    {
      name: "Beans",
      price: 25000,
      prev_value: 3000,
    },
  ];
  return (
    <div className="grid grid-cols-4 gap-5">
      {data.map((item, idx) => {
        return <SingleCard {...item} key={idx} />;
      })}
    </div>
  );
};

export const SingleCard = ({ name, price, prev_value, tableUse = false }) => {
  const [active, setActive] = React.useState("maize");
  const randomColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
    Math.random() * 256
  )}, ${Math.floor(Math.random() * 256)})`;

  function getContrastingTextColor(bgColor) {
    // Calculate the luminance of the background color
    const luminance =
      (0.299 * bgColor[0] + 0.587 * bgColor[1] + 0.114 * bgColor[2]) / 255;

    // Choose white or black based on the luminance
    return luminance > 0.5 ? "text-black" : "text-white";
  }

  return (
    <div
      className={`p-5 flex items-center gap-4 rounded-lg  bg-white ${
        // eslint-disable-next-line react/prop-types
        !tableUse && active === name.toLowerCase()
          ? "shadow-2xl"
          : "shadow-none"
      }`}
    >
      <div
        onClick={() => setActive(name.toLowerCase())}
        style={{
          backgroundColor: randomColor,
        }}
        className={`uppercase cursor-pointer ${getContrastingTextColor(
          randomColor
        )} rounded-full ${
          !tableUse ? "" : ""
        } w-[50px] h-[50px] flex items-center justify-center`}
      >
        {name[0] + name[2]}
      </div>
      <div className="leading-9">
        <h6>{name}</h6>
        <p className="flex text-sm justify-between items-center gap-5">
          <span>{formatToNaira(price)} (per bag)</span>
          {!tableUse && (
            <span
              className={price > prev_value ? "text-green-500" : "text-red-500"}
            >
              {" "}
              {(((price - prev_value) / prev_value) * 100).toFixed(2)}%
            </span>
          )}
        </p>
      </div>
    </div>
  );
};
