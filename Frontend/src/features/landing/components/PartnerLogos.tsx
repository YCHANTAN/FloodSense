import React from 'react';
import { Waves, ShieldCheck, CheckCircle2, Zap, Building2, CloudRain } from 'lucide-react';
import LogoLoop from '@/components/LogoLoop';

export const PartnerLogos: React.FC = () => {
  const partnerLogos = [
    {
      node: (
        <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/5 whitespace-nowrap">
          <Waves className="w-5 h-5 text-vivid-cyan" />
          <span className="font-display font-bold text-lg text-off-white">CEBU CITY</span>
        </div>
      )
    },
    {
      node: (
        <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/5 whitespace-nowrap">
          <ShieldCheck className="w-5 h-5 text-vivid-cyan" />
          <span className="font-display font-bold text-lg text-off-white">NDRRMC</span>
        </div>
      )
    },
    {
      node: (
        <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/5 whitespace-nowrap">
          <CheckCircle2 className="w-5 h-5 text-vivid-cyan" />
          <span className="font-display font-bold text-lg text-off-white">PAGASA</span>
        </div>
      )
    },
    {
      node: (
        <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/5 whitespace-nowrap">
          <Zap className="w-5 h-5 text-vivid-cyan" />
          <span className="font-display font-bold text-lg text-off-white">SM CITY</span>
        </div>
      )
    },
    {
      node: (
        <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/5 whitespace-nowrap">
          <Building2 className="w-5 h-5 text-vivid-cyan" />
          <span className="font-display font-bold text-lg text-off-white">AYALA CENTER</span>
        </div>
      )
    },
    {
      node: (
        <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/5 whitespace-nowrap">
          <CloudRain className="w-5 h-5 text-vivid-cyan" />
          <span className="font-display font-bold text-lg text-off-white">DRRMO</span>
        </div>
      )
    }
  ];

  return (
    <section className="py-12 border-y border-white/5 bg-deep-slate/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 opacity-40 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-700">
         <LogoLoop 
          logos={partnerLogos} 
          speed={40} 
          gap={24} 
          logoHeight={52} 
          fadeOut={true} 
          fadeOutColor="#0f172a" 
          pauseOnHover={true}
        />
      </div>
    </section>
  );
};
