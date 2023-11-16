import { Button } from "@material-tailwind/react";
import { StickyNavbar } from "../../components/Navabar";
import HeroStat from "../../assets/hero-chart.png";
import MInput from "../../components/ui/MInput";
const LandingPage = () => {
  return (
    <div>
      <StickyNavbar></StickyNavbar>
      {/* Hero Section */}
      <Hero />
      <Commodities />
    </div>
  );
};
const Commodities = () => {
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

      <div className="mt-8">
        <MInput label="Hello" />
      </div>
    </div>
  );
};
const Hero = () => (
  <div className="hero-img grid grid-cols-12 place-items-center  h-screen w-full">
    <div className="px-10 col-span-6 flex flex-col gap-10">
      <h2 className="text-white font-bold text-6xl ">
        Vision / <br className="mb-4" />
        Then decide
      </h2>

      <div className="flex flex-col gap-10">
        <div>
          <></>
          <MInput label="Search now" placeholder="Search for Market here" />
        </div>
        <div>
          <div className="w-[85%]">
            <img src={HeroStat} alt="hero-chart" className="max-w-full"></img>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default LandingPage;
