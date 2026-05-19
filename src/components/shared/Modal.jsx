"use client";

import React from "react";

export default function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-brand-dark/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg rounded-3xl border border-white/5 bg-brand-surface p-6 sm:p-8 shadow-2xl animate-fade-in z-10">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-white tracking-tight">{title}</h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/5 text-brand-muted hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}