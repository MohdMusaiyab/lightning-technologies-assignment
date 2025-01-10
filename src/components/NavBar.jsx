import React from "react";

const Navbar = () => {
  return (
    <header className="bg-white ">
      <div className="container mx-auto px-6  flex items-center justify-between">
        {/* Center Section: Springfield Media */}
        <div className="flex-1 flex justify-center">
          <h1 className="bg-[#00AEEF] text-white px-6 py-2 rounded-b-3xl text-lg font-bold shadow-md w-[443px] h-[50px] text-center">
            Springfield Media
          </h1>
        </div>

        {/* Right Section: Search and Profile */}
        <div className="flex items-center space-x-4">
          {/* Search Icon */}
          <div className="bg-gray-100 p-2 rounded-full shadow-md hover:bg-gray-200 cursor-pointer">
            <button className="text-gray-500 hover:text-gray-700 focus:outline-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35m1.55-3.2A7.5 7.5 0 1010.5 16.5a7.5 7.5 0 007.7-7.7m-3.7 10.9a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </button>
          </div>

          {/* Profile */}
          <div className="bg-gray-100 p-2 rounded-full shadow-md hover:bg-gray-200 cursor-pointer flex items-center space-x-2">
            <img
              src="/assets/profile.jpg" // Replace with your profile image path
              alt="User"
              className="h-8 w-8 rounded-full object-cover"
            />
            <div className="relative">
              <button className="text-gray-700 focus:outline-none hover:text-gray-900 flex items-center">
                Evan Yates
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
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
