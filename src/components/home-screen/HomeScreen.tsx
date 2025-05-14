import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar';

const HomeScreen: React.FC = () => {
    return (
        <div className="h-screen">
            <Sidebar />
            <main className="min-h-screen bg-gray-50 p-6" style={{ marginLeft: '15%'}}>
                <Outlet />
            </main>
        </div>
    );
};

export default HomeScreen;
