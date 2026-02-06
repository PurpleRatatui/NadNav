import { useState, useEffect } from 'react';
import axios from 'axios';

export interface Token {
    address: string;
    name: string;
    symbol: string;
    creator: string;
    metadataURI: string;
    vibeScore: number;
    timestamp: number;
}

export function useTokenFeed() {
    const [tokens, setTokens] = useState<Token[]>([]);

    useEffect(() => {
        const fetchTokens = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/feed');
                setTokens(response.data.tokens);
            } catch (error) {
                console.error('Error fetching tokens:', error);
            }
        };

        fetchTokens();
        const interval = setInterval(fetchTokens, 2000); // Poll every 2s

        return () => clearInterval(interval);
    }, []);

    return tokens;
}
