import React from 'react';
import { useNavigate } from 'react-router-dom';

export const LandingCTA: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 px-6 relative overflow-hidden">
      <div className="absolute inset-0 z-0 bg-vivid-cyan/5 blur-3xl rounded-full translate-y-1/2 scale-150" />
      
      <div className="max-w-3xl mx-auto text-center space-y-6 relative z-10">
        <h2 className="text-3xl md:text-5xl font-bold font-display leading-tight tracking-tight text-off-white">
          Control your commute <br /> in seconds.
        </h2>
        <p className="text-lg text-cool-gray max-w-xl mx-auto font-sans">
          Join thousands of Cebuano commuters making the city safer and more predictable through shared intelligence.
        </p>
        <div className="flex justify-center pt-4">
          <button 
            onClick={() => navigate('/map')} 
            className="px-10 py-3.5 bg-vivid-cyan text-deep-slate font-display font-bold text-lg rounded-full shadow-[0_0_30px_rgba(6,182,212,0.3)] hover:scale-105 transition-transform"
          >
            Get Started Free
          </button>
        </div>
      </div>
    </section>
  );
};
