import React, { useEffect, useState } from "react";
import './Sidebar.css';
import { useNavigate, useLocation } from "react-router-dom";
import { Home, Search, List, FileText, Smile, LogOut } from 'lucide-react';

interface UserData {
  name: string;
  picture: string;
}
declare global {
  interface Window {
    google: any;
  }
}

const Sidebar: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const userDataString = localStorage.getItem('user');
    if (userDataString) {
      const parsedData = JSON.parse(userDataString);
      setUserData({
        name: parsedData.name,
        picture: parsedData.picture
      });
    }
  }, []);

  if (!userData) {
    return <div>Loading...</div>;
  }

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside className="Sidebar">
      <div className="Sidebar-content">
        <h1 className="Sidebar-title">School AI ChatBot</h1>
        <div className="Sidebar-displayUserLogged">
          <span>Hello, {userData.name}</span>
          <img src={userData?.picture} alt="Profile" />
        </div>

        <div className="Sidebar-sectionTitle">Discover</div>
        <div className="Sidebar-navList">
          <div className="Sidebar-navItem">
            <button
              onClick={() => navigate('/home')}
              className={`Sidebar-navLink ${isActive('/home') ? 'Sidebar-active' : ''}`}
            >
              <Home className="Sidebar-icon" />
              Home
            </button>
          </div>
          <div className="Sidebar-navItem">
            <button className="Sidebar-navLink">
              <Search className="Sidebar-icon" />
              Search
            </button>
          </div>
        </div>

        <div className="Sidebar-sectionTitle">Library</div>
        <div className="Sidebar-libraryList">
          <div className="Sidebar-libraryItem">
            <button
              onClick={() => navigate('/home/chats')}
              className={`Sidebar-navLink ${isActive('/home/chats') ? 'Sidebar-active' : ''}`}
            >
              <List className="Sidebar-icon" />
              Chats
            </button>
          </div>
          <div className="Sidebar-libraryItem">
            <button
              onClick={() => navigate('/home/quiz')}
              className={`Sidebar-navLink ${isActive('/home/quiz') ? 'Sidebar-active' : ''}`}
            >
              <FileText className="Sidebar-icon" />
              Quiz Generator
            </button>
          </div>
          <div className="Sidebar-libraryItem">
            <button className="Sidebar-navLink">
              <Smile className="Sidebar-icon" />
              Favorites
            </button>
          </div>
        </div>
        <div className="Sidebar-logout">
          <button
            onClick={() => {
              localStorage.removeItem('user');

              if (window.google) {
                window.google.accounts.id.disableAutoSelect();
              }

              navigate('/');
            }}
            className="Sidebar-navLink"
          >
            <LogOut className="Sidebar-icon" />
            <b>Logout</b>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;