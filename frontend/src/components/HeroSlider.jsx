import React from 'react'
import Slider from 'react-slick'; 
import { PrevArrow, NextArrow } from './CustomArrows.jsx';

function HeroSlider() {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    autoplay: false,
    autoplaySpeed: 3000,
  };

  return (
    <div className="relative hero-slider w-full max-w-7xl mx-auto">
      <Slider {...settings} >
        <div className='relative'>
          <img src="../fc-25.jpg" alt="" className='w-full object-cover object-center h-[80vh]'/>
          <div className='absolute top-10 text-white font-bold p-4 mt-8 ml-8 rounded '>
              <h4 className='bg-yellow-500 w-fit uppercase text-black rounded-sm mb-4 text-[10px] md:text-[12px] lg:text-[15px]'>Available now</h4>
              <h1 className='text-lg md:text-3xl lg:text-5xl font-bold'>EA SPORTS</h1>
              <h1 className='text-lg md:text-3xl lg:text-5xl font-bold'>FC 25</h1>
              <h3 className='text-sm md:text-lg lg:text-xl'>Team up with friends and win</h3>
            <button className='bg-yellow-500 text-black uppercase lg:py-1 lg:px-5 rounded-sm mt-10 md:py-0.5 md:px-3'>Get it now</button>
          </div>

          </div>
        <div><img src="../nwxbx.jpg" alt="" className='w-full  object-cover h-[80vh]'/></div>
        <div><img src="../herocodp.jpg" alt="" className='w-full object-cover h-[80vh]'/></div>
      </Slider>
    </div>
  )
}

export default HeroSlider;