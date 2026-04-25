import React from 'react';

/**
 * FeatureCard: A reusable component for displaying system features.
 * Adheres to Muted Navy surface and Poppins/Inter typography.
 */
export function FeatureCard({ title, description, icon: Icon }) {
  return (
    <div className="bg-muted-navy border border-white/5 rounded-xl p-6 shadow-xl transition-transform hover:scale-[1.02]">
      <div className="bg-vivid-cyan/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
        <Icon className="text-vivid-cyan" size={24} />
      </div>
      <h3 className="font-display text-xl font-semibold text-off-white mb-2">
        {title}
      </h3>
      <p className="font-sans text-cool-gray leading-relaxed">
        {description}
      </p>
    </div>
  );
}
