export interface TokenData {
    address: string;
    name: string;
    symbol: string;
    creator: string;
    metadataURI: string;
    vibeScore: number;
    timestamp: number;
}

const tokens: TokenData[] = [];

export const Store = {
    addToken: (token: TokenData) => {
        tokens.unshift(token);
        // Keep only last 100
        if (tokens.length > 100) tokens.pop();
    },
    getTokens: () => tokens,
};
