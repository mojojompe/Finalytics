import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaChartLine, FaNewspaper, FaExchangeAlt, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../hooks/useAuth';

const Sidebar: React.FC = () => {
    const location = useLocation();
    const { logout } = useAuth();

    const isActive = (path: string) => location.pathname === path;

    const menuItems = [
        { path: '/dashboard', icon: FaChartLine, label: 'Dashboard' },
        { path: '/', icon: FaNewspaper, label: 'Newsfeed' },
        { path: '/comparison', icon: FaExchangeAlt, label: 'Comparison' },
        { path: '/settings', icon: FaCog, label: 'Settings' },
    ];

    return (
        <div className="w-64 h-screen bg-secondary border-r border-slate-700 hidden md:flex flex-col">
            <div className="p-6 border-b border-slate-700">
                <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-500">
                    Finalytics
                </h1>
            </div>

            <nav className="flex-1 p-4 space-y-2">
                {menuItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${isActive(item.path) ? 'bg-accent text-dark font-bold shadow-lg shadow-accent/20' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
                    >
                        <item.icon className={isActive(item.path) ? 'text-dark' : 'text-slate-400'} />
                        {item.label}
                    </Link>
                ))}
            </nav>

            <div className="p-4 border-t border-slate-700">
                <button
                    onClick={logout}
                    className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-slate-400 hover:text-danger hover:bg-danger/10 transition-colors"
                >
                    <FaSignOutAlt />
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
