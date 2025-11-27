import React, { useState, useEffect } from 'react';
import { useStockData } from '../hooks/useStockData';
import { useWatchlist } from '../hooks/useWatchlist';
import CandlestickChart from '../components/CandlestickChart';
import PredictionCard from '../components/PredictionCard';
import { FaPlus, FaTrash, FaChartLine, FaRobot, FaList, FaNewspaper, FaTachometerAlt } from 'react-icons/fa';
import Button from '../components/UI/Button';
import Input from '../components/UI/Input';

interface StatCardProps {
    label: string;
    value: number | string | undefined;
    format?: (v: any) => string;
    change?: number;
    subtext?: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, format, change, subtext }) => (
    <div className="bg-secondary/50 p-4 rounded-xl border border-slate-700 backdrop-blur-sm hover:border-accent/50 transition-colors group">
        <div className="text-slate-400 text-xs mb-1 font-medium uppercase tracking-wider">{label}</div>
        <div className="text-xl font-bold text-white mb-1 truncate">
            {value !== undefined ? (format ? format(value) : value) : '-'}
        </div>
        {change !== undefined && (
            <div className={`text-xs font-bold ${change >= 0 ? 'text-success' : 'text-danger'} flex items-center gap-1`}>
                {change >= 0 ? '▲' : '▼'} {Math.abs(change).toFixed(2)}%
            </div>
        )}
        {subtext && <div className="text-xs text-slate-500 mt-1">{subtext}</div>}
    </div>
);

const Dashboard: React.FC = () => {
    const { watchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();
    const [selectedTicker, setSelectedTicker] = useState<string>('AAPL');
    const [searchTicker, setSearchTicker] = useState('');

    useEffect(() => {
        if (watchlist.length > 0 && !watchlist.includes(selectedTicker)) {
            setSelectedTicker(watchlist[0]);
        } else if (watchlist.length === 0) {
            setSelectedTicker('AAPL');
        }
    }, [watchlist]);

    const { data, candles, prediction, loading, error } = useStockData(selectedTicker);

    const handleAddTicker = async (e: React.FormEvent) => {
        e.preventDefault();
        if (searchTicker) {
            await addToWatchlist(searchTicker.toUpperCase());
            setSearchTicker('');
        }
    };

    const chartData = candles.map(c => ({
        x: new Date(c.t * 1000),
        y: [c.o, c.h, c.l, c.c]
    }));

    // Mock Sentiment Data
    const sentimentScore = 65; // Greed
    const sentimentLabel = "Greed";

    return (
        <div className="flex flex-col gap-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                        <FaChartLine className="text-accent" /> Dashboard
                    </h1>
                    <p className="text-slate-400 mt-1">
                        Real-time market analysis for <span className="text-white font-bold text-xl ml-1">{selectedTicker}</span>
                    </p>
                </div>

                <div className="flex items-center gap-4 bg-secondary/50 p-2 rounded-xl border border-slate-700">
                    <span className="text-sm text-slate-400 pl-2">Timeframe:</span>
                    <div className="flex gap-1">
                        {['1D', '1W', '1M', '1Y'].map(tf => (
                            <button key={tf} className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${tf === '1M' ? 'bg-accent text-dark' : 'text-slate-400 hover:text-white hover:bg-slate-700'}`}>
                                {tf}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                {/* Left Column: Chart & Stats (8 cols) */}
                <div className="lg:col-span-8 flex flex-col gap-6">
                    {/* Key Stats Row */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <StatCard
                            label="Current Price"
                            value={data?.price}
                            format={v => `$${v.toFixed(2)}`}
                            change={data?.changePercent}
                        />
                        <StatCard
                            label="Market Cap"
                            value={data?.marketCapitalization}
                            format={v => `$${(v / 1000000000).toFixed(2)}B`}
                        />
                        <StatCard
                            label="P/E Ratio"
                            value={data?.peRatio}
                            format={v => v.toFixed(2)}
                            subtext="Industry Avg: 25.4"
                        />
                        <StatCard
                            label="Volume"
                            value={candles[candles.length - 1]?.v}
                            format={v => `${(v / 1000000).toFixed(1)}M`}
                            subtext="Avg Vol: 45M"
                        />
                    </div>

                    {/* Chart Area */}
                    <div className="bg-secondary/50 rounded-2xl border border-slate-700 p-6 backdrop-blur-sm min-h-[400px] flex flex-col">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-lg text-white">Price Action</h3>
                            <div className="flex gap-2">
                                <span className="flex items-center gap-1 text-xs text-success font-bold bg-success/10 px-2 py-1 rounded">
                                    <div className="w-2 h-2 rounded-full bg-success animate-pulse"></div> Live
                                </span>
                            </div>
                        </div>
                        <div className="flex-1 w-full min-h-[300px]">
                            {loading ? (
                                <div className="h-full flex items-center justify-center text-slate-500">
                                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-accent mr-3"></div>
                                    Loading Chart Data...
                                </div>
                            ) : error ? (
                                <div className="h-full flex items-center justify-center text-danger bg-danger/5 rounded-xl border border-danger/10">
                                    {error}
                                </div>
                            ) : (
                                <CandlestickChart data={chartData} height="100%" />
                            )}
                        </div>
                    </div>

                    {/* Bottom Row: Sentiment & Feed */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Sentiment Gauge */}
                        <div className="bg-secondary/50 rounded-2xl border border-slate-700 p-6 flex flex-col min-h-[250px]">
                            <h3 className="font-bold text-lg text-white mb-4 flex items-center gap-2">
                                <FaTachometerAlt className="text-warning" /> Market Sentiment
                            </h3>
                            <div className="flex-1 flex flex-col items-center justify-center relative">
                                <div className="w-48 h-24 bg-slate-700 rounded-t-full overflow-hidden relative">
                                    <div
                                        className="absolute inset-0 origin-bottom transition-transform duration-1000"
                                        style={{
                                            background: `conic-gradient(from 180deg at 50% 100%, #EF4444 0deg, #F59E0B 90deg, #10B981 180deg)`,
                                            transform: 'rotate(0deg)'
                                        }}
                                    />
                                    <div
                                        className="absolute bottom-0 left-1/2 w-1 h-24 bg-white origin-bottom -translate-x-1/2 transition-transform duration-1000 z-10"
                                        style={{ transform: `translateX(-50%) rotate(${(sentimentScore / 100) * 180 - 90}deg)` }}
                                    />
                                    <div className="absolute bottom-0 left-1/2 w-4 h-4 bg-white rounded-full -translate-x-1/2 translate-y-1/2 z-20" />
                                </div>
                                <div className="mt-4 text-center">
                                    <div className="text-3xl font-bold text-white">{sentimentScore}</div>
                                    <div className="text-sm font-bold text-success">{sentimentLabel}</div>
                                </div>
                            </div>
                        </div>

                        {/* Real-time Feed */}
                        <div className="bg-secondary/50 rounded-2xl border border-slate-700 p-6 flex flex-col h-[250px]">
                            <h3 className="font-bold text-lg text-white mb-4 flex items-center gap-2">
                                <FaNewspaper className="text-accent" /> Live Feed
                            </h3>
                            <div className="flex-1 overflow-y-auto custom-scrollbar space-y-3 pr-2">
                                {[
                                    { time: '2m ago', text: 'AAPL hits new 52-week high on strong earnings report.', type: 'positive' },
                                    { time: '15m ago', text: 'Fed Chair Powell signals potential rate pause in next meeting.', type: 'neutral' },
                                    { time: '42m ago', text: 'Tech sector sees minor pullback as investors take profits.', type: 'negative' },
                                    { time: '1h ago', text: 'NVDA announces new AI chip architecture, stock jumps 4%.', type: 'positive' },
                                ].map((item, i) => (
                                    <div key={i} className="p-3 rounded-lg bg-dark/50 border border-slate-700 text-sm">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-xs text-slate-500">{item.time}</span>
                                            <span className={`w-2 h-2 rounded-full ${item.type === 'positive' ? 'bg-success' : item.type === 'negative' ? 'bg-danger' : 'bg-slate-400'}`} />
                                        </div>
                                        <p className="text-slate-300 leading-snug">{item.text}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Watchlist & AI (4 cols) */}
                <div className="lg:col-span-4 flex flex-col gap-6">
                    {/* AI Prediction */}
                    <div className="bg-gradient-to-br from-accent/20 to-secondary rounded-2xl border border-accent/20 p-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <FaRobot size={100} />
                        </div>
                        <h3 className="font-bold text-lg text-white mb-4 flex items-center gap-2 relative z-10">
                            <FaRobot className="text-accent" /> AI Forecast
                        </h3>
                        {prediction ? (
                            <PredictionCard
                                symbol={selectedTicker}
                                currentPrice={data?.price || 0}
                                targetHigh={prediction.targetHigh}
                                targetLow={prediction.targetLow}
                                targetMean={prediction.targetMean}
                                recommendation={prediction.recommendation}
                            />
                        ) : (
                            <div className="text-slate-400 text-sm italic">
                                AI analysis loading...
                            </div>
                        )}
                    </div>

                    {/* Watchlist */}
                    <div className="bg-secondary/50 rounded-2xl border border-slate-700 p-6 backdrop-blur-sm flex flex-col min-h-[300px]">
                        <h3 className="font-bold text-lg text-white mb-4 flex items-center gap-2">
                            <FaList className="text-slate-400" /> Watchlist
                        </h3>

                        <form onSubmit={handleAddTicker} className="flex gap-2 mb-4">
                            <Input
                                placeholder="Add Ticker"
                                value={searchTicker}
                                onChange={e => setSearchTicker(e.target.value)}
                                className="h-10 text-sm"
                            />
                            <Button type="submit" variant="primary" className="h-10 w-10 p-0 flex items-center justify-center">
                                <FaPlus size={12} />
                            </Button>
                        </form>

                        <div className="flex-1 overflow-y-auto custom-scrollbar -mx-2 px-2 space-y-2 max-h-[400px]">
                            {watchlist.length === 0 ? (
                                <div className="text-center text-slate-500 py-8 text-sm">
                                    Your watchlist is empty.
                                </div>
                            ) : (
                                watchlist.map(ticker => (
                                    <div
                                        key={ticker}
                                        onClick={() => setSelectedTicker(ticker)}
                                        className={`p-3 rounded-xl border transition-all cursor-pointer flex justify-between items-center group ${selectedTicker === ticker ? 'bg-accent/10 border-accent/50 shadow-lg shadow-accent/5' : 'bg-dark/50 border-slate-700 hover:border-slate-500'}`}
                                    >
                                        <div>
                                            <div className={`font-bold ${selectedTicker === ticker ? 'text-accent' : 'text-white'}`}>{ticker}</div>
                                            <div className="text-xs text-slate-400">NASDAQ</div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="text-right">
                                                <div className="text-sm font-bold text-white">$142.50</div>
                                                <div className="text-xs text-success font-bold">+1.2%</div>
                                            </div>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); removeFromWatchlist(ticker); }}
                                                className="text-slate-600 hover:text-danger opacity-0 group-hover:opacity-100 transition-opacity p-2"
                                            >
                                                <FaTrash size={12} />
                                            </button>
                                        </div>
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
