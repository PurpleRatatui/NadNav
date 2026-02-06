import { TokenCard } from './components/TokenCard';
import { useTokenFeed } from './hooks/useTokenFeed';
import { Radar } from 'lucide-react';

function App() {
  const tokens = useTokenFeed();

  return (
    <div className="min-h-screen relative">
      {/* Ambient Glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-monad-purple/30 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 p-8">
        <header className="max-w-7xl mx-auto mb-12 flex items-center justify-between glass-panel p-6 rounded-2xl">
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
          <div className="text-right">
            <div className="text-4xl font-mono font-bold text-white vibe-glow">{tokens.length}</div>
            <div className="text-xs text-monad-purple font-bold tracking-[0.2em] uppercase">Tokens Scanned</div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tokens.length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center py-32 opacity-50 glass-panel rounded-3xl">
              <Radar size={80} className="mb-6 text-monad-purple animate-spin-slow" />
              <p className="text-2xl font-mono text-monad-light">SCANNING MEMPOOL...</p>
            </div>
          ) : (
            tokens.map((token) => (
              <TokenCard key={token.address} token={token} />
            ))
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
