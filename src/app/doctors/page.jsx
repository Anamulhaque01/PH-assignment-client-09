"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AllAppointmentsPage() {
  const router = useRouter();
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getDoctors() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/doctors?search=${search}`);
        const data = await res.json();
        setDoctors(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    getDoctors();
  }, [search]);

  const handleDetailsRedirect = (id) => {
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
        {/* Search Challenge Implementation */}
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
                <img src={doc.image} alt={doc.name} className="w-full aspect-[4/3] object-cover rounded-xl mb-4 bg-brand-dark" />
                <h3 className="text-lg font-bold text-white">{doc.name}</h3>
                <p className="text-xs text-brand-teal font-medium mb-2">{doc.specialty}</p>
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