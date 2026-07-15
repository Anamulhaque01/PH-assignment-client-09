"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// 1. Define the structural shape of a Doctor data object
interface Doctor {
  _id: string;
  name: string;
  specialty: string;
  fee: number | string;
  description?: string;
  image?: string;
  rating?: number;
}

export default function AllAppointmentsView() {
  const router = useRouter();
  
  // Explicitly tell the state it accepts an array of Doctors
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const defaultDoctorImage = "https://plus.unsplash.com/premium_photo-1677252438411-9a930d7a5168?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  useEffect(() => {
    async function getDoctors() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/doctors?search=${search}`);
        const data: Doctor[] = await res.json();
        
        // Sort doctors safely knowing rating might be missing or optional
        const sortedData = data.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        
        setDoctors(sortedData);
      } catch (err) {
        console.error("Failed pulling medical directory:", err);
      } finally {
        setLoading(false);
      }
    }
    getDoctors();
  }, [search]);

  // Type parameters explicitly as a string identifier
  const handleDetailsRedirect = (id: string) => {
    if (!localStorage.getItem("token")) {
      router.push("/login");
    } else {
      router.push(`/doctors/${id}`);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 bg-brand-dark min-h-screen">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-10">
        <div>
          <p className="text-xs font-semibold tracking-widest text-brand-teal uppercase mb-2">Schedules</p>
          <h1 className="text-3xl font-bold text-white tracking-tight">All Available Openings</h1>
        </div>
        
        <input 
          type="text" 
          placeholder="Search by Doctor Name..." 
          value={search} 
          onChange={(e) => setSearch(e.target.value)} 
          className="bg-brand-surface border border-white/5 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-brand-teal w-full sm:max-w-xs" 
        />
      </div>

      {loading ? (
        <div className="text-center text-sm text-brand-muted py-12">Loading clinicians list...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((doc) => (
            <div key={doc._id} className="bg-brand-surface border border-white/5 rounded-2xl p-5 flex flex-col justify-between">
              <div>
                <div className="relative w-full aspect-[4/3] mb-4 overflow-hidden rounded-xl bg-brand-dark">
                  <img 
                    src={doc.image || defaultDoctorImage} 
                    alt={doc.name} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.onerror = null; 
                      target.src = defaultDoctorImage;
                    }}
                  />
                  
                  <div className="absolute top-3 right-3 bg-brand-surface/90 border border-white/10 backdrop-blur-md px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-md">
                    <span className="text-amber-400 text-xs">★</span>
                    <span className="text-white font-bold text-[11px] tracking-wide">
                      {doc.rating ? doc.rating.toFixed(1) : "0.0"}
                    </span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white">{doc.name}</h3>
                
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs text-brand-teal font-medium">{doc.specialty}</p>
                  <p className="text-[11px] text-brand-muted font-medium">Fee: ৳{doc.fee}</p>
                </div>
                
                <p className="text-xs text-brand-muted line-clamp-2 mb-4">{doc.description}</p>
              </div>
              
              <button 
                onClick={() => handleDetailsRedirect(doc._id)} 
                className="w-full rounded-xl bg-white/5 border border-white/10 py-2.5 text-xs font-semibold text-white hover:bg-brand-teal hover:text-brand-dark hover:border-transparent transition-all"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}