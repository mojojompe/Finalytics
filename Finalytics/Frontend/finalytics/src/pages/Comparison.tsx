import React, { useState, useEffect } from 'react';
import { FaSearch, FaPlus, FaTimes, FaChartBar, FaChartLine } from 'react-icons/fa';
import ReactApexChart from 'react-apexcharts';
import Button from '../components/UI/Button';
import Input from '../components/UI/Input';
import { getStockOverview, getStockCandles } from '../api/market';
import type { StockOverview } from '../api/market';

interface ComparisonData {
    overview: StockOverview;
    candles: any[]; // Using any[] for now as per getStockCandles return type
    color: string;
}

const COLORS = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6'];

const Comparison: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [comparisonList, setComparisonList] = useState<ComparisonData[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;

        const symbol = searchQuery.toUpperCase();

        // Check if already added
        if (comparisonList.some(item => item.overview.symbol === symbol)) {
            setError('Stock already added to comparison');
            return;
        }

        if (comparisonList.length >= 5) {
            setError('Maximum 5 stocks allowed');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const [overview, candles] = await Promise.all([
                getStockOverview(symbol),
                getStockCandles(symbol, 'D')
            ]);

            if (overview && candles) {
                setComparisonList([...comparisonList, {
                    overview,
                    candles,
                    color: COLORS[comparisonList.length]
                }]);
                setSearchQuery('');
            } else {
                setError('Stock data not found');
            }
        } catch (err) {
            setError('Failed to fetch stock data');
        } finally {
            setLoading(false);
        }
    };

    const removeStock = (symbol: string) => {
        setComparisonList(comparisonList.filter(item => item.overview.symbol !== symbol));
    };

    // Prepare Chart Data
    const chartSeries = comparisonList.map(item => ({
        name: item.overview.symbol,
        data: item.candles.map((c: any) => ({
            x: new Date(c.t * 1000).getTime(),
            y: c.c
        }))
    }));

    const chartOptions: ApexCharts.ApexOptions = {
        chart: {
            type: 'line',
            background: 'transparent',
            toolbar: { show: false },
            animations: { enabled: true }
        },
        theme: { mode: 'dark' },
        colors: comparisonList.map(item => item.color),
        stroke: { width: 2, curve: 'smooth' },
        xaxis: {
            type: 'datetime',
            labels: { style: { colors: '#94a3b8' } },
            axisBorder: { show: false },
            axisTicks: { show: false }
        },
        yaxis: {
            labels: {
                style: { colors: '#94a3b8' },
                formatter: (val) => `$${val.toFixed(0)}`
            },
        },
        grid: {
            borderColor: '#334155',
            strokeDashArray: 4,
        },
        legend: {
            position: 'top',
            horizontalAlign: 'right',
            labels: { colors: '#fff' }
        },
        tooltip: {
            theme: 'dark',
            x: { format: 'dd MMM yyyy' }
        }
    };

    return (
        <div className="h-full flex flex-col gap-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                        <FaChartBar className="text-accent" /> Stock Comparison
                    </h1>
                    <p className="text-slate-400 mt-1">Compare performance and key metrics side-by-side.</p>
                </div>

                <form onSubmit={handleSearch} className="flex gap-2 w-full md:w-auto">
                    <Input
                        placeholder="Add Ticker (e.g. MSFT)"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        icon={FaSearch}
                        className="w-full md:w-64"
                    />
                    <Button type="submit" variant="primary" disabled={loading}>
                        {loading ? 'Adding...' : <FaPlus />}
                    </Button>
                </form>
            </div>

            {error && (
                <div className="bg-danger/10 text-danger p-3 rounded-lg border border-danger/20">
                    {error}
                </div>
            )}

            {comparisonList.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center bg-secondary/30 rounded-2xl border border-slate-700 border-dashed p-8 text-center">
                    <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mb-6 text-slate-600">
                        <FaChartBar size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-300 mb-2">No Stocks Selected</h3>
                    <p className="text-slate-500 max-w-md">
                        Search for stock tickers above to add them to the comparison table. You can compare up to 5 stocks at once.
                    </p>
                </div>
            ) : (
                <div className="flex flex-col gap-6 flex-1 min-h-0">
                    {/* Chart Section */}
                    <div className="bg-secondary/50 rounded-2xl border border-slate-700 p-6 h-[400px] flex flex-col">
                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <FaChartLine className="text-accent" /> Price Performance (Last 100 Days)
                        </h3>
                        <div className="flex-1 w-full min-h-0">
                            <ReactApexChart
                                options={chartOptions}
                                series={chartSeries}
                                type="line"
                                height="100%"
                            />
                        </div>
                    </div>

                    {/* Metrics Table */}
                    <div className="bg-secondary/50 rounded-2xl border border-slate-700 overflow-hidden flex-1 flex flex-col min-h-[300px]">
                        <div className="overflow-x-auto custom-scrollbar flex-1">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr>
                                        <th className="p-4 bg-secondary/80 backdrop-blur-sm sticky left-0 z-10 border-b border-slate-700 min-w-[200px]">Metric</th>
                                        {comparisonList.map(item => (
                                            <th key={item.overview.symbol} className="p-4 bg-secondary/80 backdrop-blur-sm border-b border-slate-700 min-w-[150px] text-center relative group">
                                                <div className="flex flex-col items-center">
                                                    <span className="text-xl font-bold" style={{ color: item.color }}>{item.overview.symbol}</span>
                                                    <span className="text-xs text-slate-400 font-normal truncate max-w-[120px]">{item.overview.name}</span>
                                                </div>
                                                <button
                                                    onClick={() => removeStock(item.overview.symbol)}
                                                    className="absolute top-2 right-2 text-slate-500 hover:text-danger opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    <FaTimes />
                                                </button>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-700">
                                    {[
                                        { label: 'Current Price', key: 'price', format: (v: number) => `$${v.toFixed(2)}` },
                                        { label: 'Change (24h)', key: 'changePercent', format: (v: number) => `${v > 0 ? '+' : ''}${v.toFixed(2)}%`, color: true },
                                        { label: 'Market Cap', key: 'marketCapitalization', format: (v: number) => `$${(v / 1000000000).toFixed(2)}B` },
                                        { label: 'P/E Ratio', key: 'peRatio', format: (v: number) => v.toFixed(2) },
                                        { label: 'Dividend Yield', key: 'dividendYield', format: (v: number) => `${v.toFixed(2)}%` },
                                        { label: '52W High', key: 'yearHigh', format: (v: number) => `$${v.toFixed(2)}` },
                                        { label: '52W Low', key: 'yearLow', format: (v: number) => `$${v.toFixed(2)}` },
                                    ].map((metric) => (
                                        <tr key={metric.key} className="hover:bg-white/5 transition-colors">
                                            <td className="p-4 font-semibold text-slate-300 sticky left-0 bg-secondary/50 backdrop-blur-sm border-r border-slate-700">
                                                {metric.label}
                                            </td>
                                            {comparisonList.map(item => {
                                                // @ts-ignore
                                                const val = item.overview[metric.key];
                                                const isPositive = metric.color && val >= 0;
                                                const isNegative = metric.color && val < 0;

                                                return (
                                                    <td key={`${item.overview.symbol}-${metric.key}`} className={`p-4 text-center font-mono ${isPositive ? 'text-success' : isNegative ? 'text-danger' : 'text-white'}`}>
                                                        {metric.format(val)}
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Comparison;

