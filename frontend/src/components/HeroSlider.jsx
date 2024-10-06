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
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="relative hero-slider w-full max-w-7xl mx-auto">
      <Slider {...settings} >
        <div className='relative'>
          <img src="../fc-25.jpg" alt="" className='w-full object-cover h-[80vh]'/>
          <div className='absolute top-10 text-white font-bold p-4 mt-8 ml-8 rounded'>
              <h4 className='bg-yellow-500 w-fit uppercase text-black rounded-sm mb-4'>Available now</h4>
              <h1 className='text-[60px]'>EA SPORTS</h1>
              <h1 className='text-[60px]'>FC 25</h1>
              <h3>Team up with friends and win</h3>
            <button className='bg-yellow-500 text-black uppercase py-1 px-5 rounded-sm mt-10'>Get it now</button>
          </div>

          </div>
        <div><img src="../nwxbx.jpg" alt="" className='w-full  object-cover h-[80vh]'/></div>
        <div><img src="../herocodp.jpg" alt="" className='w-full object-cover h-[80vh]'/></div>
      </Slider>
    </div>
  )
}

export default HeroSlider;