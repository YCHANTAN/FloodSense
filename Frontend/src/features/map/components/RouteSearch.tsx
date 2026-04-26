import React from 'react';
import { Search, Map as MapIcon } from 'lucide-react';

const RouteSearch: React.FC = () => {
  return (
    <div className="absolute top-4 left-4 right-4 z-10 max-w-lg mx-auto">
      <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-full px-6 py-3 flex items-center shadow-2xl transition-all hover:bg-white/15 group">
        <Search className="text-white/60 group-hover:text-white transition-colors" size={20} />
        <input
          type="text"
          placeholder="Where are you heading?"
          className="bg-transparent border-none focus:ring-0 text-white placeholder:text-white/40 w-full px-4 font-inter text-sm"
        />
        <div className="h-6 w-[1px] bg-white/10 mx-2" />
        <button className="text-[#06b6d4] hover:text-[#0891b2] transition-colors">
          <MapIcon size={20} />
        </button>
      </div>
    </div>
  );
};

export default RouteSearch;
