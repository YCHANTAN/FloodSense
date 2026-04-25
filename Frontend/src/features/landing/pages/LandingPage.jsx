import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Map, Camera, Navigation, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/Button/Button';
import { FeatureCard } from '../components/FeatureCard';

export default function LandingPage() {
  const navigate = useNavigate();

  const features = [
    {
      title: "Live Risk Map",
      description: "Real-time visualization of urban flood hazards across Cebu City, updated by the community.",
      icon: Map
    },
    {
      title: "AI Depth Estimator",
      description: "Submit photos and let our Gemini-powered vision system estimate water depth with high accuracy.",
      icon: Camera
    },
    {
      title: "Safe-Route Navigator",
      description: "Navigate through the city using routes dynamically optimized to avoid high-risk flooded zones.",
      icon: Navigation
    }
  ];

  return (
    <div className="min-h-screen bg-deep-slate overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-6 text-center lg:pt-32 lg:pb-24">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-vivid-cyan/10 border border-vivid-cyan/20 text-vivid-cyan text-xs font-semibold uppercase tracking-wider mb-6">
            <ShieldCheck size={14} />
            Community-Powered Safety
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-off-white mb-6 leading-tight">
            Navigate safely through <br />
            <span className="text-vivid-cyan">urban floods.</span>
          </h1>
          <p className="font-sans text-lg md:text-xl text-cool-gray mb-10 max-w-2xl mx-auto">
            FloodSense combines community reporting with AI-verification to provide the most accurate, real-time flood intelligence for urban environments.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              onClick={() => navigate('/map')} 
              className="w-full sm:w-auto px-8 py-6 text-lg"
            >
              Get Real-Time Map
            </Button>
            <Button 
              variant="secondary" 
              onClick={() => navigate('/report')}
              className="w-full sm:w-auto px-8 py-6 text-lg"
            >
              Submit Report
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-6 py-16 bg-deep-slate/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer / Mission */}
      <footer className="px-6 py-12 border-t border-white/5">
        <div className="max-w-6xl mx-auto text-center">
          <p className="font-sans text-sm text-cool-gray">
            &copy; {new Date().getFullYear()} FloodSense. Built for urban resilience.
          </p>
        </div>
      </footer>
    </div>
  );
}
