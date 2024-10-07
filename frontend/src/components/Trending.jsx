import React from "react";
import Slider from "react-slick";

const Trending = () => {
  // Slider Logic
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4, // Show 4 cards at a time on large screens
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
    centerMode: true,
    centerPadding: "1",
    responsive: [
      {
        breakpoint: 1024, // Below 1024px (tablet and smaller screens)
        settings: {
          slidesToShow: 3, // Show 3 cards at a time
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640, // Below 640px (mobile screens)
        settings: {
          slidesToShow: 2, // Show 2 card at a time
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="mt-20 relative hero-slider w-full mx-auto p-4">
        <h1 className="uppercase md:text-xl lg:text-2xl mb-4">Trending</h1>
      <Slider {...settings}>
        <div className="space-y-4 shadow-lg group">
          <img src="../fc-25.jpg" alt="" 
          className="w-[300px] h-[300px] object-center rounded-t-lg transform transition-transform duration-500 ease-in-out group-hover:scale-110" />
          <h1 className="font-bold">EA Sports FC 25</h1>
          <p className="text-gray-500">More ways to ein fro the club</p>
          <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 md:py-1.5 md:px-4 lg:py-2 lg:px-6rounded ">
            Buy Now
          </button>
        </div>
        <div className="space-y-4  shadow-lg group">
          <img src="../hrytr.jpeg" alt="" className="w-[300px] h-[300px] rounded-t-lg  object-center transform transition-transform duration-500 ease-in-out group-hover:scale-110"/>
          <h1 className="font-bold">EA Sports FC 25</h1>
          <p className="text-gray-500">More ways to ein fro the club</p>
          <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 md:py-1.5 md:px-4 lg:py-2 lg:px-6 rounded">
            Buy Now
          </button>
        </div>
        <div className="space-y-4  shadow-lg group">
          <img src="../diablotr.jpeg" alt="" className="w-[300px] h-[300px] rounded-t-lg  object-center  transform transition-transform duration-500 ease-in-out group-hover:scale-110" />
          <h1 className="font-bold">EA Sports FC 25</h1>
          <p className="text-gray-500">More ways to ein fro the club</p>
          <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 md:py-1.5 md:px-4 lg:py-2 lg:px-6 rounded">
            Buy Now
          </button>
        </div>
      </Slider>
    </div>
  );
};

export default Trending;
