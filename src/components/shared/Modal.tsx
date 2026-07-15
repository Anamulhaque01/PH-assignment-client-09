"use client";

import React from "react";

// Explicit property constraint definitions blueprint matching Next UI requirements
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Absolute Dark Ambient Overlay Background */}
      <div className="absolute inset-0 bg-brand-dark/60 backdrop-blur-sm" onClick={onClose} />
      
      {/* Centered Content Card Modal Box Workspace Container */}
      <div className="relative w-full max-w-lg rounded-3xl border border-white/5 bg-brand-surface p-6 sm:p-8 shadow-2xl z-10 animate-fade-in">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-white tracking-tight">{title}</h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/5 text-brand-muted hover:text-white transition-colors hover:cursor-pointer"
          >
            ✕
          </button>
        </div>
        
        {/* Child Form Elements Content View Container */}
        {children}
      </div>
    </div>
  );
}