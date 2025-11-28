const API_KEY = import.meta.env.VITE_MARKETAUX_API_KEY;
const BASE_URL = 'https://api.marketaux.com/v1';

export interface NewsItem {
    uuid: string;
    title: string;
    description: string;
    keywords: string;
    snippet: string;
    url: string;
    image_url: string;
    language: string;
    published_at: string;
    source: {
        name: string;
        url: string;
        domain: string;
    };
    relevance_score: number | null;
    entities: Array<{
        symbol: string;
        name: string;
        exchange: string;
        exchange_long: string;
        country: string;
        type: string;
        industry: string;
        match_score: number;
        sentiment_score: number;
        highlights: Array<{
            highlight: string;
            sentiment: number;
            highlight_sentiment: number;
        }>;
    }>;
}

export interface NewsResponse {
    meta: {
        found: number;
        returned: number;
        limit: number;
        page: number;
    };
    data: NewsItem[];
}

export const fetchMarketNews = async (filter: string = 'general'): Promise<NewsResponse> => {
    // Map our internal filter categories to Marketaux query parameters if needed
    // For now, we'll just fetch general top news or search by keywords if filter is specific

    let url = `${BASE_URL}/news/all?language=en&api_token=${API_KEY}`;

    if (filter !== 'general' && filter !== 'all') {
        // Simple mapping for demo purposes
        if (filter === 'crypto') url += '&industries=Financial%20Services'; // Approximation
        else if (filter === 'forex') url += '&industries=Financial%20Services';
        else url += `&search=${filter}`;
    }

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Marketaux API error: ${response.statusText}`);
    }
    return response.json();
};
