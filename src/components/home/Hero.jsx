    "use client";

    import React, { useState } from "react";
    import Link from "next/link";

    export default function Hero() {

    const featuredSpecialties = [
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

    const [activeIndex, setActiveIndex] = useState(0);

    const nextSlide = () => {
        setActiveIndex((prev) => (prev + 1) % featuredSpecialties.length);
    };

    const prevSlide = () => {
        setActiveIndex((prev) => (prev - 1 + featuredSpecialties.length) % featuredSpecialties.length);
    };

    return (
        <section className="relative min-h-[85vh] flex items-center justify-center px-6 py-12 lg:py-20 overflow-hidden">
        

        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-teal/10 rounded-full blur-[120px] pointer-events-none" />


        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            

            <div className="lg:col-span-7 space-y-8 text-left">
            
            <div className="inline-flex items-center gap-2 bg-brand-surface border border-white/5 rounded-full px-4 py-1.5 text-xs text-brand-teal font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-teal animate-pulse" />
                Next-Gen Healthcare Scheduling
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
                Your Health. <br />
                Guided by <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-teal to-emerald-400">Experts</span>.
            </h1>

            <p className="text-base sm:text-lg text-brand-muted max-w-xl leading-relaxed">
                Skip the waiting loops. Access premium diagnostic consultations and manage your clinical schedules through our high-performance portal.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                href="/doctors"
                className="rounded-xl bg-brand-teal px-6 py-3.5 text-sm font-semibold text-brand-dark shadow-lg shadow-brand-teal/10 transition-all hover:opacity-90 active:scale-[0.98]"
                >
                Find a Specialist
                </Link>
                <Link 
                href="/dashboard" 
                className="rounded-xl bg-white/5 border border-white/10 px-6 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
                >
                Access Dashboard
                </Link>
            </div>


            <div className="pt-6 border-t border-white/5 grid grid-cols-3 gap-4 max-w-md">
                <div>
                <p className="text-2xl font-bold text-white">99.4%</p>
                <p className="text-xs text-brand-muted mt-0.5">Satisfaction</p>
                </div>
                <div>
                <p className="text-2xl font-bold text-white">24/7</p>
                <p className="text-xs text-brand-muted mt-0.5">Care Access</p>
                </div>
                <div>
                <p className="text-2xl font-bold text-white">15 min</p>
                <p className="text-xs text-brand-muted mt-0.5">Max Wait Time</p>
                </div>
            </div>

            </div>


            <div className="lg:col-span-5 w-full">
            <div className={`relative rounded-3xl border border-white/5 bg-gradient-to-b ${featuredSpecialties[activeIndex].bg} p-8 sm:p-10 shadow-2xl overflow-hidden min-h-[340px] flex flex-col justify-between group transition-all duration-500`}>
                

                <div className="flex items-center justify-between">
                <span className="text-4xl p-3 rounded-2xl bg-brand-dark/50 border border-white/5 shadow-inner">
                    {featuredSpecialties[activeIndex].icon}
                </span>
                <span className="text-xs font-mono text-brand-teal tracking-widest uppercase">
                    0{activeIndex + 1} / 0{featuredSpecialties.length}
                </span>
                </div>


                <div className="space-y-3 my-8">
                <h3 className="text-2xl font-bold text-white tracking-tight transition-all duration-300">
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
                    className="p-2 rounded-xl bg-brand-dark/60 border border-white/5 text-white hover:text-brand-teal hover:bg-brand-dark transition-colors"
                    aria-label="Previous Specialty"
                    >
                    ←
                    </button>
                    <button 
                    onClick={nextSlide}
                    className="p-2 rounded-xl bg-brand-dark/60 border border-white/5 text-white hover:text-brand-teal hover:bg-brand-dark transition-colors"
                    aria-label="Next Specialty"
                    >
                    →
                    </button>
                </div>
                </div>

            </div>
            </div>

        </div>
        </section>
    );
    }