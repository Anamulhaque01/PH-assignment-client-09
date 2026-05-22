"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function DoctorSection() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fallback placeholder image URL if doctor.image fails to load or is null
  const defaultDoctorImage = "https://plus.unsplash.com/premium_photo-1677252438411-9a930d7a5168?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  useEffect(() => {
    async function fetchDoctors() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/doctors`);
        const data = await response.json();
        
        // 🌟 ARRANGE: Sort doctors in descending order based on rating (Highest -> Lowest)
        const sortedData = data.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        
        // Limit to the top 3 highest-rated entries for the showcase banner
        setDoctors(sortedData.slice(0, 3));
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

      {/* Responsive Grid System */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((doctor) => (
          <div 
            key={doctor._id}
            className="group relative rounded-2xl border border-white/5 bg-brand-surface p-6 flex flex-col justify-between transition-all duration-300 hover:border-brand-teal/20 hover:-translate-y-1 shadow-xl"
          >
            {/* Top Row: Info Block */}
            <div>
              <div className="flex items-center gap-4">
                {/* Responsive Avatar Frame Layout with Fallback Handling */}
                <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-brand-dark border border-white/10 shrink-0">
                  <img 
                    src={doctor.image || defaultDoctorImage} 
                    alt={doctor.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    // 🌟 DEFAULT PICTURE FALLBACK: Triggers dynamically if image fails to download or link breaks
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = defaultDoctorImage;
                    }}
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
                  <span className="text-white font-medium">
                    {doctor.rating ? doctor.rating.toFixed(1) : "0.0"}
                  </span>
                </div>
              </div>

              {/* Bio Snippet */}
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