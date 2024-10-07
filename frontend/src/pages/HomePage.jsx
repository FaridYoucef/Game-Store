import React from 'react'
import HeroSlider from '../components/HeroSlider'
import LogoSet from '../components/LogoSet'
import Trending from '../components/Trending.jsx'

const HomePage = () => {
  return (
    <div>
        <HeroSlider />
        <LogoSet />
        <Trending />
    </div>  
  )
}

export default HomePage;