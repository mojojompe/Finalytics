import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AOS from 'aos';

// Pages
import Newsfeed from './pages/Newsfeed';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
import Comparison from './pages/Comparison';
import Settings from './pages/Settings';

// Components
import Sidebar from './components/Sidebar';

function App() {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
            easing: 'ease-in-out',
        });
    }, []);

    return (
        <Router>
            <div className="flex min-h-screen bg-dark text-light font-sans">
                <Routes>
                    <Route path="/" element={<Newsfeed />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />

                    <Route path="/dashboard" element={
                        <div className="flex w-full">
                            <Sidebar />
                            <main className="flex-1 p-4 md:p-8 overflow-y-auto h-screen">
                                <Dashboard />
                            </main>
                        </div>
                    } />

                    <Route path="/comparison" element={
                        <div className="flex w-full">
                            <Sidebar />
                            <main className="flex-1 p-4 md:p-8 overflow-y-auto h-screen">
                                <Comparison />
                            </main>
                        </div>
                    } />

                    <Route path="/settings" element={
                        <div className="flex w-full">
                            <Sidebar />
                            <main className="flex-1 p-4 md:p-8 overflow-y-auto h-screen">
                                <Settings />
                            </main>
                        </div>
                    } />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
