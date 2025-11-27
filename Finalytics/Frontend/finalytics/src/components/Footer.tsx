import React from 'react';
import { Link } from 'react-router-dom';
import { FaTwitter, FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer: React.FC = () => {
    return (
        <footer className="bg-secondary/50 border-t border-slate-800 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand Column */}
                    <div>
                        <Link to="/" className="flex items-center gap-2 mb-6">
                            <img src="/logo.svg" alt="Finalytics" className="w-10 h-10" />
                            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                                Finalytics
                            </span>
                        </Link>
                        <p className="text-slate-400 mb-6 leading-relaxed">
                            Empowering investors with real-time data, AI-driven insights, and professional-grade tools for smarter decision-making.
                        </p>
                        <div className="flex gap-4">
                            {[FaTwitter, FaFacebook, FaInstagram, FaLinkedin].map((Icon, index) => (
                                <a
                                    key={index}
                                    href="#"
                                    className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-accent hover:text-white transition-all duration-300"
                                >
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-bold mb-6">Platform</h3>
                        <ul className="space-y-4">
                            {['Dashboard', 'Market News', 'Stock Screener', 'AI Predictions', 'Portfolio'].map((item) => (
                                <li key={item}>
                                    <Link to={item === 'Dashboard' ? '/dashboard' : '/coming-soon'} className="text-slate-400 hover:text-accent transition-colors">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="text-white font-bold mb-6">Resources</h3>
                        <ul className="space-y-4">
                            {['Help Center', 'Documentation', 'API Reference', 'Market Guide', 'Blog'].map((item) => (
                                <li key={item}>
                                    <Link to="/coming-soon" className="text-slate-400 hover:text-accent transition-colors">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-white font-bold mb-6">Stay Updated</h3>
                        <p className="text-slate-400 mb-4">Subscribe to our newsletter for the latest market insights.</p>
                        <form className="flex flex-col gap-3">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="bg-dark border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors"
                            />
                            <button
                                type="submit"
                                className="bg-accent text-dark font-bold py-3 rounded-lg hover:bg-sky-400 transition-colors"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-slate-500 text-sm">
                        © {new Date().getFullYear()} Finalytics. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-sm text-slate-500">
                        <Link to="/legal" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link to="/legal" className="hover:text-white transition-colors">Terms of Service</Link>
                        <Link to="/legal" className="hover:text-white transition-colors">Cookie Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
