import React from "react";
import './Sidebar.css';
import { NavLink } from "react-router-dom";
import { Home, Search, List, FileText, Smile } from 'lucide-react'; // Icons

const Sidebar: React.FC = () => {
  return (
    <aside className="sidebar">
      <div className="p-6 w-[85%]">
        <h1 className="text-xl  text-indigo-600 mb-8"><b>School AI ChatBot</b></h1>

        <div className="mt-5 ml-2 text-xl font-bold text-gray-500"><h5>Discover</h5></div>
        <ul className="space-y-4 text-sm mt-3 mb-5">
          <li>
            <NavLink to="/home" className={({ isActive }) =>
              `mt-2 flex items-center gap-2 px-2 py-2 rounded-md  ${isActive ? 'bg-gray-100 font-medium text-black' : 'text-gray-600 hover:text-blue-600'}`
            }>
              <Home size={25} />
              Home
            </NavLink>
          </li>
          <li className="flex items-center gap-2 px-2 py-2 rounded-md text-gray-600 hover:text-blue-600">
            <Search size={25} />
            Search
          </li>
        </ul>

        <div className="mb-4 text-sm font-semibold text-gray-500"><h5>Library</h5></div>
        <ul className="space-y-2 text-sm">
          <li className="my-2">
            <NavLink to="/home/chats" className={({ isActive }) =>
              `flex items-center gap-2 my-2 rounded-md ${isActive ? 'bg-gray-100 font-medium text-black' : 'text-gray-600 hover:text-blue-600'}`
            }>
              <List size={25} />
              Chats
            </NavLink>
          </li>
          <li>
            <NavLink to="/home/quiz" className={({ isActive }) =>
              `flex items-center gap-2 rounded-md ${isActive ? 'bg-gray-100 font-medium text-black' : 'text-gray-600 hover:text-blue-600'}`
            }>
              <FileText size={25} />
              Quiz Generator
            </NavLink>
          </li>
          <li className="flex items-center gap-2 px-2 py-2 rounded-md text-gray-600 hover:text-blue-600">
            <Smile size={25} />
            Favorites
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
