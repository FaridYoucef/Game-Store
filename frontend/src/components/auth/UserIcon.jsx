import React, { useEffect, useState } from 'react';
import api from "../../api";
import { ACCESS_TOKEN } from "../../constant"; 
import getCookie from '../../getCookie';

const UserIcon = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem(ACCESS_TOKEN);
      if (!token) {
        setIsAuthenticated(false);
        return; 
      }

      try {
        const response = await api.get('/user/profile/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data && response.data.user) {
          setUserInfo(response.data.user);
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
        setIsAuthenticated(false);
        alert('Error fetching user info. Please try again.'); 
      }
    };

    fetchUserInfo();
  }, []);

  const handleLogout = async () => {
    try {
      const csrfToken = getCookie("csrftoken"); 
      await api.post('/user/logout/', {}, {
        headers: {
          "X-CSRFToken": csrfToken, 
        },
      });
      alert('Logged out successfully');
      setUserInfo(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Error logging out:', error.response || error);
      alert('Error logging out. Please try again.');
    }
  };
  

  return (
    <div className="relative inline-block text-left">
      {userInfo ? (
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
      ) : (
        <button
         
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Sign In
        </button>
      )}

      {dropdownOpen && isAuthenticated && (
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
  );
};

export default UserIcon;
