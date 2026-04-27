import React from 'react';
import { Map as MapIcon, Camera, Navigation, ArrowRight } from 'lucide-react';

export const FeaturesBentoGrid: React.FC = () => {
  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-12 space-y-3">
        <h2 className="text-2xl md:text-4xl font-bold font-display tracking-tight text-off-white">
          A clean experience for <br />
          <span className="text-cool-gray italic font-normal text-xl md:text-3xl">a messy urban world.</span>
        </h2>
        <p className="text-sm md:text-base text-cool-gray max-w-xl mx-auto font-sans">
          FloodSense provides residents of Cebu City with the essential tools to navigate monsoons and urban drainage challenges.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 auto-rows-[240px]">
        {/* Large Feature */}
        <div className="md:col-span-2 md:row-span-2 rounded-2xl bg-muted-navy border border-white/5 p-6 relative overflow-hidden group">
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div className="space-y-3 max-w-md">
              <div className="w-10 h-10 rounded-xl bg-vivid-cyan/10 border border-vivid-cyan/20 flex items-center justify-center">
                <MapIcon className="text-vivid-cyan w-5 h-5" />
              </div>
              <h3 className="text-2xl font-bold font-display text-off-white">Live Risk Mapping</h3>
              <p className="text-sm md:text-base text-cool-gray leading-relaxed font-sans">
                Our core interface provides a real-time visualization of flood depths across Cebu's major arteries and residential zones, validated by community reports.
              </p>
            </div>
            <div className="flex items-center gap-2 text-vivid-cyan font-semibold text-sm group-hover:gap-3 transition-all cursor-pointer">
              Explore the Map <ArrowRight size={16} />
            </div>
          </div>
          
          {/* Visual Decoration */}
          <div className="absolute top-1/2 right-[-5%] w-[55%] h-[75%] bg-deep-slate rounded-xl border border-white/10 -rotate-12 translate-y-[-15%] group-hover:rotate-0 transition-transform duration-700 opacity-40" />
        </div>

        {/* AI Feature */}
        <div className="rounded-2xl bg-muted-navy border border-white/5 p-6 relative overflow-hidden group">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-vivid-cyan/10 border border-vivid-cyan/20 flex items-center justify-center">
              <Camera className="text-vivid-cyan w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold font-display text-off-white">Gemini AI Estimation</h3>
            <p className="text-xs text-cool-gray font-sans">
              Simply snap a photo. Our AI instantly estimates water depth to within 5cm accuracy.
            </p>
          </div>
          <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-vivid-cyan/5 rounded-full blur-xl" />
        </div>

        {/* Navigation Feature */}
        <div className="rounded-2xl bg-muted-navy border border-white/5 p-6 relative overflow-hidden group">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-desaturated-teal/10 border border-desaturated-teal/20 flex items-center justify-center">
              <Navigation className="text-desaturated-teal w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold font-display text-off-white">Safe-Route Finder</h3>
            <p className="text-xs text-cool-gray font-sans">
              Dynamically generated paths that prioritize safety and accessibility over speed during floods.
            </p>
          </div>
          <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-desaturated-teal/5 rounded-full blur-xl" />
        </div>
      </div>
    </section>
  );
};
