import React from 'react';
import { Navbar } from '@/components/Navbar/Navbar';
import { HeroSection } from '../components/HeroSection';
import { PartnerLogos } from '../components/PartnerLogos';
import { FeaturesBentoGrid } from '../components/FeaturesBentoGrid';
import { LandingCTA } from '../components/LandingCTA';
import { LandingFooter } from '../components/LandingFooter';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-deep-slate text-off-white font-sans selection:bg-vivid-cyan/30">
      <Navbar />
      <main>
        <HeroSection />
        <PartnerLogos />
        <FeaturesBentoGrid />
        <LandingCTA />
      </main>
      <LandingFooter />
    </div>
  );
}
