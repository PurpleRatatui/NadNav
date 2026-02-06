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
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.02, rotate: isDegen ? 1 : 0 }}
            className={`
                relative p-5 rounded-2xl border backdrop-blur-xl overflow-hidden transition-all duration-300
                ${isDegen
                    ? 'border-nad-green/50 bg-nad-green/5 neon-border-green'
                    : isTrash
                        ? 'border-red-500/30 bg-red-900/10 grayscale-[0.5]'
                        : 'border-monad-purple/30 bg-monad-purple/5 hover:border-monad-purple/60'
                }
            `}
        >
            {/* Holographic Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

            <div className="flex justify-between items-start mb-4 relative z-10">
                <div className="overflow-hidden">
                    <h3 className="text-2xl font-black font-sans tracking-tight mb-1 flex items-center gap-2">
                        {token.name}
                        {isDegen && <span className="text-xs px-2 py-0.5 bg-nad-green text-black rounded font-bold uppercase">GEM</span>}
                    </h3>
                    <div className="flex items-center gap-2 text-xs font-mono text-monad-light opacity-80">
                        <span className="text-nad-green">$</span>{token.symbol}
                    </div>
                </div>
                <div className={`
                    flex items-center gap-1.5 font-bold text-xl px-3 py-1 rounded-lg border
                    ${isDegen
                        ? 'text-nad-green border-nad-green/30 bg-nad-green/10 vibe-glow'
                        : 'text-white border-white/10 bg-white/5'
                    }
                `}>
                    {isDegen ? <Rocket size={18} /> : isTrash ? <Skull size={18} /> : <Zap size={18} />}
                    {token.vibeScore}
                </div>
            </div>

            <div className="relative aspect-video rounded-xl overflow-hidden bg-black/50 mb-4 group border border-white/5 mx-auto">
                <img
                    src={token.metadataURI.startsWith('http') ? token.metadataURI : 'https://placehold.co/600x400/0f0e17/836EF9?text=NAD.FUN'}
                    alt={token.name}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700 ease-out"
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://placehold.co/600x400/0f0e17/836EF9?text=NO+IMG';
                    }}
                />
            </div>

            <div className="flex justify-between items-center gap-3 relative z-10">
                <div className="text-xs font-mono text-gray-500">
                    {token.address.slice(0, 4)}...{token.address.slice(-4)}
                </div>
                <a
                    href={`https://nad.fun/token/${token.address}`}
                    target="_blank"
                    rel="noreferrer"
                    className={`
                        px-4 py-2 rounded-lg font-bold text-sm transition-all flex items-center gap-2
                        ${isDegen
                            ? 'bg-nad-green text-black hover:bg-white hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]'
                            : 'bg-white/10 hover:bg-white/20 text-white'
                        }
                    `}
                >
                    APE IN 🚀
                </a>
            </div>
        </motion.div>
    );
}
