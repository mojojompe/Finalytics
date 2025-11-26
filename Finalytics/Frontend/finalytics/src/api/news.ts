export interface NewsItem {
    uuid: string;
    title: string;
    description: string;
    keywords: string;
    snippet: string;
    url: string;
    imageUrl: string;
    language: string;
    publishedAt: string;
    source: string;
    relevance_score?: number;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/finalytics/us-central1/api';

export const getMarketNews = async (filter: string = 'general'): Promise<NewsItem[]> => {
    try {
        const response = await fetch(`${API_BASE_URL}/news?filter=${filter}`);
        if (!response.ok) throw new Error('Failed to fetch news');
        return await response.json();
    } catch (error) {
        console.error("Error fetching news:", error);
        return [];
    }
};
