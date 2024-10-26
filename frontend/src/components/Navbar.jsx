import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { SlBasket } from 'react-icons/sl';
import { FaSignInAlt } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';
import axios from 'axios';
import { Link } from 'react-router-dom';
import UserIcon from './auth/UserIcon';

const Navbar = () => {
    const [categories, setCategories] = useState([]);
    const [isOpen, setIsOpen] = useState(false); // State to control the hamburger menu

    useEffect(() => {
        // Fetch navbar data from the backend
        const fetchNavbarData = async () => {
            try {
                const response = await axios.get(
                    'http://127.0.0.1:8000/api/navbar-data/'
                );
                console.log(response.data);
                setCategories(response.data.categories);
            } catch (error) {
                console.error('Failed to fetch navbar data', error);
            }
        };
        fetchNavbarData();
    }, []);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-white p-3 shadow-lg">
            <div className="container mx-auto flex items-center justify-between">
                {/* Logo */}
                <div className="text-black text-2xl font-bold ml-4">
                    <a href="/">GameK</a>
                </div>

                <div className="border-l-2 border-gray-800 h-8 mx-1"></div>

                {/* Hamburger Icon */}
                <div className="md:hidden">
                    <button onClick={toggleMenu} className="focus:outline-none">
                        <GiHamburgerMenu className="text-2xl text-black" />
                    </button>
                </div>

                {/* Menu Links */}
                <div className={`hidden lg:flex lg:space-x-5 text-black font-medium ${isOpen ? "block" : "hidden md:hidden"}`}>
                    <ul className="flex flex-col md:flex-row md:space-x-5">
                        {categories.map((category) => (
                            <li key={category.slug} className="my-2 md:my-0">
                                <Link to={`/categories/${category.slug}`}>
                                    {category.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Right Section: Only visible on mid and larger screens */}
                <div className="hidden md:flex items-center space-x-4 mr-5">
                    <div className="flex items-center rounded-full px-2 py-1">
                        {/* Search Input */}
                        <input
                            type="text"
                            placeholder="Search"
                            className="border border-gray-300 rounded-lg p-1"
                        />
                        <a>
                            <FaSearch className="ml-2" />
                        </a>
                    </div>

                    <a href="/basket">
                        <SlBasket />
                    </a>

                      <UserIcon />                  
                </div>
            </div>

            {/* Mobile Menu Links */}
            <div className={`md:hidden ${isOpen ? "block" : "hidden"}`}>
                <ul className="flex flex-col space-y-2 mt-2">
                    {categories.map((category) => (
                        <li key={category.slug}>
                            <Link to={`/categories/${category.slug}`}>
                                {category.name}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Search and Icons in the Hamburger Menu */}
                <div className="flex flex-col space-y-2 mt-2">
                    <div className="flex items-center rounded-full px-2 py-1">
                        {/* Search Input */}
                        <input
                            type="text"
                            placeholder="Search"
                            className="border border-gray-300 rounded-lg p-1"
                        />
                        <a>
                            <FaSearch className="ml-2" />
                        </a>
                    </div>

                    <a href="/basket" className="flex items-center">
                        <SlBasket />
                        <span className="ml-2">Basket</span>
                    </a>

                    <a href="" className="flex items-center">
                        <UserIcon />
                        <span className="ml-2">Sign In</span>
                    </a>
                </div>
            </div>
        </nav>
    );
};   

export default Navbar;
