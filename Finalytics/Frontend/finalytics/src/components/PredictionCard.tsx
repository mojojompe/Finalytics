import React from 'react';
import { motion } from 'framer-motion';
import { FaRobot, FaArrowUp, FaArrowDown } from 'react-icons/fa';

interface PredictionCardProps {
    symbol: string;
    currentPrice: number;
    targetHigh?: number;
    targetLow?: number;
    targetMean?: number;
    recommendation?: string;
}

const PredictionCard: React.FC<PredictionCardProps> = ({
    symbol,
    currentPrice,
    targetHigh,
    targetLow,
    targetMean,
    recommendation
}) => {
    const potentialUpside = targetMean ? ((targetMean - currentPrice) / currentPrice) * 100 : 0;
    const isPositive = potentialUpside > 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-secondary rounded-xl p-6 border border-slate-700 relative overflow-hidden"
        >
            <div className="absolute top-0 right-0 p-4 opacity-10">
                <FaRobot size={80} />
            </div>

            <div className="relative z-10">
                <h3 className="text-lg font-semibold text-slate-300 mb-1">AI Price Target (1Y)</h3>
                <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-3xl font-bold text-white">${targetMean?.toFixed(2) || '---'}</span>
                    {targetMean && (
                        <span className={`flex items-center text-sm font-bold ${isPositive ? 'text-success' : 'text-danger'}`}>
                            {isPositive ? <FaArrowUp className="mr-1" /> : <FaArrowDown className="mr-1" />}
                            {Math.abs(potentialUpside).toFixed(2)}%
                        </span>
                    )}
                </div>

                <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                        <span className="text-slate-400">High Forecast</span>
                        <span className="text-success font-semibold">${targetHigh?.toFixed(2) || '---'}</span>
                    </div>
                    <div className="w-full bg-dark rounded-full h-2">
                        <div
                            className="bg-gradient-to-r from-danger via-warning to-success h-2 rounded-full"
                            style={{ width: '100%' }}
                        />
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Low Forecast</span>
                        <span className="text-danger font-semibold">${targetLow?.toFixed(2) || '---'}</span>
                    </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-700">
                    <div className="flex justify-between items-center">
                        <span className="text-slate-400 text-sm">Analyst Consensus</span>
                        <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-bold border border-accent/20">
                            {recommendation || 'HOLD'}
                        </span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default PredictionCard;
