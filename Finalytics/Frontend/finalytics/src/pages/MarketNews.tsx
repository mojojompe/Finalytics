import React, { useState, useEffect } from 'react';
import { FaNewspaper, FaSearch } from 'react-icons/fa';
import { getMarketNews } from '../api/news';
import type { NewsItem } from '../api/news';
import NewsModal from '../components/NewsModal';
import Input from '../components/UI/Input';

const MarketNews: React.FC = () => {
    const [news, setNews] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');
    const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const categories = ['All', 'Crypto', 'Tech', 'Economy', 'Forex', 'Commodities'];

    useEffect(() => {
        const fetchNews = async () => {
            setLoading(true);
            try {
                const category = activeCategory === 'All' ? 'general' : activeCategory.toLowerCase();
                const data = await getMarketNews(category);
                setNews(data);
            } catch (error) {
                console.error("Failed to load news", error);
            } finally {
                setLoading(false);
            }
        };
        fetchNews();
    }, [activeCategory]);

    const filteredNews = news.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const openModal = (item: NewsItem) => {
        setSelectedNews(item);
        setIsModalOpen(true);
    };

    return (
        <div className="h-full flex flex-col gap-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                        <FaNewspaper className="text-accent" /> Market News
                    </h1>
                    <p className="text-slate-400 mt-1">Real-time financial updates and analysis.</p>
                </div>
                <div className="w-full md:w-auto">
                    <Input
                        placeholder="Search news..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        icon={FaSearch}
                        className="w-full md:w-64"
                    />
                </div>
            </div>

            {/* Categories */}
            <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-colors ${activeCategory === cat ? 'bg-accent text-dark' : 'bg-secondary border border-slate-700 text-slate-400 hover:text-white hover:border-slate-500'}`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* News Grid */}
            {loading ? (
                <div className="flex-1 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredNews.map((item, index) => (
                        <div
                            key={index}
                            className="bg-secondary/50 rounded-xl border border-slate-700 overflow-hidden hover:border-accent/50 transition-all cursor-pointer group flex flex-col"
                            onClick={() => openModal(item)}
                        >
                            <div className="h-48 overflow-hidden relative">
                                <img
                                    src={item.imageUrl || 'https://via.placeholder.com/400x200?text=News'}
                                    alt={item.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-xs font-bold text-white">
                                    {item.source}
                                </div>
                            </div>
                            <div className="p-4 flex flex-col flex-1">
                                <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                                    <span>{new Date(item.publishedAt).toLocaleDateString()}</span>
                                    <span className="text-accent">• {item.category}</span>
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-accent transition-colors">
                                    {item.title}
                                </h3>
                                <p className="text-slate-400 text-sm line-clamp-3 mb-4 flex-1">
                                    {item.description}
                                </p>
                                <div className="text-accent text-sm font-bold mt-auto">Read More →</div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <NewsModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                news={selectedNews}
            />
        </div>
    );
};

export default MarketNews;
