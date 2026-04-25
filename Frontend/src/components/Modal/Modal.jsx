import React from 'react';
import ReactDOM from 'react-dom';
import { X } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

export function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
      <div 
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm" 
        onClick={onClose} 
      />
      <div className={twMerge(
        "relative w-full max-w-lg overflow-hidden rounded-t-2xl sm:rounded-2xl bg-muted-navy shadow-xl transition-all",
        "animate-in fade-in slide-in-from-bottom-4 duration-300"
      )}>
        <div className="flex items-center justify-between border-b border-white/10 p-4">
          <h2 className="text-lg font-display font-semibold text-off-white">{title}</h2>
          <button 
            onClick={onClose}
            className="rounded-full p-1 text-cool-gray hover:bg-white/10 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}
