const API_KEY = import.meta.env.VITE_FMP_API_KEY;
const BASE_URL = 'https://financialmodelingprep.com/api/v3';

export interface CompanyProfile {
    symbol: string;
    price: number;
    beta: number;
    volAvg: number;
    mktCap: number;
    lastDiv: number;
    range: string;
    changes: number;
    companyName: string;
    currency: string;
    cik: string;
    isin: string;
    cusip: string;
    exchange: string;
    exchangeShortName: string;
    industry: string;
    website: string;
    description: string;
    ceo: string;
    sector: string;
    country: string;
    fullTimeEmployees: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    dcfDiff: number;
    dcf: number;
    image: string;
    ipoDate: string;
    defaultImage: boolean;
    isEtf: boolean;
    isActivelyTrading: boolean;
    isAdr: boolean;
    isFund: boolean;
}

export const fetchCompanyProfile = async (symbol: string): Promise<CompanyProfile[]> => {
    const response = await fetch(`${BASE_URL}/profile/${symbol}?apikey=${API_KEY}`);
    if (!response.ok) {
        throw new Error(`FMP API error: ${response.statusText}`);
    }
    return response.json();
};
