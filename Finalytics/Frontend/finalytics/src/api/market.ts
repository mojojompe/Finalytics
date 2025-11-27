export interface StockOverview {
    symbol: string;
    name: string;
    price: number;
    changePercent: number;
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

// Mock Data Generators
const generateMockCandles = () => {
    const candles = [];
    let price = 150;
    const now = Math.floor(Date.now() / 1000);
    for (let i = 100; i >= 0; i--) {
        const time = now - i * 86400;
        const open = price;
        const close = price + (Math.random() - 0.5) * 5;
        const high = Math.max(open, close) + Math.random() * 2;
        const low = Math.min(open, close) - Math.random() * 2;
        candles.push({ t: time, o: open, h: high, l: low, c: close, v: Math.floor(Math.random() * 1000000) });
        price = close;
    }
    return candles;
};

export const getStockOverview = async (ticker: string): Promise<StockOverview | null> => {
    try {
        const response = await fetch(`${API_BASE_URL}/stocks/${ticker}/overview`);
        if (!response.ok) throw new Error('Failed to fetch stock overview');
        return await response.json();
    } catch (error) {
        console.warn("Using mock data for overview:", error);
        return {
            symbol: ticker,
            name: `${ticker} Inc.`,
            price: 150.25,
            changePercent: 1.5,
            marketCapitalization: 2500000000000,
            peRatio: 28.5,
            dividendYield: 0.5,
            yearHigh: 190.50,
            yearLow: 130.20
        };
    }
};

export const getStockCandles = async (ticker: string, resolution: string = 'D'): Promise<any[]> => {
    try {
        const response = await fetch(`${API_BASE_URL}/stocks/${ticker}/candles?resolution=${resolution}`);
        if (!response.ok) throw new Error('Failed to fetch candles');
        const data: CandleData = await response.json();

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
        console.warn("Using mock data for candles:", error);
        return generateMockCandles();
    }
};

export const getPriceTarget = async (ticker: string): Promise<PriceTarget | null> => {
    try {
        const response = await fetch(`${API_BASE_URL}/stocks/${ticker}/price-target`);
        if (!response.ok) throw new Error('Failed to fetch price target');
        return await response.json();
    } catch (error) {
        console.warn("Using mock data for price target:", error);
        return {
            targetHigh: 220,
            targetLow: 140,
            targetMean: 185,
            targetMedian: 180,
            recommendation: 'buy'
        };
    }
};
