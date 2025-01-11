import React from "react";
import { Menu, Settings, User } from "lucide-react";

import logo from "./../assets/Logo-transperent-long-updated 1.svg";
import lady from "./../assets/illustration.png";

const Sidebar = () => {
  const menuItems = [
    { id: 1, label: "Dashboard", icon: <Menu /> },
    { id: 2, label: "Menu 1", icon: <Menu /> },
    { id: 3, label: "Menu 2", icon: <Menu /> },
    { id: 4, label: "Menu 3", icon: <Menu /> },
    { id: 5, label: "Admin Panel", icon: <Settings /> },
  ];

  return (
    <aside className="bg-white w-64 h-screen shadow-md flex flex-col">
      <div className="p-6 flex items-center space-x-2">
        <img src={logo} alt="Logo" className="h-[54px] w-[174px]" />
      </div>

      <nav className="flex-1 px-4 mt-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <a
                href="#"
                className={`flex items-center px-4 py-2 rounded-lg text-gray-700 hover:bg-blue-100 ${
                  item.active ? "bg-blue-500 text-white" : ""
                }`}
              >
                <div className="w-6 h-6 flex justify-center items-center mr-4">
                  {item.icon}
                </div>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="relative p-4 mt-8 flex justify-center items-end h-3/4 w-3/4 mx-auto">
        <div className="absolute bottom-0 w-full h-4/5 bg-[#3F8CFF] rounded-t-lg" />
        <div className="relative z-10 flex flex-col items-center">
          <img
            src={lady}
            alt="Contact Lady Working on Laptop"
            className="h-auto w-full object-contain"
          />
          <button className="mt-4 mb-4 px-6 py-2 bg-[#00AEEF] text-white rounded-lg shadow-md hover:bg-blue-600">
            Support
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
