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
    const now = Date.now();
    const hour = 60 * 60 * 1000;
    const day = 24 * hour;

    // 1. Live/Now
    Store.addToken({
        address: '0x1234567890abcdef1234567890abcdef12345678',
        name: 'MoltDog',
        symbol: 'MDOG',
        creator: '0xcreator...',
        metadataURI: 'https://placehold.co/400x400/836EF9/FFF?text=MoltDog',
        vibeScore: 95,
        timestamp: now,
    });
    Store.addToken({
        address: '0xabcdef...',
        name: 'TrashCoin',
        symbol: 'TRASH',
        creator: '0xanon...',
        metadataURI: '',
        vibeScore: 10,
        timestamp: now,
    });

    // 2. 2 Hours Ago (Should show in 24h, 3d, All)
    Store.addToken({
        address: '0xretro...',
        name: 'RetroRun',
        symbol: 'RETRO',
        creator: '0xvintage...',
        metadataURI: 'https://placehold.co/400x400/FF00FF/FFF?text=RETRO',
        vibeScore: 88,
        timestamp: now - (2 * hour),
    });

    // 3. 26 Hours Ago (Should show in 3d, All)
    Store.addToken({
        address: '0xyesterday...',
        name: 'YesterdayYield',
        symbol: 'YIELD',
        creator: '0xfarmer...',
        metadataURI: 'https://placehold.co/400x400/00FF00/000?text=YIELD',
        vibeScore: 42,
        timestamp: now - (26 * hour),
    });

    // 4. 4 Days Ago (Should only show in All)
    Store.addToken({
        address: '0xancient...',
        name: 'JurassicGem',
        symbol: 'DINO',
        creator: '0xfossil...',
        metadataURI: 'https://placehold.co/400x400/964B00/FFF?text=DINO',
        vibeScore: 99,
        timestamp: now - (4 * day),
    });

    res.json({ message: 'Seeded with history' });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);

    // Start the Watchtower agent
    import('./watchtower').then(({ startWatchtower }) => {
        startWatchtower();
    });
});
