import React from 'react';
import { Link } from 'react-router-dom';
import { Waves } from 'lucide-react';

export const LandingFooter: React.FC = () => {
  return (
    <footer className="py-12 px-6 border-t border-white/5 bg-muted-navy/30">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-2">
          <div className="bg-vivid-cyan p-1.5 rounded-lg">
            <Waves className="text-deep-slate w-4 h-4" />
          </div>
          <span className="font-display font-bold text-off-white">
            Flood<span className="text-vivid-cyan">Sense</span>
          </span>
        </div>
        
        <div className="flex gap-8 text-sm text-cool-gray font-sans">
          <Link to="#" className="hover:text-vivid-cyan transition-colors">Privacy</Link>
          <Link to="#" className="hover:text-vivid-cyan transition-colors">Terms</Link>
          <Link to="#" className="hover:text-vivid-cyan transition-colors">Data Policy</Link>
          <Link to="#" className="hover:text-vivid-cyan transition-colors">Contact</Link>
        </div>
        
        <p className="text-xs text-cool-gray font-sans">
          &copy; {new Date().getFullYear()} FloodSense Cebu. Resilience through Intelligence.
        </p>
      </div>
    </footer>
  );
};
