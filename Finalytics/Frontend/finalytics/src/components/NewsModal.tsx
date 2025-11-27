import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaCalendar, FaExternalLinkAlt, FaTag } from 'react-icons/fa';
import Button from './UI/Button';
import type { NewsItem } from '../api/news';

interface NewsModalProps {
    isOpen: boolean;
    onClose: () => void;
    news: NewsItem | null;
}

const NewsModal: React.FC<NewsModalProps> = ({ isOpen, onClose, news }) => {
    if (!news) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    >
                        {/* Modal Content */}
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-secondary w-full max-w-3xl max-h-[90vh] rounded-2xl overflow-hidden shadow-2xl border border-slate-700 flex flex-col"
                        >
                            {/* Header Image */}
                            <div className="relative h-64 md:h-80 shrink-0">
                                <img
                                    src={news.imageUrl}
                                    alt={news.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-secondary to-transparent" />
                                <button
                                    onClick={onClose}
                                    className="absolute top-4 right-4 w-10 h-10 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-accent hover:text-dark transition-all"
                                >
                                    <FaTimes />
                                </button>
                                <div className="absolute bottom-4 left-4 right-4">
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        <span className="bg-accent text-dark px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                                            {news.source}
                                        </span>
                                        {news.category && (
                                            <span className="bg-slate-700 text-slate-200 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                                                <FaTag size={10} /> {news.category}
                                            </span>
                                        )}
                                    </div>
                                    <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight shadow-black drop-shadow-lg">
                                        {news.title}
                                    </h2>
                                </div>
                            </div>

                            {/* Body */}
                            <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar">
                                <div className="flex items-center gap-4 text-slate-400 text-sm mb-6 border-b border-slate-700 pb-4">
                                    <span className="flex items-center gap-2">
                                        <FaCalendar />
                                        {new Date(news.publishedAt).toLocaleDateString(undefined, {
                                            weekday: 'long',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </span>
                                    <span>•</span>
                                    <span>{new Date(news.publishedAt).toLocaleTimeString()}</span>
                                </div>

                                <div className="prose prose-invert max-w-none">
                                    <p className="text-lg text-slate-300 leading-relaxed mb-6">
                                        {news.description}
                                    </p>
                                    {news.snippet && (
                                        <p className="text-slate-400 leading-relaxed">
                                            {news.snippet}
                                        </p>
                                    )}
                                </div>

                                <div className="mt-8 pt-6 border-t border-slate-700 flex justify-end gap-4">
                                    <Button variant="ghost" onClick={onClose}>
                                        Close
                                    </Button>
                                    <a href={news.url} target="_blank" rel="noopener noreferrer">
                                        <Button variant="primary" icon={FaExternalLinkAlt}>
                                            Read Full Article
                                        </Button>
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default NewsModal;
