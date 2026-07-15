"use client";

import React from "react";

interface WorkflowStep {
  number: string;
  title: string;
  desc: string;
}

export default function WorkflowSection(): React.JSX.Element {
  const steps: WorkflowStep[] = [
    {
      number: "01",
      title: "Establish Profile",
      desc: "Create a secure account with your verified contact information in less than 60 seconds."
    },
    {
      number: "02",
      title: "Select Specialist",
      desc: "Browse certified practitioners filtered by medical departments, session fees, and active user ratings."
    },
    {
      number: "03",
      title: "Secure Your Slot",
      desc: "Select an active timing slot and lock your booking instantly with no archaic phone calls."
    }
  ];

  return (
    <section className="py-20 px-6 mx-auto max-w-7xl border-t border-white/5 bg-brand-dark">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Side Sticky Intro Header */}
        <div className="lg:col-span-4 space-y-4 lg:sticky lg:top-28 h-fit">
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-teal/5 border border-brand-teal/10 px-3 py-1">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-teal" />
            <span className="text-[10px] font-bold tracking-widest text-brand-teal uppercase">
              The Protocol
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight">
            Seamless Bookings <br />In Three Actions
          </h2>
          <p className="text-xs text-brand-muted leading-relaxed max-w-sm">
            We bypass complex clinic paperwork. Our automated scheduling protocol ensures you lock in direct consultations with certified specialists instantly.
          </p>
        </div>

        {/* Right Side Step Cards */}
        <div className="lg:col-span-8 space-y-4">
          {steps.map((step: WorkflowStep, idx: number) => (
            <div 
              key={idx}
              className="group p-8 rounded-2xl bg-brand-surface border border-white/5 flex flex-col sm:flex-row items-start gap-6 hover:border-white/10 transition-all duration-300"
            >
              <span className="text-3xl font-extrabold text-brand-teal/30 group-hover:text-brand-teal transition-colors duration-300">
                {step.number}
              </span>
              <div className="space-y-1.5">
                <h3 className="text-sm font-bold text-white tracking-tight">
                  {step.title}
                </h3>
                <p className="text-xs text-brand-muted leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}