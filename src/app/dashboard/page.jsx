"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const [appointments, setAppointments] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Modal Control States
  const [editAppointment, setEditAppointment] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);

  // Edit Appointment Form Fields
  const [patientName, setPatientName] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");

  // Edit Profile Form Fields
  const [profileName, setProfileName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (!storedUser || !storedToken) {
      router.push("/login");
      return;
    }

    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);
    setProfileName(parsedUser?.name || "");
    setProfilePhoto(parsedUser?.photoUrl || "");

    fetch(`http://localhost:5000/api/appointments?email=${parsedUser.email}`)
      .then((res) => res.json())
      .then((data) => {
        // Fallback to empty array if data is corrupted or null
        setAppointments(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading appointments:", err);
        setLoading(false);
      });
  }, [router]);

  const handleDelete = async (id) => {
    if (!id || !window.confirm("Delete this session entry permanently?")) return;
    const res = await fetch(`http://localhost:5000/api/appointments/${id}`, { method: "DELETE" });
    if (res.ok) {
      setAppointments(appointments.filter((app) => app && app._id !== id));
    }
  };

  const openEditModal = (app) => {
    if (!app) return;
    setEditAppointment(app);
    setPatientName(app.patientName || "");
    setGender(app.gender || "");
    setPhone(app.phone || "");
    setAppointmentDate(app.appointmentDate || "");
    setAppointmentTime(app.appointmentTime || "");
  };

  const handleUpdateAppointment = async (e) => {
    e.preventDefault();
    if (!editAppointment?._id) return;

    const res = await fetch(`http://localhost:5000/api/appointments/${editAppointment._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ patientName, gender, phone, appointmentDate, appointmentTime }),
    });

    if (res.ok) {
      setAppointments(appointments.map((app) => 
        app && app._id === editAppointment._id 
          ? { ...app, patientName, gender, phone, appointmentDate, appointmentTime } 
          : app
      ));
      setEditAppointment(null);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (!user?.email) return;

    const res = await fetch(`http://localhost:5000/api/users/${user.email}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: profileName, photoUrl: profilePhoto }),
    });

    if (res.ok) {
      const updated = { ...user, name: profileName, photoUrl: profilePhoto };
      localStorage.setItem("user", JSON.stringify(updated));
      setUser(updated);
      setShowProfileModal(false);
    }
  };

  if (loading || !user) return <div className="text-white text-center py-20">Loading workspace files...</div>;

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 bg-brand-dark min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-10">Dashboard Workspace</h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Profile Card View */}
        <div className="lg:col-span-4 bg-brand-surface rounded-2xl p-6 border border-white/5 self-start">
          <img src={user.photoUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb"} alt={user.name} className="w-20 h-20 rounded-full object-cover mb-4 border border-white/10" />
          <h3 className="text-lg font-bold">{user.name}</h3>
          <p className="text-xs text-brand-muted mb-6">{user.email}</p>
          <button onClick={() => setShowProfileModal(true)} className="w-full bg-brand-teal text-brand-dark font-semibold py-2.5 rounded-xl text-xs">
            Update Profile
          </button>
        </div>

        {/* Bookings Table List */}
        <div className="lg:col-span-8 bg-brand-surface rounded-2xl p-6 border border-white/5">
          <h2 className="text-xl font-bold mb-4">My Bookings</h2>
          {appointments.length === 0 ? (
            <p className="text-xs text-brand-muted">No appointments recorded.</p>
          ) : (
            <div className="space-y-4">
              {appointments.map((app) => {
                // Defensive Skip if the array item itself is null/corrupted
                if (!app || !app._id) return null;

                return (
                  <div key={app._id} className="p-4 rounded-xl bg-brand-dark/50 border border-white/5 flex justify-between items-center">
                    <div>
                      <h4 className="font-bold text-sm text-brand-teal">{app.doctorName}</h4>
                      <p className="text-xs text-white mt-1">Patient: {app.patientName} ({app.gender})</p>
                      <p className="text-[11px] text-brand-muted">Schedule: {app.appointmentDate} at {app.appointmentTime}</p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => openEditModal(app)} className="bg-white/5 border border-white/10 px-3 py-1.5 text-xs rounded-lg text-brand-muted hover:text-white">Update</button>
                      <button onClick={() => handleDelete(app._id)} className="bg-red-500/10 border border-red-500/20 px-3 py-1.5 text-xs rounded-lg text-red-400 hover:bg-red-500 hover:text-white">Delete</button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Appointment Update Modal Container */}
      {editAppointment && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleUpdateAppointment} className="bg-brand-surface p-6 rounded-2xl max-w-md w-full border border-white/10 space-y-4">
            <h3 className="text-lg font-bold">Update Appointment</h3>
            <div>
              <label className="text-xs text-brand-muted block mb-1">Patient Name</label>
              <input type="text" value={patientName} onChange={(e) => setPatientName(e.target.value)} className="w-full bg-brand-dark border border-white/5 rounded-xl px-3 py-2 text-sm text-white" />
            </div>
            <div>
              <label className="text-xs text-brand-muted block mb-1">Gender</label>
              <input type="text" value={gender} onChange={(e) => setGender(e.target.value)} className="w-full bg-brand-dark border border-white/5 rounded-xl px-3 py-2 text-sm text-white" />
            </div>
            <div>
              <label className="text-xs text-brand-muted block mb-1">Phone Number</label>
              <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full bg-brand-dark border border-white/5 rounded-xl px-3 py-2 text-sm text-white" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-brand-muted block mb-1">Date</label>
                <input type="date" value={appointmentDate} onChange={(e) => setAppointmentDate(e.target.value)} className="w-full bg-brand-dark border border-white/5 rounded-xl px-3 py-2 text-sm text-white" />
              </div>
              <div>
                <label className="text-xs text-brand-muted block mb-1">Time</label>
                <input type="text" value={appointmentTime} onChange={(e) => setAppointmentTime(e.target.value)} className="w-full bg-brand-dark border border-white/5 rounded-xl px-3 py-2 text-sm text-white" />
              </div>
            </div>
            <div className="flex gap-2 justify-end pt-2">
              <button type="button" onClick={() => setEditAppointment(null)} className="px-4 py-2 text-xs text-brand-muted bg-white/5 rounded-xl">Cancel</button>
              <button type="submit" className="px-4 py-2 text-xs text-brand-dark bg-brand-teal font-bold rounded-xl">Save Changes</button>
            </div>
          </form>
        </div>
      )}

      {/* Profile Update Modal Container */}
      {showProfileModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleUpdateProfile} className="bg-brand-surface p-6 rounded-2xl max-w-md w-full border border-white/10 space-y-4">
            <h3 className="text-lg font-bold">Update Profile Files</h3>
            <div>
              <label className="text-xs text-brand-muted block mb-1">Profile Name</label>
              <input type="text" value={profileName} onChange={(e) => setProfileName(e.target.value)} className="w-full bg-brand-dark border border-white/5 rounded-xl px-3 py-2 text-sm text-white" />
            </div>
            <div>
              <label className="text-xs text-brand-muted block mb-1">Profile Photo URL</label>
              <input type="url" value={profilePhoto} onChange={(e) => setProfilePhoto(e.target.value)} className="w-full bg-brand-dark border border-white/5 rounded-xl px-3 py-2 text-sm text-white" />
            </div>
            <div className="flex gap-2 justify-end pt-2">
              <button type="button" onClick={() => setShowProfileModal(false)} className="px-4 py-2 text-xs text-brand-muted bg-white/5 rounded-xl">Cancel</button>
              <button type="submit" className="px-4 py-2 text-xs text-brand-dark bg-brand-teal font-bold rounded-xl">Update</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}