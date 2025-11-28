import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getMarketNews } from '../api/news';
import type { NewsItem } from '../api/news';
import { FaArrowRight, FaChartLine, FaNewspaper, FaFire } from 'react-icons/fa';
import Button from '../components/UI/Button';
import Footer from '../components/Footer';
import NewsModal from '../components/NewsModal';
import CandlestickChart from '../components/CandlestickChart';
import { useStockData } from '../hooks/useStockData';

const Newsfeed: React.FC = () => {
    const [news, setNews] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeFilter, setActiveFilter] = useState('All');

    // Fetch SPY or AAPL data for the Market Overview chart
    const { candles } = useStockData('AAPL');
    const chartData = candles.map(c => ({
        x: new Date(c.t * 1000),
        y: [c.o, c.h, c.l, c.c]
    }));

    useEffect(() => {
        const fetchNews = async () => {
            setLoading(true);
            try {
                // Map 'All' to 'general' or pass empty string if API handles it
                const filterParam = activeFilter === 'All' ? 'general' : activeFilter.toLowerCase();
                const data = await getMarketNews(filterParam);
                setNews(data);
            } catch (error) {
                console.error("Failed to load news", error);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, [activeFilter]);

    const openModal = (item: NewsItem) => {
        setSelectedNews(item);
        setIsModalOpen(true);
    };

    const filters = ['All', 'Crypto', 'Tech', 'Economy'];

    return (
        <div className="min-h-screen bg-dark text-light overflow-x-hidden flex flex-col">
            {/* Hero Section */}
            <div className="relative min-h-[70vh] flex items-center justify-center bg-gradient-to-b from-secondary to-dark overflow-hidden">
                <div className="absolute inset-0 opacity-30 bg-[url('https://images.unsplash.com/photo-1642543492481-44e81e3914a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent" />

                <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-16" data-aos="fade-up">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent mb-8 backdrop-blur-sm">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
                        </span>
                        <span className="text-sm font-bold tracking-wider uppercase">Live Market Data</span>
                    </div>

                    <h1 className="text-6xl md:text-8xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400 tracking-tight">
                        Finalytics
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                        Master the market with AI-powered insights, real-time analysis, and institutional-grade tools.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link to="/signup">
                            <Button variant="primary" className="w-full sm:w-auto text-lg px-10 py-4 shadow-xl shadow-accent/20">
                                Get Started Free <FaArrowRight />
                            </Button>
                        </Link>
                        <Link to="/login">
                            <Button variant="secondary" className="w-full sm:w-auto text-lg px-10 py-4 backdrop-blur-md bg-white/5 border-white/10 hover:bg-white/10">
                                Member Login
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Market Overview Section */}
            <div className="max-w-7xl mx-auto px-4 -mt-20 relative z-20 mb-20">
                <div className="bg-secondary/80 backdrop-blur-xl rounded-2xl border border-slate-700 p-6 shadow-2xl" data-aos="fade-up" data-aos-delay="100">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                        <h2 className="text-2xl font-bold flex items-center gap-3">
                            <FaChartLine className="text-accent" /> Market Overview (AAPL)
                        </h2>
                        <div className="flex gap-2">
                            <span className="text-sm text-slate-400">Live Data</span>
                        </div>
                    </div>
                    <div className="h-[300px] w-full">
                        {chartData.length > 0 ? (
                            <CandlestickChart data={chartData} height={300} />
                        ) : (
                            <div className="h-full flex items-center justify-center text-slate-500">
                                Loading Market Data...
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Trending Ticker */}
            <div className="bg-secondary/50 border-y border-slate-800 py-4 mb-16 overflow-hidden relative">
                <div className="max-w-7xl mx-auto px-4 flex items-center">
                    <div className="flex items-center gap-2 text-accent font-bold whitespace-nowrap bg-secondary/50 pr-6 z-10 relative shadow-[10px_0_20px_-5px_rgba(30,41,59,1)]">
                        <FaFire /> Trending:
                    </div>
                    <div className="flex-1 overflow-hidden relative mask-linear-fade">
                        <div className="flex gap-8 animate-marquee whitespace-nowrap">
                            {['NVDA +4.5%', 'TSLA -1.2%', 'AAPL +0.8%', 'BTC +2.1%', 'ETH +1.5%', 'AMD +3.2%', 'MSFT +0.5%', 'TSLA -1.2%', 'AAPL +0.8%', 'BTC +2.1%', 'ETH +1.5%', 'AMD +3.2%', 'MSFT +0.5%', 'TSLA -1.2%', 'AAPL +0.8%', 'BTC +2.1%', 'ETH +1.5%', 'AMD +3.2%', 'MSFT +0.5%'].map((item, i) => (
                                <span key={i} className={`font-mono font-semibold ${item.includes('+') ? 'text-success' : 'text-danger'}`}>
                                    {item}
                                </span>
                            ))}
                            {['NVDA +4.5%', 'TSLA -1.2%', 'AAPL +0.8%', 'BTC +2.1%', 'ETH +1.5%', 'AMD +3.2%', 'MSFT +0.5%', 'TSLA -1.2%', 'AAPL +0.8%', 'BTC +2.1%', 'ETH +1.5%', 'AMD +3.2%', 'MSFT +0.5%', 'TSLA -1.2%', 'AAPL +0.8%', 'BTC +2.1%', 'ETH +1.5%', 'AMD +3.2%', 'MSFT +0.5%'].map((item, i) => (
                                <span key={`dup-${i}`} className={`font-mono font-semibold ${item.includes('+') ? 'text-success' : 'text-danger'}`}>
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* News Section */}
            <div className="max-w-7xl mx-auto px-4 mb-20" id="market">
                <div className="flex flex-col md:flex-row items-end justify-between mb-10 gap-4" data-aos="fade-right">
                    <div>
                        <h2 className="text-4xl font-bold flex items-center gap-3 mb-2">
                            <FaNewspaper className="text-accent" /> Market Insights
                        </h2>
                        <p className="text-slate-400">Stay ahead with the latest financial news and analysis.</p>
                    </div>
                    <div className="flex gap-2 bg-secondary/50 p-1 rounded-lg border border-slate-700">
                        {filters.map(filter => (
                            <Button
                                key={filter}
                                variant="ghost"
                                size="sm"
                                onClick={() => setActiveFilter(filter)}
                                className={activeFilter === filter ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'}
                            >
                                {filter}
                            </Button>
                        ))}
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
                                className="bg-secondary rounded-2xl overflow-hidden border border-slate-700 hover:border-accent/50 transition-all duration-300 group hover:shadow-2xl hover:shadow-accent/10 flex flex-col h-full"
                                data-aos="fade-up"
                                data-aos-delay={index * 100}
                            >
                                <div className="h-52 overflow-hidden relative cursor-pointer" onClick={() => openModal(item)}>
                                    <img
                                        src={item.imageUrl || 'https://via.placeholder.com/400x200?text=News'}
                                        alt={item.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-secondary via-transparent to-transparent opacity-60" />
                                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white border border-white/10">
                                        {item.source}
                                    </div>
                                </div>
                                <div className="p-6 flex flex-col flex-1">
                                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                                        <span>{new Date(item.publishedAt).toLocaleDateString()}</span>
                                        <span>•</span>
                                        <span className="text-accent">{item.category || 'General'}</span>
                                    </div>
                                    <h3
                                        className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-accent transition-colors cursor-pointer"
                                        onClick={() => openModal(item)}
                                    >
                                        {item.title}
                                    </h3>
                                    <p className="text-slate-400 text-sm mb-6 line-clamp-3 leading-relaxed">
                                        {item.description}
                                    </p>
                                    <div className="mt-auto pt-4 border-t border-slate-800 flex justify-between items-center">
                                        <button
                                            onClick={() => openModal(item)}
                                            className="text-sm font-semibold text-white hover:text-accent flex items-center gap-2 transition-colors group/btn"
                                        >
                                            Read Analysis <FaArrowRight className="group-hover/btn:translate-x-1 transition-transform" size={12} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Pricing Section */}
            <div className="py-24 bg-dark relative" id="pricing">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16" data-aos="fade-up">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">Simple, Transparent Pricing</h2>
                        <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                            Choose the plan that fits your trading style. No hidden fees.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { name: 'Basic', price: 'Free', features: ['Real-time quotes', 'Basic charting', 'Market news', '5 Watchlist items'], color: 'border-slate-700' },
                            { name: 'Pro', price: '$29', period: '/mo', features: ['Everything in Basic', 'AI Price Predictions', 'Advanced Technical Indicators', 'Unlimited Watchlists', 'Priority Support'], color: 'border-accent shadow-2xl shadow-accent/10 scale-105', recommended: true },
                            { name: 'Enterprise', price: 'Custom', features: ['API Access', 'Dedicated Account Manager', 'Custom Reports', 'White-labeling', 'SLA Support'], color: 'border-slate-700' }
                        ].map((plan, idx) => (
                            <div key={idx} className={`bg-secondary/50 rounded-2xl border ${plan.color} p-8 flex flex-col relative backdrop-blur-sm`} data-aos="fade-up" data-aos-delay={idx * 100}>
                                {plan.recommended && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-dark font-bold px-4 py-1 rounded-full text-sm">
                                        Most Popular
                                    </div>
                                )}
                                <h3 className="text-xl font-bold mb-2 text-white">{plan.name}</h3>
                                <div className="flex items-baseline gap-1 mb-6">
                                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                                    {plan.period && <span className="text-slate-400">{plan.period}</span>}
                                </div>
                                <ul className="space-y-4 mb-8 flex-1">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-center gap-3 text-slate-300">
                                            <div className="w-5 h-5 rounded-full bg-success/20 flex items-center justify-center text-success text-xs">✓</div>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                                <Button variant={plan.recommended ? 'primary' : 'outline'} className="w-full justify-center">
                                    {plan.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Features Teaser */}
            <div className="bg-gradient-to-b from-dark to-secondary py-24 border-t border-slate-800" id="features">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16" data-aos="fade-up">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">Why Choose Finalytics?</h2>
                        <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                            We provide the edge you need in today's fast-moving markets.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { icon: FaChartLine, title: "Real-time Analytics", desc: "Live market data and interactive charts to track your favorite stocks with millisecond precision.", color: "text-accent" },
                            { icon: FaArrowRight, title: "AI Predictions", desc: "Advanced machine learning algorithms provide price targets and trend analysis with 87% accuracy.", color: "text-success" },
                            { icon: FaNewspaper, title: "Curated News", desc: "Stay ahead with personalized news feeds and market updates filtered by relevance to your portfolio.", color: "text-warning" }
                        ].map((feature, idx) => (
                            <div key={idx} className="bg-secondary/50 p-8 rounded-2xl border border-slate-700 hover:bg-secondary transition-colors" data-aos="fade-up" data-aos-delay={idx * 100}>
                                <div className={`w-14 h-14 ${feature.color.replace('text-', 'bg-')}/10 rounded-xl flex items-center justify-center mb-6 ${feature.color}`}>
                                    <feature.icon size={28} />
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                                <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-accent/5" />
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />

                <div className="max-w-4xl mx-auto px-4 text-center relative z-10" data-aos="zoom-in">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Ready to get started?</h2>
                    <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
                        Join thousands of investors who are already using Finalytics to make smarter, data-driven decisions.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/signup">
                            <Button variant="primary" className="text-lg px-10 py-4 shadow-xl shadow-accent/20 w-full sm:w-auto">
                                Create Free Account
                            </Button>
                        </Link>
                        <Link to="/login">
                            <Button variant="outline" className="text-lg px-10 py-4 w-full sm:w-auto">
                                View Demo
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            <Footer />

            <NewsModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                news={selectedNews}
            />
        </div>
    );
};

export default Newsfeed;
