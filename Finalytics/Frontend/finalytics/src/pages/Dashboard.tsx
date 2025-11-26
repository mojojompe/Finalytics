import React, { useState } from 'react';
import { useStockData } from '../hooks/useStockData';
import { useWatchlist } from '../hooks/useWatchlist';
import CandlestickChart from '../components/CandlestickChart';
import PredictionCard from '../components/PredictionCard';
import { FaSearch, FaPlus, FaTrash } from 'react-icons/fa';
import Button from '../components/UI/Button';
import Input from '../components/UI/Input';

interface StatCardProps {
    label: string;
    value: number | undefined;
    format?: (v: number) => string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, format }) => (
    <div className="bg-secondary p-4 rounded-xl border border-slate-700">
        <div className="text-slate-500 text-xs mb-1">{label}</div>
        <div className="text-lg font-bold text-white">
            {value !== undefined ? (format ? format(value) : value) : '-'}
        </div>
    </div>
);

const Dashboard: React.FC = () => {
    const [selectedTicker, setSelectedTicker] = useState('AAPL');
    const [searchQuery, setSearchQuery] = useState('');
    const { data, candles, prediction } = useStockData(selectedTicker);
    const { watchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();

    // Format candle data for ApexCharts
    const chartData = candles.map(c => ({
        x: new Date(c.t * 1000),
        y: [c.o, c.h, c.l, c.c]
    }));

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            setSelectedTicker(searchQuery.toUpperCase());
            setSearchQuery('');
        }
    };

    const isInWatchlist = watchlist.includes(selectedTicker);

    return (
        <div className="h-full flex flex-col gap-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                        {selectedTicker}
                        <span className="text-lg font-normal text-slate-400">
                            {data ? data.name : 'Loading...'}
                        </span>
                    </h1>
                    <div className="text-sm text-slate-400 mt-1">
                        Last Updated: {new Date().toLocaleTimeString()}
                    </div>
                </div>

                <div className="flex gap-3 w-full md:w-auto">
                    <form onSubmit={handleSearch} className="relative flex-1 md:w-64">
                        <Input
                            placeholder="Search Ticker (e.g. TSLA)"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            icon={FaSearch}
                            className="w-full"
                        />
                    </form>
                    <Button
                        variant={isInWatchlist ? "danger" : "primary"}
                        onClick={() => isInWatchlist ? removeFromWatchlist(selectedTicker) : addToWatchlist(selectedTicker)}
                    >
                        {isInWatchlist ? <FaTrash /> : <FaPlus />}
                    </Button>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">

                {/* Left Column: Chart & Stats */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                    {/* Chart Section */}
                    <div className="bg-secondary rounded-xl p-4 border border-slate-700 flex-1 min-h-[400px]">
                        <div className="flex justify-between items-center mb-4 px-2">
                            <h3 className="font-semibold text-slate-300">Price Action (Daily)</h3>
                            <div className="flex gap-2">
                                {['1D', '1W', '1M', '1Y'].map(tf => (
                                    <button key={tf} className="text-xs font-medium text-slate-500 hover:text-accent px-2 py-1 rounded hover:bg-slate-800">
                                        {tf}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <CandlestickChart data={chartData} height={400} />
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <StatCard label="Market Cap" value={data?.marketCapitalization} format={(v) => `$${(v / 1000).toFixed(2)}B`} />
                        <StatCard label="P/E Ratio" value={data?.peRatio} />
                        <StatCard label="Dividend Yield" value={data?.dividendYield} format={(v) => `${v?.toFixed(2)}%`} />
                        <StatCard label="52W High" value={data?.yearHigh} format={(v) => `$${v}`} />
                    </div>
                </div>

                {/* Right Column: Predictions & Watchlist */}
                <div className="flex flex-col gap-6">
                    {/* Prediction Card */}
                    <PredictionCard
                        symbol={selectedTicker}
                        currentPrice={chartData.length > 0 ? chartData[chartData.length - 1].y[3] : 0}
                        targetHigh={prediction?.targetHigh}
                        targetLow={prediction?.targetLow}
                        targetMean={prediction?.targetMean}
                        recommendation={prediction?.recommendation}
                    />

                    {/* Watchlist Widget */}
                    <div className="bg-secondary rounded-xl border border-slate-700 flex-1 overflow-hidden flex flex-col">
                        <div className="p-4 border-b border-slate-700 bg-secondary/50">
                            <h3 className="font-semibold text-slate-300">Your Watchlist</h3>
                        </div>
                        <div className="flex-1 overflow-y-auto p-2 space-y-2">
                            {watchlist.length === 0 ? (
                                <div className="text-center text-slate-500 py-8 text-sm">
                                    No stocks in watchlist
                                </div>
                            ) : (
                                watchlist.map(ticker => (
                                    <div
                                        key={ticker}
                                        onClick={() => setSelectedTicker(ticker)}
                                        className={`p-3 rounded-lg cursor-pointer flex justify-between items-center transition-colors ${selectedTicker === ticker ? 'bg-accent/10 border border-accent/20' : 'hover:bg-slate-800'}`}
                                    >
                                        <span className="font-bold text-white">{ticker}</span>
                                        <span className="text-xs text-slate-400">Click to view</span>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
