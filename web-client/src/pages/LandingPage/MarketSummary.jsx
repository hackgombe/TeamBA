import LineChartWithFill from "../../components/LineChartWithFill";
import { ProductSwiper } from "./ProductSwiper";

const MarketSummary = () => {
  return (
    <div className="mt-8 py-16 bg-white px-10">
      <h2 className="font-semibold text-4xl">Market Summary&gt; </h2>

      <div className="mt-14">
        <div>
          <ProductSwiper />
        </div>
      </div>

      <div className="mt-8">
        <LineChartWithFill></LineChartWithFill>
      </div>
    </div>
  );
};

export default MarketSummary;
