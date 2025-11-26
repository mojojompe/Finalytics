import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getMarketNews } from '../api/news';
import type { NewsItem } from '../api/news';
import { FaArrowRight, FaChartLine, FaNewspaper } from 'react-icons/fa';
import Button from '../components/UI/Button';

const Newsfeed: React.FC = () => {
    const [news, setNews] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const data = await getMarketNews('general');
                if (!data || data.length === 0) {
                    setNews([
                        {
                            uuid: '1',
                            title: "Market Rally Continues as Tech Stocks Surge",
                            description: "The S&P 500 hit a new record high today driven by strong earnings from major tech companies.",
                            url: "#",
                            imageUrl: "https://images.unsplash.com/photo-1611974765270-ca1258634369?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
                            source: "Financial Times",
                            publishedAt: new Date().toISOString(),
                            keywords: "",
                            snippet: ""
                        },
                        {
                            uuid: '2',
                            title: "Fed Signals Potential Rate Cuts Later This Year",
                            description: "Federal Reserve officials hinted that inflation data is moving in the right direction.",
                            url: "#",
                            imageUrl: "https://images.unsplash.com/photo-1526304640152-d4619684e484?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
                            source: "Bloomberg",
                            publishedAt: new Date().toISOString(),
                            keywords: "",
                            snippet: ""
                        },
                        {
                            uuid: '3',
                            title: "Crypto Markets Volatile Amid Regulatory News",
                            description: "Bitcoin and Ethereum saw sharp price swings following new SEC announcements.",
                            url: "#",
                            imageUrl: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1469&q=80",
                            source: "CoinDesk",
                            publishedAt: new Date().toISOString(),
                            keywords: "",
                            snippet: ""
                        }
                    ]);
                } else {
                    setNews(data);
                }
            } catch (error) {
                console.error("Failed to load news", error);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    return (
        <div className="min-h-screen bg-dark text-light overflow-x-hidden">
            {/* Hero Section */}
            <div className="relative h-[60vh] flex items-center justify-center bg-gradient-to-b from-secondary to-dark overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1642543492481-44e81e3914a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center" />
                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto" data-aos="fade-up">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-500">
                        Finalytics
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-300 mb-8">
                        Master the market with AI-powered insights and real-time analysis.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/signup">
                            <Button variant="primary" className="w-full sm:w-auto text-lg px-8 py-3">
                                Get Started <FaArrowRight />
                            </Button>
                        </Link>
                        <Link to="/login">
                            <Button variant="secondary" className="w-full sm:w-auto text-lg px-8 py-3">
                                Login
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* News Section */}
            <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="flex items-center justify-between mb-10" data-aos="fade-right">
                    <h2 className="text-3xl font-bold flex items-center gap-3">
                        <FaNewspaper className="text-accent" /> Market News
                    </h2>
                    <div className="flex gap-2">
                        <Button variant="ghost" size="sm">Top Stories</Button>
                        <Button variant="ghost" size="sm">Crypto</Button>
                        <Button variant="ghost" size="sm">Tech</Button>
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {news.map((item, index) => (
                            <div
                                key={item.uuid || index}
                                className="bg-secondary rounded-xl overflow-hidden border border-slate-700 hover:border-accent transition-all duration-300 group"
                                data-aos="fade-up"
                                data-aos-delay={index * 100}
                            >
                                <div className="h-48 overflow-hidden relative">
                                    <img
                                        src={item.imageUrl || 'https://via.placeholder.com/400x200?text=News'}
                                        alt={item.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute top-4 right-4 bg-dark/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-accent border border-accent/20">
                                        {item.source}
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-accent transition-colors">
                                        {item.title}
                                    </h3>
                                    <p className="text-slate-400 text-sm mb-4 line-clamp-3">
                                        {item.description}
                                    </p>
                                    <div className="flex justify-between items-center mt-auto">
                                        <span className="text-xs text-slate-500">
                                            {new Date(item.publishedAt).toLocaleDateString()}
                                        </span>
                                        <a
                                            href={item.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-accent text-sm font-semibold hover:underline flex items-center gap-1"
                                        >
                                            Read More <FaArrowRight size={12} />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Features Teaser */}
            <div className="bg-secondary/30 py-20 border-t border-slate-800">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                        <div data-aos="fade-up" data-aos-delay="0">
                            <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-accent">
                                <FaChartLine size={32} />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Real-time Analytics</h3>
                            <p className="text-slate-400">Live market data and interactive charts to track your favorite stocks.</p>
                        </div>
                        <div data-aos="fade-up" data-aos-delay="100">
                            <div className="w-16 h-16 bg-success/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-success">
                                <FaArrowRight size={32} className="-rotate-45" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">AI Predictions</h3>
                            <p className="text-slate-400">Advanced algorithms provide price targets and trend analysis.</p>
                        </div>
                        <div data-aos="fade-up" data-aos-delay="200">
                            <div className="w-16 h-16 bg-warning/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-warning">
                                <FaNewspaper size={32} />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Curated News</h3>
                            <p className="text-slate-400">Stay ahead with personalized news feeds and market updates.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Newsfeed;
