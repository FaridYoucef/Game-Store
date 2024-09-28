import React from 'react'
import { FaSearch } from "react-icons/fa";
import { SlBasket } from "react-icons/sl";
import { FaSignInAlt } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className='bg-white-800 p-3 shadow-lg'>
        <div className="container mx-auto flex items-center justify-between">
            {/* Logo */}
            <div className='text-black text-2xl font-bold ml-4'>
              <a href="/">GameK</a>         
            </div>

            <div className="border-l-2 border-gray-800 h-8 mx-1"></div>

        {/* Menu Links */}
            <ul className='flex space-x-5 text-black font-medium'>
                <li><a href="">Xbox</a></li>
                <li><a href="">Playstation</a></li>
                <li><a href=""></a>Nintendo</li>
                <li><a href=""></a>PC</li>
                <li><a href=""></a>Games</li>
                <li><a href=""></a>Accessories</li>
            </ul>
           
            {/* Right Section: Search, Basket, and Sign-In */}
            <div className='flex items-center space-x-4 mr-5'>
                <div className='flex items-center rounded-full px- py-1'>
                    {/* Search Input */}
                    <input type="text" placeholder='Search' className='border border-gray-300 rounded-lg p-1' />
                  <a>
                    <FaSearch className='ml-2'/>
                  </a> 
                </div>

                <a href="/basket" >
                <SlBasket />
                </a>

                <a href="/signin">
                <FaSignInAlt />
                </a>
        </div> 
            </div>
    </nav> 
   
  )
}

export default Navbar