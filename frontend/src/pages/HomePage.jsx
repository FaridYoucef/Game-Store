import React from 'react'
import HeroSlider from '../components/HeroSlider'
import LogoSet from '../components/LogoSet'
import Trending from '../components/Trending.jsx'
import PcDeals from '../components/PcDeals.jsx'

const HomePage = () => {
  return (
    <div>
        <HeroSlider />
        <LogoSet />
        <Trending />
        <PcDeals />
    </div>  
  )
}

export default HomePage;