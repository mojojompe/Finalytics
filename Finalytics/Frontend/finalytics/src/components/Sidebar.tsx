import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaChartLine, FaNewspaper, FaExchangeAlt, FaCog, FaSignOutAlt, FaChartPie, FaTimes } from 'react-icons/fa';
import { useAuth } from '../hooks/useAuth';
import LogoutModal from './LogoutModal';

interface SidebarProps {
    isOpen?: boolean;
    onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen = false, onClose }) => {
    const location = useLocation();
    const { logout } = useAuth();

    const isActive = (path: string) => location.pathname === path;

    const menuItems = [
        { path: '/dashboard', icon: FaChartLine, label: 'Dashboard' },
        { path: '/market-news', icon: FaNewspaper, label: 'Market News' },
        { path: '/investments', icon: FaChartPie, label: 'Investments' },
        { path: '/comparison', icon: FaExchangeAlt, label: 'Comparison' },
        { path: '/settings', icon: FaCog, label: 'Settings' },
    ];

    const [isLogoutModalOpen, setIsLogoutModalOpen] = React.useState(false);

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
                    onClick={onClose}
                />
            )}

            {/* Sidebar Container */}
            <div className={`
                fixed inset-y-0 left-0 z-50 w-64 bg-secondary border-r border-slate-700 flex flex-col transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:h-screen
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div className="p-6 border-b border-slate-700 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <img src="/logo.svg" alt="Finalytics" className="w-8 h-8" />
                        <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-500">
                            Finalytics
                        </h1>
                    </div>
                    {/* Mobile Close Button */}
                    <button onClick={onClose} className="md:hidden text-slate-400 hover:text-white">
                        <FaTimes size={24} />
                    </button>
                </div>

                <nav className="flex-1 p-4 space-y-2 overflow-y-auto custom-scrollbar">
                    {menuItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            onClick={() => onClose && onClose()}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${isActive(item.path) ? 'bg-accent text-dark font-bold shadow-lg shadow-accent/20' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
                        >
                            <item.icon className={isActive(item.path) ? 'text-dark' : 'text-slate-400'} />
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-slate-700">
                    <button
                        onClick={() => setIsLogoutModalOpen(true)}
                        className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-slate-400 hover:text-danger hover:bg-danger/10 transition-colors"
                    >
                        <FaSignOutAlt />
                        Logout
                    </button>
                </div>
            </div>

            <LogoutModal
                isOpen={isLogoutModalOpen}
                onClose={() => setIsLogoutModalOpen(false)}
                onConfirm={logout}
            />
        </>
    );
};

export default Sidebar;
