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
    category?: string;
    relevance_score?: number;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/finalytics/us-central1/api';

const MOCK_NEWS: NewsItem[] = [
    {
        uuid: '1',
        title: "NVIDIA Surpasses Market Expectations with Record AI Chip Demand",
        description: "The tech giant reported quarterly earnings that shattered Wall Street estimates, driven by insatiable demand for its H100 AI processors from data centers worldwide.",
        snippet: "NVIDIA's data center revenue tripled year-over-year, signaling that the AI boom is still in its early stages. CEO Jensen Huang emphasized that accelerated computing and generative AI have hit the tipping point.",
        url: "#",
        imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
        source: "TechCrunch",
        category: "Technology",
        publishedAt: new Date().toISOString(),
        keywords: "AI, NVIDIA, Chips, Stocks",
        language: "en"
    },
    {
        uuid: '2',
        title: "Federal Reserve Holds Rates Steady, Signals Cuts in 2024",
        description: "In a pivotal meeting, the Fed maintained its benchmark interest rate but projected three rate cuts coming later this year as inflation cools towards the 2% target.",
        snippet: "Chairman Powell noted that while the fight against inflation isn't over, the risks to achieving employment and inflation goals are moving into better balance. Markets rallied on the news.",
        url: "#",
        imageUrl: "https://images.unsplash.com/photo-1611974765270-ca1258634369?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
        source: "Bloomberg",
        category: "Economy",
        publishedAt: new Date(Date.now() - 3600000).toISOString(),
        keywords: "Fed, Rates, Economy, Inflation",
        language: "en"
    },
    {
        uuid: '3',
        title: "Bitcoin Reclaims $65,000 Amid ETF Inflow Surge",
        description: "The world's largest cryptocurrency is rallying again as institutional investors pour billions into spot Bitcoin ETFs, driving renewed optimism in the digital asset space.",
        snippet: "Analysts predict that the upcoming halving event combined with sustained ETF demand could push Bitcoin to new all-time highs before the end of the quarter.",
        url: "#",
        imageUrl: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1469&q=80",
        source: "CoinDesk",
        category: "Crypto",
        publishedAt: new Date(Date.now() - 7200000).toISOString(),
        keywords: "Bitcoin, Crypto, ETF, Investment",
        language: "en"
    },
    {
        uuid: '4',
        title: "Tesla Unveils New Affordable EV Model for Mass Market",
        description: "Tesla has officially announced its long-awaited 'Model 2', promising a starting price under $25,000 and a range of 300 miles, aiming to dominate the entry-level EV sector.",
        snippet: "Production is slated to begin late next year at the new Gigafactory in Mexico. The move is seen as a direct challenge to BYD and other rising EV competitors.",
        url: "#",
        imageUrl: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?ixlib=rb-4.0.3&auto=format&fit=crop&w=1471&q=80",
        source: "Reuters",
        category: "Auto",
        publishedAt: new Date(Date.now() - 10800000).toISOString(),
        keywords: "Tesla, EV, Automotive, Musk",
        language: "en"
    },
    {
        uuid: '5',
        title: "Oil Prices Spike as Geopolitical Tensions Escalate",
        description: "Brent crude futures jumped 4% today following reports of supply disruptions in the Middle East, raising concerns about global energy security.",
        snippet: "Energy analysts warn that prolonged conflict could push oil back above $90 a barrel, potentially complicating the global fight against inflation.",
        url: "#",
        imageUrl: "https://images.unsplash.com/photo-1518458028785-8fbcd101ebb9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
        source: "CNBC",
        category: "Energy",
        publishedAt: new Date(Date.now() - 14400000).toISOString(),
        keywords: "Oil, Energy, Geopolitics, Market",
        language: "en"
    },
    {
        uuid: '6',
        title: "Apple Vision Pro 2 Rumored to Launch Early Next Year",
        description: "Supply chain leaks suggest Apple is fast-tracking a lighter, cheaper version of its spatial computer to capture a broader consumer market.",
        snippet: "The new device is expected to feature the M4 chip and improved battery life, addressing two of the main criticisms of the first-generation headset.",
        url: "#",
        imageUrl: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
        source: "The Verge",
        category: "Technology",
        publishedAt: new Date(Date.now() - 18000000).toISOString(),
        keywords: "Apple, VR, Tech, Gadgets",
        language: "en"
    }
];

export const getMarketNews = async (filter: string = 'general'): Promise<NewsItem[]> => {
    try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 800));

        // In a real app, we would fetch from the API
        // const response = await fetch(`${API_BASE_URL}/news?filter=${filter}`);
        // if (!response.ok) throw new Error('Failed to fetch news');
        // return await response.json();

        // For now, return rich mock data
        return MOCK_NEWS;
    } catch (error) {
        console.error("Error fetching news:", error);
        return MOCK_NEWS; // Fallback to mock data on error
    }
};
