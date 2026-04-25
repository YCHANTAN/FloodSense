import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Loader2 } from 'lucide-react';

export function Button({ 
  className, 
  variant = 'primary', 
  isLoading, 
  children, 
  disabled, 
  ...props 
}) {
  const variants = {
    primary: 'bg-vivid-cyan text-deep-slate hover:bg-vivid-cyan/90',
    secondary: 'bg-white/10 backdrop-blur-md border border-white/5 text-white hover:bg-white/20 rounded-full',
    danger: 'bg-brickwood-crimson text-white hover:bg-brickwood-crimson/90',
  };

  const baseStyles = 'inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vivid-cyan disabled:pointer-events-none disabled:opacity-50';

  return (
    <button
      className={twMerge(clsx(baseStyles, variants[variant], className))}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
}
