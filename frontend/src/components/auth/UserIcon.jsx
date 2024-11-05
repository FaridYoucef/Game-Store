import React, { useEffect, useState } from 'react';
import api from "../../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../constant"; 
import { Link, useNavigate } from 'react-router-dom';

const UserIcon = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navigate = useNavigate();

  // Fetch user info when the component mounts
  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      setIsAuthenticated(false);
      return; 
    }

    const fetchUserInfo = async () => {
      try {
        const response = await api.get('/user/profile/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data && response.data.user) {
          setUserInfo(response.data.user);
          setIsAuthenticated(true);
          navigate('/user/profile/update/');
          console.log("User authenticated successfully");
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
        setIsAuthenticated(false);
      }
    };

    fetchUserInfo();
  }, [isAuthenticated]);

  //Logout fonctionality
  const handleLogout = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);

    if (!refreshToken) {
      console.warn('Refresh token not found in localStorage.');
      alert('You are already logged out.');
      return;
    }

    try {
      await api.post('/user/logout/', { REFRESH_TOKEN: refreshToken }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Clear authentication data
      localStorage.removeItem(ACCESS_TOKEN);
      localStorage.removeItem(REFRESH_TOKEN);
      setUserInfo(null);
      setIsAuthenticated(false);
      setDropdownOpen(false);

      alert('Logged out successfully');

      navigate('/user/login');
    } catch (error) {
      console.error('Error logging out:', error);
      alert('Failed to log out. Please try again.');
    }
  };

  return (
    <div className="relative inline-block text-left">
      {isAuthenticated ? (
        <div>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center space-x-2 p-2 bg-gray-200 rounded hover:bg-gray-300"
            aria-haspopup="true"
            aria-expanded={dropdownOpen}
          >
            <img
              src={userInfo?.image || 'https://via.placeholder.com/40'}
              alt="User Avatar"
              className="w-8 h-8 rounded-full"
            />
            <span>{userInfo?.username || 'User'}</span>
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-10">
              <button 
                onClick={handleLogout}
                className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        <Link to="/user/login" className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Sign In
        </Link>
      )}
    </div>
  );
};

export default UserIcon;
