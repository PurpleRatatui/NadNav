import { TokenCard } from './components/TokenCard';
import { useTokenFeed } from './hooks/useTokenFeed';
import { Radar } from 'lucide-react';

function App() {
  const tokens = useTokenFeed();

  return (
    <div className="min-h-screen bg-monad-dark text-white p-8">
      <header className="max-w-7xl mx-auto mb-12 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-monad-purple rounded-full neon-border animate-pulse">
            <Radar size={32} className="text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-monad-purple to-nad-green">
              NadNav Watchtower
            </h1>
            <p className="text-monad-light">Real-time Moltiverse Token Scanner</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-mono font-bold text-nad-green">{tokens.length}</div>
          <div className="text-xs text-gray-400 uppercase tracking-wider">Scanned Tokens</div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tokens.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center py-20 opacity-50">
            <Radar size={64} className="mb-4 animate-spin-slow" />
            <p className="text-xl">Scanning for new tokens...</p>
          </div>
        ) : (
          tokens.map((token) => (
            <TokenCard key={token.address} token={token} />
          ))
        )}
      </main>
    </div>
  );
}

export default App;
