import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { RootState } from '@/app/store';

export const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const { token } = useSelector((state: RootState) => state.auth);

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-deep-slate/0 via-deep-slate/80 to-deep-slate z-10" />
        <img 
          src="/assets/flood-theme.png" 
          alt="Flood Context" 
          className="w-full h-full object-cover opacity-30 mix-blend-overlay scale-110 animate-pulse"
          style={{ animationDuration: '8s' }}
        />
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-vivid-cyan/20 blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] rounded-full bg-flood-blue/20 blur-[100px]" />
      </div>
      
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-20">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-vivid-cyan/10 border border-vivid-cyan/20 text-vivid-cyan text-xs font-semibold uppercase tracking-wider animate-fade-in">
            <ShieldCheck size={14} />
            Community-Powered Resilience
          </div>
          
          <h1 className="font-display text-4xl md:text-5xl lg:text-7xl font-black leading-[1.1] tracking-tight text-white">
            When the Waters <br />
            <span className="text-vivid-cyan italic relative">
              Rise
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-vivid-cyan/30 blur-sm" />
            </span>, Knowledge is Safety.
          </h1>
          
          <p className="text-lg md:text-xl text-slate-300 max-w-xl leading-relaxed font-medium">
            FloodSense transforms raw community reports into actionable AI intelligence. Experience Cebu's first real-time flood response network.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button 
              onClick={() => navigate(token ? '/dashboard' : '/map')} 
              className="w-full sm:w-auto px-10 py-4 bg-vivid-cyan text-deep-slate font-display font-medium text-lg rounded-2xl group shadow-[0_0_30px_rgba(34,211,238,0.3)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center"
            >
              {token ? 'Go to Dashboard' : 'Explore Live Map'}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => navigate('/report')}
              className="w-full sm:w-auto px-10 py-4 bg-white/5 backdrop-blur-xl border border-white/10 text-white font-display font-medium text-lg rounded-2xl hover:bg-white/10 transition-all flex items-center justify-center"
            >
              Submit Report
            </button>
          </div>

          <div className="flex items-center gap-8 pt-6">
            <div className="flex flex-col">
              <span className="text-3xl font-black text-white">100%</span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-vivid-cyan font-bold">Verified Data</span>
            </div>
            <div className="h-10 w-[1px] bg-white/10" />
            <div className="flex flex-col">
              <span className="text-3xl font-black text-white">24/7</span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-vivid-cyan font-bold">AI Monitoring</span>
            </div>
          </div>
        </div>

        {/* Hero Visual - Refined Mockup */}
        <div className="relative lg:block hidden group">
          <div className="relative z-10 rounded-[2.5rem] border border-white/10 overflow-hidden shadow-2xl bg-muted-navy/50 backdrop-blur-sm p-4 rotate-2 group-hover:rotate-0 transition-transform duration-700">
             <div className="h-[550px] w-full bg-deep-slate rounded-[1.5rem] relative overflow-hidden border border-white/5">
               <img src="/assets/flood-theme.png" alt="Map Preview" className="absolute inset-0 w-full h-full object-cover opacity-40 grayscale group-hover:grayscale-0 transition-all duration-1000" />
               <div className="absolute inset-0 bg-gradient-to-t from-deep-slate via-transparent to-transparent" />
               
               {/* Floating Map UI Elements */}
               <div className="absolute top-6 left-6 right-6 bg-deep-slate/90 backdrop-blur-xl p-4 rounded-2xl border border-white/10 flex items-center justify-between shadow-2xl">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-brickwood-crimson animate-pulse shadow-[0_0_10px_rgba(190,18,60,0.5)]" />
                    <span className="text-sm font-bold text-white uppercase tracking-tight">Active Inundation: Downtown</span>
                  </div>
                  <div className="px-2 py-1 bg-brickwood-crimson/20 rounded-md text-[10px] font-black text-brickwood-crimson border border-brickwood-crimson/30">
                    CRITICAL
                  </div>
               </div>

               <div className="absolute bottom-6 right-6 w-56 bg-deep-slate/90 backdrop-blur-xl p-5 rounded-2xl border border-white/10 space-y-3 shadow-2xl">
                  <div className="flex justify-between items-end">
                    <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Water Level</span>
                    <span className="text-2xl font-black text-vivid-cyan">85cm</span>
                  </div>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full w-[85%] bg-vivid-cyan shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
                  </div>
               </div>

               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="relative scale-150">
                     <div className="absolute -inset-6 bg-vivid-cyan/20 rounded-full animate-ping" />
                     <div className="bg-vivid-cyan text-deep-slate p-3 rounded-2xl shadow-2xl relative z-10">
                        <ShieldCheck className="w-8 h-8 font-bold" />
                     </div>
                  </div>
               </div>
             </div>
          </div>
          
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-vivid-cyan/10 blur-[80px] rounded-full" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-flood-blue/20 blur-[80px] rounded-full" />
        </div>
      </div>
    </section>
  );
};
