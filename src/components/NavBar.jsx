import React, { useState, useEffect, useRef } from "react";

const Navbar = ({ toggleSidebar }) => {
  const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [isNotificationDropdownOpen, setNotificationDropdownOpen] = useState(false);
  const [isMobileSearchOpen, setMobileSearchOpen] = useState(false);
  const dropdownRef = useRef(null);

  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
        setNotificationDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(!isProfileDropdownOpen);
    setNotificationDropdownOpen(false);
  };

  const toggleNotificationDropdown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setNotificationDropdownOpen(!isNotificationDropdownOpen);
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Mobile menu button */}
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          
          <div className="flex-1 flex justify-center lg:justify-center">
            <h1 className="bg-[#00AEEF] text-white px-4 sm:px-6 py-2 rounded-b-3xl text-base sm:text-lg font-bold shadow-md w-full max-w-[300px] sm:max-w-[443px] h-[50px] text-center truncate">
              Springfield Media
            </h1>
          </div>

         
          <div className="flex items-center space-x-2 sm:space-x-4">
         
            <div className={`${isMobileSearchOpen ? 'absolute inset-x-0 top-0 bg-white p-4' : ''} lg:relative`}>
              <div className={`${isMobileSearchOpen ? 'flex' : 'hidden lg:flex'} items-center`}>
                <div className="bg-gray-100 p-2 rounded-lg shadow-md hover:bg-gray-200 cursor-pointer">
                  <button 
                    className="text-gray-500 hover:text-gray-700 focus:outline-none"
                    onClick={() => setMobileSearchOpen(!isMobileSearchOpen)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      className="w-5 h-5 sm:w-6 sm:h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-4.35-4.35m1.55-3.2A7.5 7.5 0 1010.5 16.5a7.5 7.5 0 007.7-7.7m-3.7 10.9a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

         
            <div className="relative" ref={dropdownRef}>
              <div
                onClick={toggleProfileDropdown}
                className="bg-gray-100 p-2 rounded-lg shadow-md hover:bg-gray-200 cursor-pointer flex items-center space-x-2"
              >
                <img
                  src="/assets/profile.jpg"
                  alt="User"
                  className="h-6 w-6 sm:h-8 sm:w-8 rounded-full object-cover"
                />
                <button className="text-gray-700 focus:outline-none hover:text-gray-900 flex items-center">
                  <span className="hidden sm:inline">Evan Yates</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              </div>

         
              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 sm:w-56 bg-white border rounded-lg shadow-lg z-30">
                  {['Profile', 'Notifications', 'Change Firm', 'Settings', 'Help/Support', 'About (Version Info)', 'Logout'].map((item) => (
                    <a
                      key={item}
                      href={`#${item.toLowerCase().replace(/\s/g, '-')}`}
                      className="block px-4 py-2 text-sm sm:text-base text-gray-700 hover:bg-gray-100"
                      onClick={item === 'Notifications' ? toggleNotificationDropdown : undefined}
                    >
                      {item}
                    </a>
                  ))}
                </div>
              )}

         
              {isNotificationDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 sm:w-80 bg-white border rounded-lg shadow-lg z-40">
                  <p className="block px-4 py-2 text-sm sm:text-base text-gray-700 font-bold border-b">
                    Notifications
                  </p>
                  <ul>
                    {[
                      'You Created a New Firm',
                      'New User Registered',
                      'Your Subscription Renewed',
                      'New Update Received'
                    ].map((notification, index) => (
                      <li
                        key={index}
                        className="block px-4 py-2 text-sm sm:text-base text-gray-700 hover:bg-gray-100"
                      >
                        {notification}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;