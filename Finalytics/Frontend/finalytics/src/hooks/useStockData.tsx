import { useState, useEffect } from 'react';
import { fetchQuote, fetchCandles } from '../api/finnhub';
import { fetchCompanyProfile } from '../api/fmp';

export interface StockData {
    price: number;
    change: number;
    changePercent: number;
    marketCapitalization: number;
    peRatio: number;
    volume: number;
}

export interface Candle {
    t: number; // Time
    o: number; // Open
    h: number; // High
    l: number; // Low
    c: number; // Close
    v: number; // Volume
}

export interface PriceTarget {
    targetHigh: number;
    targetLow: number;
    targetMean: number;
    recommendation: string;
}

export interface StockDataState {
    data: StockData | null;
    candles: Candle[];
    prediction: PriceTarget | null;
    loading: boolean;
    error: string | null;
}

export const useStockData = (ticker: string, timeframe: string = '1D'): StockDataState => {
    const [data, setData] = useState<StockData | null>(null);
    const [candles, setCandles] = useState<Candle[]>([]);
    const [prediction, setPrediction] = useState<PriceTarget | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                // 1. Fetch Quote (Finnhub)
                const quote = await fetchQuote(ticker);

                // 2. Fetch Company Profile (FMP)
                const profiles = await fetchCompanyProfile(ticker);
                const profile = profiles[0];

                // 3. Fetch Candles (Finnhub)
                const now = Math.floor(Date.now() / 1000);
                let from = now - 86400; // Default 1D
                let resolution = '5';

                if (timeframe === '1W') { from = now - 7 * 86400; resolution = '60'; }
                else if (timeframe === '1M') { from = now - 30 * 86400; resolution = 'D'; }
                else if (timeframe === '1Y') { from = now - 365 * 86400; resolution = 'W'; }

                const candleData = await fetchCandles(ticker, resolution, from, now);

                if (candleData && candleData.s === 'ok') {
                    const formattedCandles = candleData.t.map((t, i) => ({
                        t,
                        o: candleData.o[i],
                        h: candleData.h[i],
                        l: candleData.l[i],
                        c: candleData.c[i],
                        v: candleData.v[i]
                    }));
                    setCandles(formattedCandles);
                }

                setData({
                    price: quote.c,
                    change: quote.d,
                    changePercent: quote.dp,
                    marketCapitalization: profile?.mktCap || 0,
                    peRatio: 0, // Not always available in free tier easily
                    volume: quote.pc
                });

                // Mock Prediction (Real API for this is often paid/complex)
                setPrediction({
                    targetHigh: quote.c * 1.15,
                    targetLow: quote.c * 0.90,
                    targetMean: quote.c * 1.05,
                    recommendation: 'BUY'
                });

            } catch (err: any) {
                console.error("Error fetching stock data:", err);
                setError(err.message || "Failed to fetch data");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [ticker, timeframe]);

    return { data, candles, prediction, loading, error };
};
