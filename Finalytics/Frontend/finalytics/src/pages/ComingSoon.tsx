import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/UI/Button';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaRocket } from 'react-icons/fa';

const ComingSoon: React.FC = () => {
    return (
        <div className="min-h-screen bg-dark text-light flex flex-col">
            <Navbar />
            <div className="flex-1 flex flex-col items-center justify-center px-4 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-secondary/20 to-dark" />

                <div className="relative z-10 max-w-2xl">
                    <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-8 text-accent animate-bounce">
                        <FaRocket size={32} />
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
                        Coming Soon
                    </h1>

                    <p className="text-xl text-slate-400 mb-10 leading-relaxed">
                        We're working hard to bring you this feature. Stay tuned for updates as we continue to build the future of financial analytics.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/">
                            <Button variant="primary" className="px-8 py-3">
                                Return Home
                            </Button>
                        </Link>
                        <Link to="/signup">
                            <Button variant="outline" className="px-8 py-3">
                                Join Waitlist
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ComingSoon;
