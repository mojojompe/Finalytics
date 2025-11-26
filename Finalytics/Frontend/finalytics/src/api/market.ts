export interface StockOverview {
    symbol: string;
    name: string;
    marketCapitalization: number;
    peRatio: number;
    dividendYield: number;
    yearHigh: number;
    yearLow: number;
}

export interface CandleData {
    c: number[];
    h: number[];
    l: number[];
    o: number[];
    s: string;
    t: number[];
    v: number[];
}

export interface PriceTarget {
    targetHigh: number;
    targetLow: number;
    targetMean: number;
    targetMedian: number;
    recommendation: string;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/finalytics/us-central1/api';

export const getStockOverview = async (ticker: string): Promise<StockOverview | null> => {
    try {
        const response = await fetch(`${API_BASE_URL}/stocks/${ticker}/overview`);
        if (!response.ok) throw new Error('Failed to fetch stock overview');
        return await response.json();
    } catch (error) {
        console.error("Error fetching stock overview:", error);
        return null;
    }
};

export const getStockCandles = async (ticker: string, resolution: string = 'D'): Promise<any[]> => {
    try {
        const response = await fetch(`${API_BASE_URL}/stocks/${ticker}/candles?resolution=${resolution}`);
        if (!response.ok) throw new Error('Failed to fetch candles');
        const data: CandleData = await response.json();

        // Transform to array of objects if needed, or return raw candle data
        if (data.s === 'ok') {
            return data.t.map((timestamp, index) => ({
                t: timestamp,
                o: data.o[index],
                h: data.h[index],
                l: data.l[index],
                c: data.c[index],
                v: data.v[index]
            }));
        }
        return [];
    } catch (error) {
        console.error("Error fetching candles:", error);
        return [];
    }
};

export const getPriceTarget = async (ticker: string): Promise<PriceTarget | null> => {
    try {
        const response = await fetch(`${API_BASE_URL}/stocks/${ticker}/price-target`);
        if (!response.ok) throw new Error('Failed to fetch price target');
        return await response.json();
    } catch (error) {
        console.error("Error fetching price target:", error);
        return null;
    }
};
