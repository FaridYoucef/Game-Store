import React from 'react'
import HeroSlider from '../components/HeroSlider'
import LogoSet from '../components/LogoSet'
import Trending from '../components/Trending.jsx'
import PcDeals from '../components/PcDeals.jsx'
import GearShop from '../components/GearShop.jsx'
import Footer from '../components/Footer.jsx'

const HomePage = () => {
  return (
    <div>
        <HeroSlider />
        <LogoSet />
        <Trending />
        <PcDeals />
        <GearShop />
        <Footer />
    </div>  
  )
}

export default HomePage;