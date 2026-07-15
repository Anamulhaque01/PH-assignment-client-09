"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

// 1. Declaring type blueprints for doctors showcased on the home directory
interface FeaturedDoctor {
  _id: string;
  name: string;
  specialty: string;
  image?: string;
  experience?: number | string;
  rating?: number;
  fee: number | string;
  description?: string;
}

export default function DoctorSection() {
  const [doctors, setDoctors] = useState<FeaturedDoctor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const defaultDoctorImage: string = "https://plus.unsplash.com/premium_photo-1677252438411-9a930d7a5168?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  useEffect(() => {
    async function fetchDoctors() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/doctors`);
        const data: FeaturedDoctor[] = await response.json();
        
        // Arrange items descending based on clinical ratings metrics
        const sortedData = data.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        
        // Safe splice slice mutation to hold top 3 profiles
        setDoctors(sortedData.slice(0, 3));
      } catch (error) {
        console.error("Error drawing featured medical listings panel:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchDoctors();
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
        <div>
          <p className="text-xs font-semibold tracking-widest text-brand-teal uppercase mb-2">Showcase Directory</p>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">Top-Tier Ranked Clinicians</h2>
          <p className="text-xs text-brand-muted mt-2">Highest-rated clinical specialists available immediately for consultation sessions.</p>
        </div>
        <Link 
          href="/doctors" 
          className="text-xs text-brand-teal font-semibold hover:underline shrink-0 flex items-center gap-1 group"
        >
          View Complete Directory <span className="group-hover:translate-x-0.5 transition-transform">→</span>
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-12 text-sm text-brand-muted tracking-wide">
          Syncing top rated clinician modules...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((doctor) => (
            <div 
              key={doctor._id} 
              className="bg-brand-surface border border-white/5 rounded-2xl p-5 flex flex-col justify-between group hover:border-white/10 transition-all duration-300 shadow-xl"
            >
              <div>
                {/* Image Wrap Element container */}
                <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-brand-dark border border-white/5 mb-4">
                  <img
                    src={doctor.image || defaultDoctorImage}
                    alt={doctor.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.onerror = null;
                      target.src = defaultDoctorImage;
                    }}
                  />
                </div>

                {/* Specialty Header Row strip */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand-teal bg-brand-teal/5 border border-brand-teal/10 px-2.5 py-0.5 rounded-md">
                    {doctor.specialty}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-brand-teal transition-colors duration-200">
                  {doctor.name}
                </h3>

                {/* Stats Remit details */}
                <div className="flex items-center gap-3 text-xs text-brand-muted mt-2">
                  <div className="flex items-center gap-1">
                    <span>Practice:</span>
                    <span className="text-white font-medium">{doctor.experience} Years</span>
                  </div>
                  <div className="w-px h-3 bg-white/10" />
                  <div className="flex items-center gap-1 text-yellow-500">
                    <span>★</span>
                    <span className="text-white font-medium">
                      {doctor.rating ? doctor.rating.toFixed(1) : "0.0"}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-brand-muted mt-4 line-clamp-2 leading-relaxed">
                  {doctor.description}
                </p>
              </div>

              {/* Bottom Row Action elements */}
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
      )}
    </section>
  );
}