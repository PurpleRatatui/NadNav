import { createPublicClient, http, parseAbiItem } from 'viem';
import { Store } from './store';

// Constants for Monad Mainnet and Nad.fun
const RPC_URL = 'https://rpc.monad.xyz';
const CURVE_ADDRESS = '0x6F6B8F1a20703309951a5127c45B49b1CD981A22';

// CurveCreate Event ABI
const curveCreateEventAbi = parseAbiItem(
    'event CurveCreate(address indexed creator, address indexed token, address indexed pool, string name, string symbol, string tokenURI, uint256 virtualMon, uint256 virtualToken, uint256 targetTokenAmount)'
);

export async function startWatchtower() {
    console.log(' Starting NadNav Watchtower on Monad MAINNET...');

    const client = createPublicClient({
        transport: http(RPC_URL)
    });

    try {
        const blockNumber = await client.getBlockNumber();
        console.log(` Connected to Monad Mainnet. Current block: ${blockNumber}`);

        // Watch for new token creation events
        const unwatch = client.watchEvent({
            address: CURVE_ADDRESS,
            event: curveCreateEventAbi,
            onLogs: (logs) => {
                logs.forEach(async (log) => {
                    const { args, transactionHash } = log;
                    if (!args) return;

                    const { creator, token, name, symbol, tokenURI } = args;

                    console.log('\n=======================================');
                    console.log(' New Token Detected on Nad.fun! ');
                    console.log('=======================================');
                    console.log(`Name: ${name} ($${symbol})`);
                    console.log(`Token Address: ${token}`);
                    console.log(`Creator: ${creator}`);
                    console.log(`Metadata URI: ${tokenURI}`);
                    console.log(`Tx Hash: ${transactionHash}`);
                    console.log('---------------------------------------');

                    // Trigger Analysis
                    const score = await analyzeToken(tokenURI as string, name as string, symbol as string);

                    // Save to Store
                    Store.addToken({
                        address: token as string,
                        name: name as string,
                        symbol: symbol as string,
                        creator: creator as string,
                        metadataURI: tokenURI as string,
                        vibeScore: score,
                        timestamp: Date.now(),
                    });
                });
            },
            onError: (error) => {
                console.error('Watchtower Error:', error);
            }
        });

        console.log(' Listening for CurveCreate events...');

        // Handle graceful shutdown
        process.on('SIGINT', () => {
            console.log('Stopping Watchtower...');
            unwatch();
            process.exit(0);
        });

    } catch (error) {
        console.error('Failed to start Watchtower:', error);
    }
}

async function analyzeToken(tokenURI: string, name: string, symbol: string): Promise<number> {
    // Placeholder for AI Analysis
    console.log(`Analyzing vibe for ${name}...`);
    // TODO: Fetch metadata, image, and use LLM

    const randomScore = Math.floor(Math.random() * 100);
    console.log(`Vibe Score: ${randomScore}/100`);
    return randomScore;
}
