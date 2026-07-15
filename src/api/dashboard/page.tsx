"use client";

import React, { useState, useEffect } from "react";

// 1. We define a strict type interface for what an Appointment looks like.
// This prevents bugs when trying to access properties that don't exist.
interface Appointment {
  _id: string;
  doctorName: string;
  doctorSpecialty: string;
  userName: string;
  userEmail: string;
  date: string;
  timeSlot: string;
  status: "pending" | "confirmed" | "cancelled" | string; // strict options + fallback string
}

export default function DashboardPage() {
  // 2. We explicitly tell the state that it holds an array of Appointments: <Appointment[]>
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchAppointments = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/appointments`);
      const data = await response.json();
      setAppointments(data);
    } catch (error) {
      console.error("Error loading appointments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  // 3. We type the 'id' parameter as a string so it can safely be concatenated into the URL string.
  const handleCancel = async (id: string) => {
    const confirmCancel = window.confirm("Are you sure you want to cancel this appointment?");
    if (!confirmCancel) return;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/appointments/${id}`, {
        method: "DELETE",
      });
      const result = await response.json();
      if (result.success) {
        fetchAppointments();
      }
    } catch (error) {
      console.error("Cancellation failed:", error);
    }
  };

  if (loading) {
    return (
      <div className="py-24 text-center text-brand-muted text-sm tracking-wide">
        Synchronizing dashboard streams...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-10">
        <p className="text-xs font-semibold tracking-widest text-brand-teal uppercase mb-2">Overview</p>
        <h1 className="text-3xl font-bold text-white tracking-tight sm:text-4xl">Patient Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        
        <div className="xl:col-span-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-4">
          <div className="rounded-2xl border border-white/5 bg-brand-surface p-6">
            <p className="text-xs font-medium text-brand-muted uppercase tracking-wider">Total Bookings</p>
            <p className="text-3xl font-bold text-white mt-2">{appointments.length}</p>
          </div>
          <div className="rounded-2xl border border-white/5 bg-brand-surface p-6">
            <p className="text-xs font-medium text-brand-muted uppercase tracking-wider">Active Schedules</p>
            <p className="text-3xl font-bold text-brand-teal mt-2">
              {appointments.filter(app => app.status === "pending").length}
            </p>
          </div>
        </div>

        <div className="xl:col-span-8">
          <div className="rounded-2xl border border-white/5 bg-brand-surface overflow-hidden">
            <div className="px-6 py-5 border-b border-white/5">
              <h3 className="text-base font-semibold text-white">Upcoming Consultations</h3>
            </div>

            {appointments.length === 0 ? (
              <div className="p-12 text-center text-brand-muted text-sm">
                No appointment entries recorded for this account profile.
              </div>
            ) : (
              <div className="divide-y divide-white/5">
                {appointments.map((app) => (
                  <div key={app._id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6 transition-colors hover:bg-white/[0.01]">
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-3">
                        <h4 className="text-base font-semibold text-white">{app.doctorName}</h4>
                        <span className="text-[10px] font-medium uppercase tracking-wider bg-brand-teal/5 border border-brand-teal/10 text-brand-teal px-2 py-0.5 rounded-md">
                          {app.doctorSpecialty}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-xs text-brand-muted">
                        <p>Patient: <span className="text-white">{app.userName}</span></p>
                        <p>Email: <span className="text-white">{app.userEmail}</span></p>
                        <p>Date: <span className="text-white">{app.date}</span></p>
                        <p>Slot: <span className="text-white">{app.timeSlot}</span></p>
                      </div>
                    </div>

                    <div className="flex items-center sm:justify-end shrink-0">
                      <button
                        onClick={() => handleCancel(app._id)}
                        className="w-full sm:w-auto rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-2.5 text-xs font-semibold text-red-400 transition-all hover:bg-red-500 hover:text-white hover:border-transparent"
                      >
                        Cancel Booking
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}