import { TokenCard } from './components/TokenCard';
import { useTokenFeed } from './hooks/useTokenFeed';
import { Radar } from 'lucide-react';
import { useState } from 'react';

function App() {
  const tokens = useTokenFeed();
  const [filter, setFilter] = useState<'1h' | '24h' | '3d' | 'all'>('all');

  const filteredTokens = tokens.filter(token => {
    if (filter === 'all') return true;
    const now = Date.now();
    const diff = now - token.timestamp;

    if (filter === '1h') return diff <= 60 * 60 * 1000;
    if (filter === '24h') return diff <= 24 * 60 * 60 * 1000;
    if (filter === '3d') return diff <= 3 * 24 * 60 * 60 * 1000;
    return true;
  });

  return (
    <div className="min-h-screen relative">
      {/* Ambient Glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-monad-purple/30 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 p-8">
        <header className="max-w-7xl mx-auto mb-12 flex flex-col md:flex-row items-center justify-between glass-panel p-6 rounded-2xl gap-6">
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="absolute inset-0 bg-monad-purple blur-xl opacity-50 animate-pulse"></div>
              <div className="relative p-4 bg-black/50 rounded-xl border border-monad-purple/50">
                <Radar size={32} className="text-monad-purple" />
              </div>
            </div>
            <div>
              <h1 className="text-5xl font-black italic tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white via-monad-purple to-nad-green drop-shadow-lg">
                NADNAV
              </h1>
              <div className="flex items-center gap-2 text-monad-light text-sm font-mono mt-1">
                <span className="w-2 h-2 bg-nad-green rounded-full animate-pulse-fast"></span>
                WATCHTOWER ACTIVE
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-black/30 p-1 rounded-xl border border-white/5 backdrop-blur-md">
            {(['1h', '24h', '3d', 'all'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={`
                  px-4 py-2 rounded-lg font-mono text-sm font-bold transition-all uppercase
                  ${filter === t
                    ? 'bg-monad-purple text-white shadow-[0_0_15px_rgba(131,110,249,0.5)]'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }
                `}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="text-right">
            <div className="text-4xl font-mono font-bold text-white vibe-glow">{filteredTokens.length}</div>
            <div className="text-xs text-monad-purple font-bold tracking-[0.2em] uppercase">Tokens Scanned</div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTokens.length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center py-32 opacity-50 glass-panel rounded-3xl">
              <Radar size={80} className="mb-6 text-monad-purple animate-spin-slow" />
              <p className="text-2xl font-mono text-monad-light">
                {tokens.length === 0 ? "SCANNING MEMPOOL..." : "NO TOKENS IN TIMEFRAME"}
              </p>
            </div>
          ) : (
            filteredTokens.map((token) => (
              <TokenCard key={token.address} token={token} />
            ))
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
