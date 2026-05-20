"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (!storedUser || !storedToken) {
      router.push("/login");
      return;
    }

    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);

    const fetchAppointments = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/appointments?email=${parsedUser.email}`);
        const data = await response.json();
        setAppointments(data);
      } catch (error) {
        console.error("Error loading appointments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [router]);

  const handleCancel = async (id) => {
    const confirmCancel = window.confirm("Are you sure you want to cancel this appointment?");
    if (!confirmCancel) return;

    try {
      const response = await fetch(`http://localhost:5000/api/appointments/${id}`, {
        method: "DELETE",
      });
      const result = await response.json();
      if (result.success) {
        setAppointments((prev) => prev.filter((app) => app._id !== id));
      }
    } catch (error) {
      console.error("Cancellation failed:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    router.push("/login");
  };

  const filteredAppointments = appointments.filter((app) =>
    app.doctorName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading || !user) {
    return (
      <div className="py-24 text-center text-brand-muted text-sm tracking-wide">
        Synchronizing dashboard streams...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold tracking-widest text-brand-teal uppercase mb-2">Overview</p>
          <h1 className="text-3xl font-bold text-white tracking-tight sm:text-4xl">Patient Dashboard</h1>
        </div>
        <button
          onClick={handleLogout}
          className="self-start sm:self-auto rounded-xl bg-white/5 border border-white/10 px-4 py-2 text-xs font-semibold text-brand-muted hover:text-white hover:bg-white/10 transition-all"
        >
          Sign Out Session
        </button>
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

          <div className="rounded-2xl border border-white/5 bg-brand-surface p-6 space-y-4 sm:col-span-2 xl:col-span-1">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-brand-dark border border-white/10 overflow-hidden shrink-0">
                <img 
                  src={user.photoUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb"} 
                  alt={user.name} 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">{user.name}</h4>
                <p className="text-xs text-brand-muted">Patient Profile</p>
              </div>
            </div>
            <hr className="border-white/5" />
            <div className="text-xs space-y-1 text-brand-muted">
              <p>Registered Email Address:</p>
              <p className="text-white font-medium">{user.email}</p>
            </div>
          </div>
        </div>

        <div className="xl:col-span-8">
          <div className="rounded-2xl border border-white/5 bg-brand-surface overflow-hidden">
            <div className="px-6 py-5 border-b border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h3 className="text-base font-semibold text-white">Upcoming Consultations</h3>
              <input
                type="text"
                placeholder="Search by doctor name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-brand-dark border border-white/5 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-brand-teal transition-colors min-w-[240px]"
              />
            </div>

            {filteredAppointments.length === 0 ? (
              <div className="p-12 text-center text-brand-muted text-sm">
                No appointment entries recorded for this account profile.
              </div>
            ) : (
              <div className="divide-y divide-white/5">
                {filteredAppointments.map((app) => (
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