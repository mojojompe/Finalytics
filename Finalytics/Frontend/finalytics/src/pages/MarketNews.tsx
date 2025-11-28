import React, { useState, useEffect } from 'react';
import { fetchMarketNews, type NewsItem } from '../api/marketaux';
import { FaSearch, FaFilter, FaExternalLinkAlt, FaTimes } from 'react-icons/fa';
import Button from '../components/UI/Button';
import Input from '../components/UI/Input';

const MarketNews: React.FC = () => {
    const [news, setNews] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('general');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedArticle, setSelectedArticle] = useState<NewsItem | null>(null);

    useEffect(() => {
        const loadNews = async () => {
            setLoading(true);
            try {
                const response = await fetchMarketNews(filter);
                setNews(response.data);
            } catch (error) {
                console.error("Failed to fetch news:", error);
            } finally {
                setLoading(false);
            }
        };

        loadNews();
    }, [filter]);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;

        setLoading(true);
        try {
            const response = await fetchMarketNews(searchQuery);
            setNews(response.data);
        } catch (error) {
            console.error("Failed to search news:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h1 className="text-3xl font-bold text-white">Market News</h1>

                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                    <form onSubmit={handleSearch} className="relative">
                        <Input
                            placeholder="Search news..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 w-full sm:w-64"
                        />
                        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    </form>

                    <div className="flex bg-secondary/50 p-1 rounded-lg border border-slate-700 overflow-x-auto">
                        {['general', 'forex', 'crypto', 'mergers'].map(cat => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`px-3 py-1.5 rounded-md text-sm font-medium capitalize whitespace-nowrap transition-all ${filter === cat ? 'bg-accent text-dark shadow-sm' : 'text-slate-400 hover:text-white'}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <div key={i} className="bg-secondary/30 rounded-2xl h-64 animate-pulse"></div>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {news.map((item) => (
                        <div
                            key={item.uuid}
                            className="bg-secondary/50 rounded-2xl border border-slate-700 overflow-hidden hover:border-accent/50 transition-all cursor-pointer group flex flex-col"
                            onClick={() => setSelectedArticle(item)}
                        >
                            <div className="h-48 overflow-hidden relative">
                                <img
                                    src={item.image_url || 'https://via.placeholder.com/400x200?text=News'}
                                    alt={item.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x200?text=No+Image' }}
                                />
                                <div className="absolute top-2 right-2 bg-dark/80 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-white">
                                    {item.source.name}
                                </div>
                            </div>
                            <div className="p-5 flex-1 flex flex-col">
                                <div className="text-xs text-slate-400 mb-2 flex justify-between">
                                    <span>{new Date(item.published_at).toLocaleDateString()}</span>
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-accent transition-colors">
                                    {item.title}
                                </h3>
                                <p className="text-slate-400 text-sm line-clamp-3 mb-4 flex-1">
                                    {item.description}
                                </p>
                                <div className="flex items-center text-accent text-sm font-bold mt-auto">
                                    Read More <FaExternalLinkAlt className="ml-2 text-xs" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Article Modal */}
            {selectedArticle && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark/80 backdrop-blur-sm" onClick={() => setSelectedArticle(null)}>
                    <div className="bg-secondary w-full max-w-3xl max-h-[90vh] rounded-2xl border border-slate-700 overflow-hidden flex flex-col shadow-2xl" onClick={e => e.stopPropagation()}>
                        <div className="relative h-64 shrink-0">
                            <img
                                src={selectedArticle.image_url || 'https://via.placeholder.com/800x400'}
                                alt={selectedArticle.title}
                                className="w-full h-full object-cover"
                            />
                            <button
                                onClick={() => setSelectedArticle(null)}
                                className="absolute top-4 right-4 bg-dark/50 hover:bg-dark text-white p-2 rounded-full backdrop-blur-sm transition-colors"
                            >
                                <FaTimes />
                            </button>
                        </div>
                        <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar">
                            <div className="flex items-center gap-2 mb-4 text-sm text-slate-400">
                                <span className="bg-accent/10 text-accent px-2 py-1 rounded font-bold">{selectedArticle.source.name}</span>
                                <span>•</span>
                                <span>{new Date(selectedArticle.published_at).toLocaleDateString()}</span>
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-4">{selectedArticle.title}</h2>
                            <p className="text-slate-300 leading-relaxed mb-6 text-lg">
                                {selectedArticle.description}
                            </p>
                            <p className="text-slate-400 leading-relaxed mb-8">
                                {selectedArticle.snippet}
                            </p>
                            <div className="flex justify-end">
                                <Button
                                    variant="primary"
                                    onClick={() => window.open(selectedArticle.url, '_blank')}
                                    icon={FaExternalLinkAlt}
                                >
                                    Read Full Article
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MarketNews;
