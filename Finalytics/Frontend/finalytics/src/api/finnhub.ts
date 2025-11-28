const API_KEY = import.meta.env.VITE_FINNHUB_API_KEY;
const BASE_URL = 'https://finnhub.io/api/v1';

export interface Quote {
    c: number; // Current price
    d: number; // Change
    dp: number; // Percent change
    h: number; // High price of the day
    l: number; // Low price of the day
    o: number; // Open price of the day
    pc: number; // Previous close price
    t: number; // Timestamp
}

export interface CandleData {
    c: number[]; // Close prices
    h: number[]; // High prices
    l: number[]; // Low prices
    o: number[]; // Open prices
    s: string;   // Status
    t: number[]; // Timestamps
    v: number[]; // Volumes
}

export const fetchQuote = async (symbol: string): Promise<Quote> => {
    const response = await fetch(`${BASE_URL}/quote?symbol=${symbol}&token=${API_KEY}`);
    if (!response.ok) {
        throw new Error(`Finnhub API error: ${response.statusText}`);
    }
    return response.json();
};

export const fetchCandles = async (
    symbol: string,
    resolution: string,
    from: number,
    to: number
): Promise<CandleData> => {
    const response = await fetch(
        `${BASE_URL}/stock/candle?symbol=${symbol}&resolution=${resolution}&from=${from}&to=${to}&token=${API_KEY}`
    );
    if (!response.ok) {
        throw new Error(`Finnhub API error: ${response.statusText}`);
    }
    return response.json();
};
