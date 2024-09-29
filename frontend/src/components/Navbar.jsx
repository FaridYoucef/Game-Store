import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { SlBasket } from "react-icons/sl";
import { FaSignInAlt } from "react-icons/fa";
import axios from "axios";
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    //Fetch navbar data from the backend
    const fetchNavbarData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/navbar-data/"
        );
        console.log(response.data);
        setCategories(response.data.categories);
        // setIsAutenticated(response.data.is_authenticated);
      } catch (error) {
        console.error("Failed to fetch navbar data", error);
      }
    };
    fetchNavbarData();
  }, []);

  return (
    <nav className="bg-white-800 p-3 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-black text-2xl font-bold ml-4">
          <a href="/">GameK</a>
        </div>

        <div className="border-l-2 border-gray-800 h-8 mx-1"></div>

        {/* Menu Links */}
        <div>
          <ul className="flex space-x-5 text-black font-medium">
            {categories.map((category) => (
              <Link key={category.slug} to={`/categories/${category.slug}`}>
                {category.name}
              </Link>
            ))}
          </ul>
        </div>

        {/* Right Section: Search, Basket, and Sign-In */}
        <div className="flex items-center space-x-4 mr-5">
          <div className="flex items-center rounded-full px- py-1">
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

          <a href="/signin">
            <FaSignInAlt />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
