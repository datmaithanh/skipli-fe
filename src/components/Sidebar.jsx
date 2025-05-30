import React, { useState } from 'react';
import { FaThLarge, FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState(localStorage.getItem("activeItem") || "services");
  const navigate = useNavigate();

  const handleClick = (item, path) => {
    localStorage.setItem("activeItem", item);
    setActiveItem(item);
    navigate(path);
  };

  return (
    <div className="w-56 h-screen bg-gray-100 p-4">
      <h1 className="text-xl font-semibold mb-6">Skipli AI</h1>
      <div className="flex flex-col space-y-2">
        <div
          onClick={() => handleClick("services", "/service")}
          className={`flex items-center p-2 rounded cursor-pointer ${
            activeItem === "services"
              ? "bg-white text-black shadow"
              : "text-gray-600 hover:bg-white hover:shadow"
          }`}
        >
          <FaThLarge className="mr-3" />
          Services
        </div>

        <div
          onClick={() => handleClick("profile", "/profile")}
          className={`flex items-center p-2 rounded cursor-pointer ${
            activeItem === "profile"
              ? "bg-white text-black shadow"
              : "text-gray-600 hover:bg-white hover:shadow"
          }`}
        >
          <FaUser className="mr-3" />
          Profile
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
