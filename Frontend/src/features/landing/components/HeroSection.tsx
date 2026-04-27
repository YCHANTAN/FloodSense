import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ShieldCheck, AlertTriangle } from 'lucide-react';
import Button from '@/components/Button/Button';

export const HeroSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Abstract Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-vivid-cyan blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] rounded-full bg-desaturated-teal blur-[100px]" />
      </div>
      
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-vivid-cyan/10 border border-vivid-cyan/20 text-vivid-cyan text-xs font-semibold uppercase tracking-wider animate-fade-in">
            <ShieldCheck size={14} />
            Community-Powered Safety for Cebu City
          </div>
          
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-off-white">
            Navigate Cebu's <br />
            <span className="text-vivid-cyan underline decoration-vivid-cyan/30 decoration-4 underline-offset-4 italic">Floods</span> with AI.
          </h1>
          
          <p className="text-base md:text-lg text-cool-gray max-w-xl leading-relaxed">
            FloodSense combines community reports with Gemini AI verification to provide real-time, street-level flood intelligence. Stay dry, stay safe.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button 
              onClick={() => navigate('/map')} 
              className="w-full sm:w-auto px-8 py-3.5 bg-vivid-cyan text-deep-slate font-display font-bold text-base rounded-xl group shadow-[0_0_20px_rgba(6,182,212,0.2)] hover:bg-vivid-cyan/90 transition-all flex items-center justify-center"
            >
              View Live Map
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => navigate('/report')}
              className="w-full sm:w-auto px-8 py-3.5 bg-white/10 backdrop-blur-md border border-white/10 text-white font-display font-semibold text-base rounded-full hover:bg-white/20 transition-all flex items-center justify-center"
            >
              Submit a Report
            </button>
          </div>

          <div className="flex items-center gap-6 pt-4 grayscale opacity-60">
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-off-white">4.9/5</span>
              <span className="text-[10px] uppercase tracking-widest text-cool-gray">Trust Score</span>
            </div>
            <div className="h-8 w-[1px] bg-white/10" />
            <div className="flex flex-col text-xs text-cool-gray">
              <span>Backed by</span>
              <span className="font-bold text-off-white">Cebu Resilience Initiative</span>
            </div>
          </div>
        </div>

        {/* Hero Visual */}
        <div className="relative lg:block hidden">
          <div className="relative z-10 rounded-3xl border border-white/10 overflow-hidden shadow-2xl shadow-vivid-cyan/10 bg-muted-navy">
             {/* Mockup of the Map UI */}
             <div className="h-[500px] w-full bg-deep-slate p-4 relative overflow-hidden">
               <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/dark-v11/static/123.9,10.3,12,0/800x600?access_token=pk.xxx')] bg-cover opacity-40" />
               
               {/* Floating UI Elements */}
               <div className="absolute top-4 left-4 right-4 bg-muted-navy/90 backdrop-blur-md p-3 rounded-xl border border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-brickwood-crimson animate-pulse" />
                    <span className="text-xs font-semibold">Critical Flood Alert: Colon St.</span>
                  </div>
                  <span className="text-[10px] text-cool-gray">2 mins ago</span>
               </div>

               <div className="absolute bottom-4 left-4 w-48 bg-muted-navy/90 backdrop-blur-md p-4 rounded-xl border border-white/5 space-y-2">
                  <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full w-[70%] bg-vivid-cyan" />
                  </div>
                  <div className="flex justify-between text-[10px]">
                    <span>Safety Score</span>
                    <span className="text-vivid-cyan font-bold">72%</span>
                  </div>
               </div>

               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="relative">
                     <div className="absolute -inset-4 bg-brickwood-crimson/20 rounded-full animate-ping" />
                     <div className="bg-brickwood-crimson p-2 rounded-full shadow-lg relative z-10">
                        <AlertTriangle className="text-white w-6 h-6" />
                     </div>
                  </div>
               </div>
             </div>
          </div>
          
          {/* Floating Accents */}
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-vivid-cyan/20 blur-2xl rounded-full" />
          <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-desaturated-teal/20 blur-3xl rounded-full" />
        </div>
      </div>
    </section>
  );
};
