import { motion } from 'framer-motion';
import type { Token } from '../hooks/useTokenFeed';
import { Rocket, Skull, Zap } from 'lucide-react';

interface Props {
    token: Token;
}

export function TokenCard({ token }: Props) {
    const isDegen = token.vibeScore > 80;
    const isTrash = token.vibeScore < 20;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`relative p-4 rounded-xl border-2 ${isDegen ? 'border-nad-green bg-nad-green/10 neon-border' :
                isTrash ? 'border-red-500 bg-red-500/10' :
                    'border-monad-purple bg-monad-purple/10'
                } backdrop-blur-md overflow-hidden`}
        >
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-xl font-bold flex items-center gap-2">
                        {token.name}
                        <span className="text-sm opacity-70">${token.symbol}</span>
                    </h3>
                    <p className="text-xs text-gray-400 font-mono truncate w-48">{token.address}</p>
                </div>
                <div className={`flex items-center gap-1 font-bold text-lg ${isDegen ? 'text-nad-green vibe-glow' : 'text-white'}`}>
                    {isDegen ? <Rocket size={20} /> : isTrash ? <Skull size={20} /> : <Zap size={20} />}
                    {token.vibeScore}
                </div>
            </div>

            <div className="relative aspect-square rounded-lg overflow-hidden bg-black/50 mb-3 group">
                <img
                    src={token.metadataURI.startsWith('http') ? token.metadataURI : 'https://placehold.co/400x400/1a1a1a/FFF?text=No+Image'}
                    alt={token.name}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://placehold.co/400x400/1a1a1a/FFF?text=No+Image';
                    }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black to-transparent">
                    <span className="text-xs font-mono text-gray-300">Creator: {token.creator.slice(0, 6)}...</span>
                </div>
            </div>

            <a
                href={`https://testnet.nad.fun/token/${token.address}`}
                target="_blank"
                rel="noreferrer"
                className="block w-full py-2 text-center rounded-lg bg-white/10 hover:bg-white/20 transition-colors font-bold text-sm"
            >
                View on Nad.fun
            </a>
        </motion.div>
    );
}
