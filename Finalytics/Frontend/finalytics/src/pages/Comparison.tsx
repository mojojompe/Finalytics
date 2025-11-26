import React from 'react';

const Comparison: React.FC = () => {
    return (
        <div className="h-full">
            <h1 className="text-3xl font-bold mb-6">Stock Comparison</h1>
            <div className="bg-secondary rounded-xl p-6 border border-slate-700">
                <p className="text-slate-400">Select stocks to compare...</p>
            </div>
        </div>
    );
};

export default Comparison;
