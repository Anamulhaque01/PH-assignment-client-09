    "use client";

    import React, { useState, useEffect } from "react";
    import Link from "next/link";

    export default function DoctorSection() {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch doctors from our native Express backend
    useEffect(() => {
        async function fetchDoctors() {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/doctors`);
            const data = await response.json();
            // Limit to top 3 for the homepage showcase
            setDoctors(data.slice(0, 3));
        } catch (error) {
            console.error("Error fetching doctors:", error);
            } finally {
                setLoading(false);
                }
        }
        fetchDoctors();
    }, []);

    if (loading) {
        return (
        <div className="py-12 text-center text-brand-muted text-sm tracking-wide">
            Loading specialized physicians...
        </div>
        );
    }

    return (
        <section className="mx-auto max-w-7xl px-6 py-16 border-t border-white/5">
        
        {/* Structural Header Area */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
            <p className="text-xs font-semibold tracking-widest text-brand-teal uppercase mb-2">Available Experts</p>
            <h2 className="text-3xl font-bold text-white tracking-tight">Top-Rated Specialists</h2>
            </div>
            <Link 
            href="/doctors" 
            className="text-sm font-medium text-brand-teal hover:underline transition-all flex items-center gap-1"
            >
            View All Consultants <span>→</span>
            </Link>
        </div>

        {/* Responsive Bento Grid System: 1 Column on Mobile, 2 on Tablet, 3 on Desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {doctors.map((doctor) => (
            <div 
                key={doctor._id}
                className="group relative rounded-2xl border border-white/5 bg-brand-surface p-6 flex flex-col justify-between transition-all duration-300 hover:border-brand-teal/20 hover:-translate-y-1 shadow-xl"
            >
                {/* Top Row: Info Block */}
                <div>
                <div className="flex items-center gap-4">
                    {/* Responsive Avatar Frame Layout */}
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-brand-dark border border-white/10 shrink-0">
                    <img 
                        src={doctor.image} 
                        alt={doctor.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    </div>
                    <div>
                    <h3 className="text-base font-semibold text-white group-hover:text-brand-teal transition-colors">
                        {doctor.name}
                    </h3>
                    <p className="text-xs text-brand-muted mt-0.5">{doctor.specialty}</p>
                    </div>
                </div>

                {/* Dynamic Experience & Rating Strip */}
                <div className="flex items-center gap-4 mt-5 py-2.5 px-3 rounded-xl bg-brand-dark/50 border border-white/5 text-xs">
                    <div className="text-brand-muted">
                    Exp: <span className="text-white font-medium">{doctor.experience} Years</span>
                    </div>
                    <div className="w-px h-3 bg-white/10" />
                    <div className="flex items-center gap-1 text-yellow-500">
                    <span>★</span>
                    <span className="text-white font-medium">{doctor.rating.toFixed(1)}</span>
                    </div>
                </div>

                {/* Bio Snip */}
                <p className="text-xs text-brand-muted mt-4 line-clamp-2 leading-relaxed">
                    {doctor.description}
                </p>
                </div>

                {/* Bottom Row: Action Strip */}
                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between gap-2">
                <div>
                    <p className="text-[10px] uppercase tracking-wider text-brand-muted">Consultation Fee</p>
                    <p className="text-sm font-bold text-white">৳ {doctor.fee}</p>
                </div>
                
                <Link
                    href={`/doctors/${doctor._id}`}
                    className="rounded-xl bg-white/5 border border-white/10 px-4 py-2 text-xs font-medium text-white transition-all group-hover:bg-brand-teal group-hover:text-brand-dark group-hover:border-transparent"
                >
                    Book Consultation
                </Link>
                </div>

            </div>
            ))}
        </div>

        </section>
    );
    }