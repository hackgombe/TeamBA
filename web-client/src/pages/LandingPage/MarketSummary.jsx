import LineChartWithFill from "../../components/LineChartWithFill"
import { ProductSwiper } from "./ProductSwiper"
import { UilAngleRight } from "@iconscout/react-unicons"

const chartData = {
  labels: ["January", "February", "March", "April", "May"],
  datasets: [
    {
      label: "Sales Data",
      data: [65, 59, 80, 81, 56],
      // Other dataset options...
    },
  ],
};

const MarketSummary = () => {
  return (
    <div className="mt-8 py-16 bg-white px-10">
      <h2 className="font-semibold text-4xl flex items-center gap-2">Market Summary<span><UilAngleRight /></span> </h2>

      <div className="mt-14">
        <div>
          <ProductSwiper />
        </div>
      </div>

      <div className="mt-8">
        <LineChartWithFill />
      </div>
    </div>
  );
};

export default MarketSummary;
