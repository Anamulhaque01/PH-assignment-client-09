import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Our Ecosystem",
  description: "Learn about the core values, technology stack, and medical standards driving the DocAppoint healthcare routing system.",
  openGraph: {
    title: "About DocAppoint | Next-Gen Clinical Scheduling",
    description: "Bridging the gap between certified clinicians and instant appointments.",
  },
};

interface PillarCard {
  number: string;
  title: string;
  description: string;
}

export default function AboutPage() {
  const pillars: PillarCard[] = [
    {
      number: "01",
      title: "Zero Latency Routing",
      description: "No archaic phone lines. We synchronize practitioner calendar blocks in real-time, eliminating double-bookings completely."
    },
    {
      number: "02",
      title: "Vetted Specialist Network",
      description: "Every doctor on our index undergoes rigorous clinical verification checks, academic verification, and practice history audits."
    },
    {
      number: "03",
      title: "Patient-First Autonomy",
      description: "You own your appointment records. Cancel, reschedule, or review consult histories instantly through your secure personal dashboard."
    }
  ];

  return (
    <div className="w-full min-h-screen bg-brand-dark py-20 px-6">
      <div className="mx-auto max-w-4xl space-y-16">
        
        {/* Header Section */}
        <div className="space-y-4 text-left border-b border-white/5 pb-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-teal/5 border border-brand-teal/10 px-3 py-1">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-teal" />
            <span className="text-[10px] font-bold tracking-widest text-brand-teal uppercase">
              The Mission
            </span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Redefining Healthcare <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-teal to-emerald-400">
              Access Architecture
            </span>
          </h1>
          <p className="text-sm text-brand-muted max-w-2xl leading-relaxed">
            DocAppoint was built to dismantle the friction points of modern medicine. By treating healthcare scheduling as an optimized transaction ledger, we empower patient circles and medical practices to align effortlessly.
          </p>
        </div>

        {/* Narrative & Philosophy Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-brand-teal">Our Legacy</h3>
            <h2 className="text-xl font-bold text-white tracking-tight">Evolving traditional appointments into responsive actions.</h2>
          </div>
          <div className="text-xs text-brand-muted leading-relaxed space-y-4">
            <p>
              Originally envisioned as a university digital registry hub, DocAppoint has grown into a secure healthcare network layer. We bypass the chaotic waiting rooms of yesteryear by treating your time with absolute structural respect.
            </p>
            <p>
              Whether you are scheduling a critical cardiology screening or securing a routine clinical dermatology checkup, our protocols ensure your profile details are indexed seamlessly into your doctor's custom roster.
            </p>
          </div>
        </div>

        {/* System Pillars */}
        <div className="space-y-6 pt-6">
          <h3 className="text-xs font-bold uppercase tracking-widest text-brand-teal">System Foundations</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pillars.map((pillar) => (
              <div 
                key={pillar.number} 
                className="p-6 rounded-2xl bg-brand-surface border border-white/5 flex flex-col justify-between h-48 hover:border-white/10 transition-colors"
              >
                <span className="text-xs font-bold text-brand-teal tracking-widest">{pillar.number}</span>
                <div className="space-y-2">
                  <h4 className="text-sm font-bold text-white tracking-tight">{pillar.title}</h4>
                  <p className="text-[11px] text-brand-muted leading-relaxed">{pillar.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}