    "use client";

    import React, { useState, useEffect } from "react";
    import Link from "next/link";

    export default function DoctorsPage() {
    const [doctors, setDoctors] = useState([]);
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [selectedSpecialty, setSelectedSpecialty] = useState("All");
    const [loading, setLoading] = useState(true);

    const specialties = ["All", "Cardiologist", "Dermatologist", "Pediatrician"];

    useEffect(() => {
        async function fetchDoctors() {
        try {
            const response = await fetch("http://localhost:5000/api/doctors");
            const data = await response.json();
            setDoctors(data);
            setFilteredDoctors(data);
        } catch (error) {
            console.error("Error fetching doctors:", error);
        } finally {
            setLoading(false);
        }
        }
        fetchDoctors();
    }, []);

    const handleFilter = (specialty) => {
        setSelectedSpecialty(specialty);
        if (specialty === "All") {
        setFilteredDoctors(doctors);
        } else {
        setFilteredDoctors(doctors.filter((doc) => doc.specialty === specialty));
        }
    };

    if (loading) {
        return (
        <div className="py-24 text-center text-brand-muted text-sm tracking-wide">
            Loading consultants directory...
        </div>
        );
    }

    return (
        <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-10">
            <p className="text-xs font-semibold tracking-widest text-brand-teal uppercase mb-2">Directory</p>
            <h1 className="text-3xl font-bold text-white tracking-tight sm:text-4xl">All Medical Specialists</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            <div className="lg:col-span-3 flex gap-2 overflow-x-auto pb-4 lg:pb-0 lg:flex-col lg:overflow-visible scrollbar-none sticky lg:top-24 z-10 bg-brand-dark">
            {specialties.map((specialty) => (
                <button
                key={specialty}
                onClick={() => handleFilter(specialty)}
                className={`whitespace-nowrap rounded-xl px-5 py-3 text-sm font-medium text-left transition-all border ${
                    selectedSpecialty === specialty
                    ? "bg-brand-teal text-brand-dark border-transparent shadow-lg shadow-brand-teal/10"
                    : "bg-brand-surface text-brand-muted border-white/5 hover:border-white/10 hover:text-white"
                }`}
                >
                {specialty}
                </button>
            ))}
            </div>

            <div className="lg:col-span-9">
            {filteredDoctors.length === 0 ? (
                <div className="rounded-2xl border border-white/5 bg-brand-surface p-12 text-center text-brand-muted text-sm">
                No specialists matching this criteria found.
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDoctors.map((doctor) => (
                    <div
                    key={doctor._id}
                    className="group relative rounded-2xl border border-white/5 bg-brand-surface p-6 flex flex-col justify-between transition-all duration-300 hover:border-brand-teal/20 hover:-translate-y-1 shadow-xl"
                    >
                    <div>
                        <div className="flex items-center gap-4">
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

                        <p className="text-xs text-brand-muted mt-4 line-clamp-2 leading-relaxed">
                        {doctor.description}
                        </p>
                    </div>

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
            </div>

        </div>
        </div>
    );
    }