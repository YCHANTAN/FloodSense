import React from 'react';

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  iconClassName?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = "", iconOnly = false, iconClassName = "w-10 h-10", ...props }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${iconClassName} drop-shadow-md`}
        {...props}
      >
        {/* Base Droplet / Location Pin Shape */}
        <path
          d="M50 5C25.147 5 5 25.147 5 50C5 75 50 95 50 95C50 95 95 75 95 50C95 25.147 74.853 5 50 5Z"
          fill="#1e293b" 
          stroke="#06b6d4" 
          strokeWidth="6"
        />
        
        {/* Navigation Route / Wave intersection */}
        <path
          d="M5 55C25 55 30 75 50 75C70 75 75 55 95 55"
          stroke="#06b6d4"
          strokeWidth="8"
          strokeLinecap="round"
        />
        
        {/* Inner Navigation Dot (The User) */}
        <circle cx="50" cy="35" r="10" fill="#06b6d4" />
      </svg>
      
      {/* Brand Text */}
      {!iconOnly && (
        <span className="font-poppins font-bold text-slate-50 tracking-wide text-xl">
          Flood<span className="text-cyan-500">Sense</span>
        </span>
      )}
    </div>
  );
};
