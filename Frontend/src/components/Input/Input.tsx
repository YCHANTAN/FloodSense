import React, { forwardRef } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, ...props }, ref) => {
    return (
      <div className="w-full space-y-2">
        {label && (
          <label className="block text-sm font-medium text-cool-gray font-sans">
            {label}
          </label>
        )}
        <input
          type={type}
          className={cn(
            "flex h-12 w-full rounded-xl border border-white/10 bg-deep-slate px-4 py-3 text-off-white font-sans ring-offset-deep-slate transition-all placeholder:text-cool-gray/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vivid-cyan focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-brickwood-crimson focus-visible:ring-brickwood-crimson",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="text-xs font-medium text-brickwood-crimson font-sans italic">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
