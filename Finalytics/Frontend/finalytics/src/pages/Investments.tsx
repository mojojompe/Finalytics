import React from 'react';
import { FaChartPie, FaChartLine, FaWallet } from 'react-icons/fa';

const Investments: React.FC = () => {
    // Mock Data for Portfolio
    const portfolio = [
        { symbol: 'AAPL', shares: 15, avgPrice: 145.20, currentPrice: 152.40, value: 2286.00, return: 4.96 },
        { symbol: 'MSFT', shares: 8, avgPrice: 280.50, currentPrice: 310.20, value: 2481.60, return: 10.59 },
        { symbol: 'TSLA', shares: 10, avgPrice: 210.00, currentPrice: 195.50, value: 1955.00, return: -6.90 },
        { symbol: 'NVDA', shares: 5, avgPrice: 420.00, currentPrice: 485.00, value: 2425.00, return: 15.48 },
    ];

    const totalValue = portfolio.reduce((acc, item) => acc + item.value, 0);
    const totalReturn = portfolio.reduce((acc, item) => acc + (item.currentPrice - item.avgPrice) * item.shares, 0);
    const totalReturnPercent = (totalReturn / (totalValue - totalReturn)) * 100;

    return (
        <div className="h-full flex flex-col gap-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                        <FaChartPie className="text-accent" /> Investments
                    </h1>
                    <p className="text-slate-400 mt-1">Track your portfolio performance and allocation.</p>
                </div>
            </div>

            {/* Portfolio Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-secondary/50 p-6 rounded-2xl border border-slate-700">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-3 rounded-xl bg-accent/10 text-accent">
                            <FaWallet size={20} />
                        </div>
                        <span className="text-slate-400 font-medium">Total Balance</span>
                    </div>
                    <div className="text-3xl font-bold text-white">${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
                </div>

                <div className="bg-secondary/50 p-6 rounded-2xl border border-slate-700">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-3 rounded-xl bg-success/10 text-success">
                            <FaChartLine size={20} />
                        </div>
                        <span className="text-slate-400 font-medium">Total Return</span>
                    </div>
                    <div className={`text-3xl font-bold ${totalReturn >= 0 ? 'text-success' : 'text-danger'}`}>
                        {totalReturn >= 0 ? '+' : ''}${totalReturn.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        <span className="text-sm font-normal ml-2 opacity-80">({totalReturnPercent.toFixed(2)}%)</span>
                    </div>
                </div>

                <div className="bg-secondary/50 p-6 rounded-2xl border border-slate-700">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-3 rounded-xl bg-warning/10 text-warning">
                            <FaChartPie size={20} />
                        </div>
                        <span className="text-slate-400 font-medium">Top Performer</span>
                    </div>
                    <div className="text-3xl font-bold text-white">NVDA</div>
                    <div className="text-success text-sm font-bold">+15.48%</div>
                </div>
            </div>

            {/* Holdings Table */}
            <div className="bg-secondary/50 rounded-2xl border border-slate-700 overflow-hidden flex-1 flex flex-col">
                <div className="p-6 border-b border-slate-700">
                    <h3 className="text-xl font-bold text-white">Current Holdings</h3>
                </div>
                <div className="overflow-x-auto custom-scrollbar flex-1">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-secondary/80 text-slate-400 text-sm uppercase tracking-wider">
                                <th className="p-4 font-medium">Asset</th>
                                <th className="p-4 font-medium text-right">Shares</th>
                                <th className="p-4 font-medium text-right">Avg Price</th>
                                <th className="p-4 font-medium text-right">Current Price</th>
                                <th className="p-4 font-medium text-right">Market Value</th>
                                <th className="p-4 font-medium text-right">Return</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-700">
                            {portfolio.map((item) => (
                                <tr key={item.symbol} className="hover:bg-white/5 transition-colors">
                                    <td className="p-4">
                                        <div className="font-bold text-white">{item.symbol}</div>
                                    </td>
                                    <td className="p-4 text-right text-slate-300">{item.shares}</td>
                                    <td className="p-4 text-right text-slate-300">${item.avgPrice.toFixed(2)}</td>
                                    <td className="p-4 text-right text-white font-bold">${item.currentPrice.toFixed(2)}</td>
                                    <td className="p-4 text-right text-white font-bold">${item.value.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                                    <td className={`p-4 text-right font-bold ${item.return >= 0 ? 'text-success' : 'text-danger'}`}>
                                        {item.return >= 0 ? '+' : ''}{item.return.toFixed(2)}%
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Investments;
