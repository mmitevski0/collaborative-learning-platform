import React from "react";
import { FaHome, FaSearch, FaList, FaBook, FaGrin } from "react-icons/fa";

const Navigation: React.FC = () => {
  return (
    <div className="w-80 h-full bg-white shadow-lg p-6">
      {/* Heading */}
      <h1 className="text-3xl text-blue-500 mb-8 whitespace-nowrap">
        School AI ChatBot
      </h1>

      {/* Discover Section */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Discover</h2>
        <ul className="space-y-4">
          {/* Home */}
          <li className="flex items-center text-gray-600 hover:text-blue-500 cursor-pointer">
            <FaHome className="mr-3 text-black" />
            Home
          </li>
          {/* Search */}
          <li className="flex items-center text-gray-600 hover:text-blue-500 cursor-pointer">
            <FaSearch className="mr-3 text-black" />
            Search
          </li>
        </ul>
      </div>

      {/* Library Section */}
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Library</h2>
        <ul className="space-y-4">
          {/* Chats */}
          <li className="flex items-center text-gray-600 hover:text-blue-500 cursor-pointer">
            <FaList className="mr-3 text-black" />
            Chats
          </li>
          {/* Quiz Generator */}
          <li className="flex items-center text-gray-600 hover:text-blue-500 cursor-pointer">
            <FaBook className="mr-3 text-black" />
            Quiz Generator
          </li>
          {/* Favorites */}
          <li className="flex items-center text-gray-600 hover:text-blue-500 cursor-pointer">
            <FaGrin className="mr-3 text-black" />
            Favorites
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navigation;