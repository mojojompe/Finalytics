import React from 'react';
import type { StockOverview } from '../api/market';

interface ComparisonTableProps {
    stocks: StockOverview[];
}

interface Metric {
    label: string;
    key: keyof StockOverview | 'price'; // 'price' might not be in StockOverview yet, adjust as needed
    format: (v: number) => string;
}

const ComparisonTable: React.FC<ComparisonTableProps> = ({ stocks }) => {
    if (!stocks || stocks.length === 0) return null;

    const metrics: Metric[] = [
        { label: 'Market Cap', key: 'marketCapitalization', format: (v) => `$${(v / 1000).toFixed(2)}B` }, // Adjusted divisor assuming API returns millions
        { label: 'P/E Ratio', key: 'peRatio', format: (v) => v?.toFixed(2) },
        { label: 'Div Yield', key: 'dividendYield', format: (v) => `${v?.toFixed(2)}%` },
        { label: '52W High', key: 'yearHigh', format: (v) => `$${v?.toFixed(2)}` },
        { label: '52W Low', key: 'yearLow', format: (v) => `$${v?.toFixed(2)}` },
    ];

    return (
        <div className="overflow-x-auto rounded-xl border border-slate-700">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-secondary/80">
                        <th className="p-4 text-slate-400 font-medium border-b border-slate-700 sticky left-0 bg-secondary/80 z-10">Metric</th>
                        {stocks.map(stock => (
                            <th key={stock.symbol} className="p-4 text-white font-bold border-b border-slate-700 min-w-[150px]">
                                {stock.symbol}
                                <div className="text-xs text-slate-500 font-normal">{stock.name}</div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {metrics.map((metric, idx) => (
                        <tr key={metric.key} className={idx % 2 === 0 ? 'bg-dark' : 'bg-secondary/30'}>
                            <td className="p-4 text-slate-400 font-medium border-b border-slate-700/50 sticky left-0 bg-inherit z-10">
                                {metric.label}
                            </td>
                            {stocks.map(stock => (
                                <td key={`${stock.symbol}-${metric.key}`} className="p-4 text-slate-200 border-b border-slate-700/50">
                                    {metric.format(stock[metric.key] as number)}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ComparisonTable;
