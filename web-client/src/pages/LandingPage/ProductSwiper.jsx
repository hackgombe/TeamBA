// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

export const ProductSwiper = () => {
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={3}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
    >
      <SwiperSlide>
        <SingleCard />
      </SwiperSlide>{" "}
      <SwiperSlide>
        <SingleCard />
      </SwiperSlide>{" "}
      <SwiperSlide>
        <SingleCard />
      </SwiperSlide>{" "}
      <SwiperSlide>
        <SingleCard />
      </SwiperSlide>{" "}
      <SwiperSlide>
        <SingleCard />
      </SwiperSlide>{" "}
      <SwiperSlide>
        <SingleCard />
      </SwiperSlide>{" "}
      <SwiperSlide>
        <SingleCard />
      </SwiperSlide>{" "}
      <SwiperSlide>
        <SingleCard />
      </SwiperSlide>
    </Swiper>
  );
};

const SingleCard = () => {
  return (
    <div className="p-5 flex gap-4 rounded-lg shadow bg-white">
      <div></div>
      <div></div>
    </div>
  );
};
