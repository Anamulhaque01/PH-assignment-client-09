import React from "react";

// 1. Defining structural item constraints for dashboard count chips
interface FeatureStat {
  metric: string;
  label: string;
}

export default function StatsSection() {
  const features: FeatureStat[] = [
    { metric: "99%", label: "Patient Satisfaction Rate" },
    { metric: "15k+", label: "Completed Bookings" },
    { metric: "50+", label: "Verified Specialists" },
    { metric: "10 min", label: "Average Response Time" }
  ];

  return (
    <section className="py-20 px-6 mx-auto max-w-7xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        <div className="lg:col-span-5 space-y-4">
          <p className="text-xs font-semibold tracking-widest text-brand-teal uppercase">Platform Metrics</p>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight leading-tight text-white">
            Setting the Gold Standard for Doctor Booking Systems
          </h2>
          <p className="text-xs text-brand-muted leading-relaxed">
            We eliminate scheduling conflicts completely. By integrating active database synchronization logs, you gain secure, instant confirmation tags whenever you execute an operational doctor session.
          </p>
        </div>

        <div className="lg:col-span-7 grid grid-cols-2 gap-4">
          {features.map((feat, index) => (
            <div 
              key={index} 
              className="p-6 rounded-2xl bg-brand-surface/70 border border-white/5 flex flex-col justify-center"
            >
              <span className="text-3xl font-bold tracking-tight text-white mb-1">
                {feat.metric}
              </span>
              <span className="text-[11px] font-medium text-brand-teal uppercase tracking-wider">
                {feat.label}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}