import React from "react";

// 1. Interface typing for card pillars
interface ServiceItem {
  icon: string;
  title: string;
  desc: string;
}

export default function ServicesSection() {
  const services: ServiceItem[] = [
    {
      icon: "🩺",
      title: "General Consultation",
      desc: "Connect with certified general practitioners for daily wellness checks, prescription renewals, and immediate medical guidance."
    },
    {
      icon: "❤️",
      title: "Specialized Care",
      desc: "Direct booking channels to top regional cardiologists, neurologists, pediatrician lines, and seasoned surgical experts."
    },
    {
      icon: "⏰",
      title: "24/7 Urgencies",
      desc: "Priority appointment routing for urgent medical issues, ensuring you skip waiting lines when time matters most."
    }
  ];

  return (
    <section className="max-w-7xl mx-auto border-y border-white/5 bg-brand-surface/40 py-20 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="text-center max-w-xl mx-auto mb-16">
          <p className="text-xs font-semibold tracking-widest text-brand-teal uppercase mb-2">Capabilities</p>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">Comprehensive Clinical Services</h2>
          <p className="text-xs text-brand-muted mt-3">Explore customized modern healthcare pillars built entirely around your family's personal wellness routines.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="p-6 rounded-2xl bg-brand-surface border border-white/5 hover:border-brand-teal/20 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-brand-dark flex items-center justify-center text-xl mb-5 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-brand-teal transition-colors">
                {service.title}
              </h3>
              <p className="text-xs text-brand-muted mt-3 leading-relaxed">
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}