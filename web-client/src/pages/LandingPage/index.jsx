import { Button } from "@material-tailwind/react";
import { StickyNavbar } from "../../components/Navabar";
import { UilSearch } from "@iconscout/react-unicons";
// import HeroStat from "../../assets/hero-chart.png";
import MInput from "../../components/ui/MInput";
import MarketSummary from "./MarketSummary";
import Modal from "../../components/modal";
import React from "react";
import Table from "../../components/ui/Table";
import { productsSearch } from "./data";
import { SingleCard } from "./ProductSwiper";
import { formatToNaira } from "../../utils";
import GradientLineChart from "./GradientLineChart";

const LandingPage = () => {
  return (
    <div>
      <StickyNavbar />
      {/* Hero Section */}
      <Hero />
      <Commodities />
      <MarketSummary />
      <div className="w-[70%] mx-auto">
        <GradientLineChart />
      </div>
    </div>
  );
};
const Commodities = () => {
  const ModalRef = React.useRef(null);
  return (
    <div className="py-10 w-full bg-black">
      <div className="mt-16 flex flex-col items-center justify-center">
        <h2 className="text-white text-center w-[50%] leading-[74px] text-6xl font-extrabold">
          Commodity Track Essential Goods Forecast
        </h2>
        <p className="text-white w-[65%] text-center mt-8 text-sm">
          Commodity Track: Essential Goods Forecast - Unveiling the Next Wave in
          Trading Excellence with Precise Forecasts, Essential Insights, and
          Comprehensive Market Analysis
        </p>
        <div className="my-16">
          <Button
            variant="outlined"
            className="text-white px-6 py-4 border-white"
          >
            Explore Market
          </Button>
        </div>
      </div>

      <div className="my-8 flex items-center justify-center w-full ">
        <div className="w-[90%] flex justify-center">
          <MInput placeholder="what are you looking for?" />
        </div>
      </div>

      <Modal ref={ModalRef}></Modal>
    </div>
  );
};

const Hero = () => {
  const ModalRef = React.useRef(null);
  const [activeBtn, setActiveBtn] = React.useState("all");

  const [active, setActive] = React.useState("commodities");
  return (
    <div className="hero-img grid grid-cols-12 place-items-center h-screen w-full">
      <div className="col-span-6 flex flex-col gap-10 w-[80%] mx-auto">
        <h2 className="text-white font-bold text-6xl ">
          Vision / <br className="mb-4" />
          Then decide
        </h2>

        <div className="flex flex-col gap-10">
          <div>
            <div onClick={() => ModalRef.current.openModal()}>
              <div className="w-[50%] h-[60px] flex items-center rounded-full bg-white px-4 gap-4 cursor-pointer">
                <span className="text-gray-400">
                  <UilSearch />
                </span>
                <span>Search the Market here</span>
              </div>
            </div>
          </div>
          <div>
            <div className="w-[85%] mt-4 flex items-center gap-4">
              <HeroStat initial="MZ" commodity="Maize" value={8.4} />
              <HeroStat initial="RC" commodity="Rice" value={6.33} />
              <HeroStat initial="BN" commodity="Beans" value={0.0} />
            </div>
          </div>
        </div>
      </div>
      <Modal ref={ModalRef}>
        <div className="p-1 ">
          <div className="flex  gap-4 items-center ">
            {["commodities", "products", "Top Sellers"].map((item, idx) => (
              <Button
                key={idx}
                onClick={() => {
                  setActive(item.toLowerCase());
                }}
                className={`capitalize ${
                  active === item.toLowerCase()
                    ? "border-b-4 border-black"
                    : "border-white border-b-4"
                } rounded-none   py-4 hover:shadow-none bg-white font-semibold text-black text-base  shadow-none`}
              >
                {item}
              </Button>
            ))}
          </div>
          <div className="mt-7  flex gap-10">
            {["all", "In-Demand"].map((item, idx) => (
              <Button
                key={idx}
                className={`px-8 rounded-3xl  shadow-none capitalize ${
                  activeBtn === item.toLowerCase()
                    ? ""
                    : "bg-white shadow-none text-black border "
                }`}
              >
                {item}
              </Button>
            ))}
          </div>

          <div className="mt-5">
            <Table
              data={productsSearch.map((item) => {
                return {
                  "": (
                    <SingleCard
                      price={item["Current value"]}
                      tableUse={true}
                      name={item.Item}
                    />
                  ),
                  ...item,
                  ["Current value"]: formatToNaira(item["Current value"]),
                  High: formatToNaira(item.High),
                  Low: formatToNaira(item.Low),
                  Change: (
                    <span
                      className={`${
                        item.Change < 1 ? "text-red-500" : "text-green-500"
                      }`}
                    >
                      {item.Change.toFixed(2)}
                    </span>
                  ),
                };
              })}
            ></Table>
          </div>
        </div>
      </Modal>
    </div>
  );
};

const HeroStat = ({ initial = "", commodity = "", value = 0 }) => {
  const textStyle =
    value == 0
      ? "text-white"
      : value > 0 && value <= 7
      ? "text-green-400"
      : "text-[#BC9405]";

  return (
    <>
      <div className="w-full h-[50px] rounded-full p-2 bg-black/40 backdrop-blur-md flex items-center gap-3">
        <div className="w-[35px] h-[35px] rounded-full bg-[#BC9405] flex items-center justify-center font-bold text-white text-sm">
          {initial}
        </div>
        <div className="">
          <p className="text-white font-bold">{commodity}</p>
          <p className={`${textStyle} text-sm`}>+{value.toFixed(2)}%</p>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
