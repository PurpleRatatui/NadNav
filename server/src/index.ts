import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

import { Store } from './store';

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'NadNav Agent is running' });
});

app.get('/api/feed', (req, res) => {
    const tokens = Store.getTokens();
    res.json({ tokens });
});

app.post('/api/debug/seed', (req, res) => {
    Store.addToken({
        address: '0x1234567890abcdef1234567890abcdef12345678',
        name: 'MoltDog',
        symbol: 'MDOG',
        creator: '0xcreator...',
        metadataURI: 'https://placehold.co/400x400/836EF9/FFF?text=MoltDog',
        vibeScore: 95,
        timestamp: Date.now(),
    });
    Store.addToken({
        address: '0xabcdef...',
        name: 'TrashCoin',
        symbol: 'TRASH',
        creator: '0xanon...',
        metadataURI: '',
        vibeScore: 10,
        timestamp: Date.now(),
    });
    res.json({ message: 'Seeded' });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);

    // Start the Watchtower agent
    import('./watchtower').then(({ startWatchtower }) => {
        startWatchtower();
    });
});
