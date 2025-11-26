import { useState, useEffect } from 'react';
import { getStockOverview, getStockCandles, getPriceTarget } from '../api/market';
import type { StockOverview, PriceTarget } from '../api/market';

interface StockDataState {
    data: StockOverview | null;
    candles: any[];
    prediction: PriceTarget | null;
    loading: boolean;
    error: any;
}

export const useStockData = (ticker: string): StockDataState => {
    const [data, setData] = useState<StockOverview | null>(null);
    const [candles, setCandles] = useState<any[]>([]);
    const [prediction, setPrediction] = useState<PriceTarget | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        if (!ticker) return;

        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const [overviewData, candlesData, predictionData] = await Promise.all([
                    getStockOverview(ticker),
                    getStockCandles(ticker),
                    getPriceTarget(ticker)
                ]);

                setData(overviewData);
                setCandles(candlesData);
                setPrediction(predictionData);
            } catch (err) {
                setError(err);
                console.error("Error fetching stock data:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [ticker]);

    return { data, candles, prediction, loading, error };
};
