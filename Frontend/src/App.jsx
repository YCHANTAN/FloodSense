import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="min-h-screen bg-deep-slate text-off-white font-sans">
      <header className="p-4 border-b border-white/10">
        <h1 className="text-xl font-display font-bold text-vivid-cyan">FloodSense</h1>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
