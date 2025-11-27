import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import AOS from 'aos';
import { useAuth } from './hooks/useAuth';
import useUserStore from './stores/useUserStore';

// Pages
import Newsfeed from './pages/Newsfeed';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
// import Dashboard from './pages/Dashboard';
import Comparison from './pages/Comparison';
import Settings from './pages/Settings';
import Legal from './pages/Legal';
import ComingSoon from './pages/ComingSoon';
import MarketNews from './pages/MarketNews';
import Investments from './pages/Investments';

// Components
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { user } = useUserStore();
    const location = useLocation();

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <>{children}</>;
};

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1">
                {children}
            </main>
        </div>
    );
};

import { useState } from 'react';
import { FaBars } from 'react-icons/fa';

const PrivateLayout = ({ children }: { children: React.ReactNode }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex w-full h-screen bg-dark overflow-hidden">
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            <div className="flex-1 flex flex-col h-full overflow-hidden">
                {/* Mobile Header */}
                <div className="md:hidden bg-secondary border-b border-slate-700 p-4 flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-2">
                        <img src="/logo.svg" alt="Finalytics" className="w-8 h-8" />
                        <span className="text-xl font-bold text-white">Finalytics</span>
                    </div>
                    <button onClick={() => setIsSidebarOpen(true)} className="text-white text-2xl">
                        <FaBars />
                    </button>
                </div>

                <main className="flex-1 p-4 md:p-8 overflow-y-auto custom-scrollbar">
                    {children}
                </main>
            </div>
        </div>
    );
};

function App() {
    const { loading } = useAuth(); // Initialize auth listener

    useEffect(() => {
        // AOS.init({
        //     duration: 1000,
        //     once: true,
        //     easing: 'ease-in-out',
        // });
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-dark flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
            </div>
        );
    }

    return (
        <Router>
            <div className="min-h-screen bg-dark text-light font-sans">
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={
                        <PublicLayout>
                            <Newsfeed />
                        </PublicLayout>
                    } />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />

                    {/* Public Content Routes */}
                    <Route path="/legal" element={<Legal />} />
                    <Route path="/coming-soon" element={<ComingSoon />} />

                    {/* Protected Routes */}
                    {/* <Route path="/dashboard" element={
                        <ProtectedRoute>
                            <PrivateLayout>
                                <Dashboard />
                            </PrivateLayout>
                        </ProtectedRoute>
                    } /> */}
                    <Route path="/comparison" element={
                        <ProtectedRoute>
                            <PrivateLayout>
                                <Comparison />
                            </PrivateLayout>
                        </ProtectedRoute>
                    } />
                    <Route path="/market-news" element={
                        <ProtectedRoute>
                            <PrivateLayout>
                                <MarketNews />
                            </PrivateLayout>
                        </ProtectedRoute>
                    } />
                    <Route path="/investments" element={
                        <ProtectedRoute>
                            <PrivateLayout>
                                <Investments />
                            </PrivateLayout>
                        </ProtectedRoute>
                    } />
                    <Route path="/settings" element={
                        <ProtectedRoute>
                            <PrivateLayout>
                                <Settings />
                            </PrivateLayout>
                        </ProtectedRoute>
                    } />

                    {/* Fallback */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
