"use client";

import React, { useState } from "react";
import Link from "next/link";

// 1. Structural schema for your featured custom showcase sliders
interface SpecialtySlide {
  title: string;
  tagline: string;
  count: string;
  bg: string;
  icon: string;
}

export default function Hero() {
  const featuredSpecialties: SpecialtySlide[] = [
    {
      title: "Cardiology Suite",
      tagline: "Advanced heart care & preventive diagnostics.",
      count: "12 Specialists Available",
      bg: "from-teal-950/40 to-brand-dark",
      icon: "🫀"
    },
    {
      title: "Neurology Center",
      tagline: "Expert care for complex neural & cognitive health.",
      count: "8 Specialists Available",
      bg: "from-blue-950/40 to-brand-dark",
      icon: "🧠"
    },
    {
      title: "Dermatology Lab",
      tagline: "Clinical skincare diagnostics & therapeutic treatments.",
      count: "14 Specialists Available",
      bg: "from-emerald-950/40 to-brand-dark",
      icon: "✨"
    }
  ];

  const [activeIndex, setActiveIndex] = useState<number>(0);

  const nextSlide = (): void => {
    setActiveIndex((prev) => (prev + 1) % featuredSpecialties.length);
  };

  const prevSlide = (): void => {
    setActiveIndex((prev) => (prev - 1 + featuredSpecialties.length) % featuredSpecialties.length);
  };

  return (
    <section className="relative mx-auto max-w-7xl px-6 pt-12 pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Main CTA Messaging Column */}
        <div className="lg:col-span-7 space-y-6 text-left">
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-teal/5 border border-brand-teal/10 px-3 py-1">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-teal animate-pulse" />
            <span className="text-[10px] font-bold tracking-widest text-brand-teal uppercase">
              Next-Gen Medical Registry
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-[1.1]">
            Find and Schedule Your Next{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-teal via-emerald-400 to-white">
              Medical Specialist
            </span>{" "}
            Instantly.
          </h1>

          <p className="text-sm text-brand-muted max-w-xl leading-relaxed">
            Skip the waiting lines entirely. Gain seamless secure entry keys to certified top-tier clinical experts, review consulting session fees, track open calendar dates, and lock in bookings smoothly.
          </p>

          <div className="pt-2 flex flex-wrap gap-4">
            <Link
              href="/doctors"
              className="rounded-xl bg-white px-6 py-3.5 text-xs font-semibold text-black shadow-lg shadow-brand-teal/5 hover:opacity-90 active:scale-[0.98] transition-all"
            >
              Browse Clinicians Directory
            </Link>
            <Link
              href="/dashboard"
              className="rounded-xl bg-brand-surface border border-white/10 px-6 py-3.5 text-xs font-semibold text-white hover:bg-white/5 active:scale-[0.98] transition-all"
            >
              Control Dashboard Workspace
            </Link>
          </div>
        </div>

        {/* Showcase Banner Carousel Column */}
        <div className="lg:col-span-5 w-full">
          <div className={`w-full rounded-3xl border border-white/5 bg-gradient-to-b ${featuredSpecialties[activeIndex].bg} p-6 sm:p-8 shadow-2xl transition-all duration-500`}>
            
            <div className="space-y-6 min-h-[160px] flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-brand-surface border border-white/5 flex items-center justify-center text-2xl shadow-inner mb-4">
                  {featuredSpecialties[activeIndex].icon}
                </div>
                <h3 className="text-lg font-bold text-white tracking-tight mb-2">
                  {featuredSpecialties[activeIndex].title}
                </h3>
                <p className="text-sm text-brand-muted leading-relaxed">
                  {featuredSpecialties[activeIndex].tagline}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <span className="text-xs font-medium text-brand-teal bg-brand-teal/5 px-3 py-1 rounded-md border border-brand-teal/10">
                  {featuredSpecialties[activeIndex].count}
                </span>

                <div className="flex gap-2">
                  <button 
                    onClick={prevSlide}
                    className="p-2 rounded-xl bg-brand-dark/60 border border-white/5 text-white hover:text-brand-teal hover:bg-brand-dark transition-colors hover:cursor-pointer"
                    aria-label="Previous Specialty"
                  >
                    ←
                  </button>
                  <button 
                    onClick={nextSlide}
                    className="p-2 rounded-xl bg-brand-dark/60 border border-white/5 text-white hover:text-brand-teal hover:bg-brand-dark transition-colors hover:cursor-pointer"
                    aria-label="Next Specialty"
                  >
                    →
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}