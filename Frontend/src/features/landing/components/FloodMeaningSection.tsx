import React from 'react';
import { Info, Droplets, Landmark, Users } from 'lucide-react';

export const FloodMeaningSection: React.FC = () => {
  return (
    <section className="py-24 bg-deep-slate relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-flood-blue/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/4" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative order-2 lg:order-1">
            <div className="aspect-[4/5] rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl relative">
              <img 
                src="/assets/flood-theme.png" 
                alt="The Reality of Flooding" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-slate via-transparent to-transparent opacity-60" />
              
              {/* Overlay Quote */}
              <div className="absolute bottom-8 left-8 right-8 p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10">
                <p className="text-white italic font-medium leading-relaxed">
                  "Flooding is not just an environmental event; it's a disruption of life, economy, and safety. Understanding it is the first step to resilience."
                </p>
              </div>
            </div>
            
            {/* Decorative Element */}
            <div className="absolute -top-6 -left-6 bg-vivid-cyan p-4 rounded-2xl shadow-xl shadow-vivid-cyan/20">
              <Info className="text-deep-slate w-8 h-8" />
            </div>
          </div>

          <div className="space-y-10 order-1 lg:order-2">
            <div className="space-y-4">
              <h2 className="text-vivid-cyan font-bold uppercase tracking-[0.3em] text-sm">The Reality</h2>
              <h3 className="text-4xl md:text-5xl font-black text-white leading-tight">
                What the Flood <br /> Really Means
              </h3>
              <p className="text-lg text-slate-400 leading-relaxed">
                In Cebu City, a few centimeters of water can mean the difference between a normal commute and a city-wide standstill. Flooding impacts more than just our streets—it affects our community's pulse.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-3">
                <div className="w-12 h-12 bg-flood-blue/20 rounded-xl flex items-center justify-center border border-flood-blue/30">
                  <Landmark className="text-vivid-cyan w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold text-white">Economic Impact</h4>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Billions are lost annually in productivity and infrastructure damage due to unpredictable urban flooding.
                </p>
              </div>

              <div className="space-y-3">
                <div className="w-12 h-12 bg-vivid-cyan/20 rounded-xl flex items-center justify-center border border-vivid-cyan/30">
                  <Users className="text-vivid-cyan w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold text-white">Human Safety</h4>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Real-time data saves lives by allowing citizens to avoid hazardous routes and prepare for rising waters.
                </p>
              </div>

              <div className="space-y-3">
                <div className="w-12 h-12 bg-brickwood-crimson/20 rounded-xl flex items-center justify-center border border-brickwood-crimson/30">
                  <Droplets className="text-brickwood-crimson w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold text-white">Urban Health</h4>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Stagnant floodwaters pose significant health risks. Rapid reporting helps authorities act faster.
                </p>
              </div>

              <div className="space-y-3">
                <div className="w-12 h-12 bg-storm-gray/20 rounded-xl flex items-center justify-center border border-storm-gray/30">
                  <Droplets className="text-storm-gray w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold text-white">Infrastructure</h4>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Data-driven insights help city planners identify critical failure points in our drainage systems.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
