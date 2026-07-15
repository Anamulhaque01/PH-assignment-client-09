"use client";

import React, { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

// 1. Structure the schema profile data for a Doctor
interface DoctorProfile {
  _id: string;
  name: string;
  specialty: string;
  description?: string;
  image?: string;
  experience?: number | string;
  fee: number | string;
}

// 2. Define component property types matching Next.js async parameters
interface DoctorDetailsViewProps {
  params: Promise<{ id: string }>;
}

export default function DoctorDetailsView({ params }: DoctorDetailsViewProps) {
  const router = useRouter();
  const unwrappedParams = use(params);
  const doctorId = unwrappedParams.id;

  // Type definitions for states
  const [doctor, setDoctor] = useState<DoctorProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  
  const [appointmentDate, setAppointmentDate] = useState<string>("");
  const [appointmentTime, setAppointmentTime] = useState<string>("");
  const [patientName, setPatientName] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  
  const [bookingSubmit, setBookingSubmit] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const availableSlots: string[] = ["09:00 AM", "10:30 AM", "11:00 AM", "03:00 PM", "06:00 PM"];

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      const parsedUser = JSON.parse(storedUser);
      setPatientName(parsedUser.name || parsedUser.patientName || "");
      setUserEmail(parsedUser.email || parsedUser.userEmail || "");
      if (parsedUser.phone) setPhone(parsedUser.phone);
      if (parsedUser.gender) setGender(parsedUser.gender);
    }

    async function fetchDoctorDetails() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/doctors/${doctorId}`);
        if (!response.ok) throw new Error();
        const data: DoctorProfile = await response.json();
        setDoctor(data);
      } catch (error) {
        console.error("Error fetching doctor details:", error);
        toast.error("Failed to load doctor clinical profiles.");
      } finally {
        setLoading(false);
      }
    }
    if (doctorId) fetchDoctorDetails();
  }, [doctorId]);

  // Form submit element typed safely
  const handleBooking = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");

    if (!localStorage.getItem("token")) {
      toast.error("Please log in to schedule an appointment session.");
      router.push("/login");
      return;
    }

    if (!appointmentDate || !appointmentTime || !patientName || !userEmail || !gender || !phone || !doctor) {
      setErrorMessage("Please complete all profile information and select your schedule slot.");
      return;
    }

    setBookingSubmit(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/appointments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          doctorId: doctor._id,
          doctorName: doctor.name,
          doctorSpecialty: doctor.specialty,
          userEmail,
          patientName,
          gender,
          phone,
          appointmentDate,
          appointmentTime,
        }),
      });

      const result = await response.json();
      if (response.ok && result.success) {
        toast.success("Appointment booked successfully!");
        router.push("/dashboard");
      } else {
        throw new Error(result.message || "Booking request failed");
      }
    } catch (error: any) {
      setErrorMessage(error.message);
      toast.error(error.message || "Could not complete scheduling handshake.");
    } finally {
      setBookingSubmit(false);
    }
  };

  if (loading) {
    return (
      <div className="py-24 text-center text-brand-muted text-sm tracking-wide">
        Loading clinician diagnostics profile...
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="py-24 text-center text-brand-muted text-sm">
        Specialist file profiles could not be resolved.
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        <div className="lg:col-span-5 bg-brand-surface border border-white/5 rounded-3xl p-6 sm:p-8 shadow-xl">
          <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-brand-dark border border-white/10 mb-6">
            <img
              src={doctor.image}
              alt={doctor.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <span className="text-xs font-semibold tracking-widest text-brand-teal uppercase bg-brand-teal/5 px-3 py-1 rounded-md border border-brand-teal/10">
              {doctor.specialty}
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-4">{doctor.name}</h1>
            <p className="text-sm text-brand-muted mt-2 leading-relaxed">{doctor.description}</p>
            
            <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/5 text-xs">
              <div className="bg-brand-dark/40 p-3 rounded-xl border border-white/5">
                <p className="text-brand-muted">Clinical Practice</p>
                <p className="text-sm font-semibold text-white mt-1">{doctor.experience} Years</p>
              </div>
              <div className="bg-brand-dark/40 p-3 rounded-xl border border-white/5">
                <p className="text-brand-muted">Consultation Remit</p>
                <p className="text-sm font-semibold text-white mt-1">৳ {doctor.fee}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 bg-brand-surface border border-white/5 rounded-3xl p-6 sm:p-8 shadow-xl">
          <h2 className="text-xl font-bold text-white tracking-tight mb-2">Schedule Session</h2>
          <p className="text-xs text-brand-muted mb-6">Select appointment metrics and fill in credentials.</p>

          {errorMessage && (
            <div className="mb-4 rounded-xl bg-red-500/10 border border-red-500/20 p-3 text-xs text-red-400">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleBooking} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-medium text-brand-muted">Patient Full Name</label>
                <input
                  type="text"
                  required
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="w-full bg-brand-dark border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-teal transition-colors"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-brand-muted">Email Address</label>
                <input
                  type="email"
                  required
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  className="w-full bg-brand-dark border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-teal transition-colors"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-medium text-brand-muted">Phone Number</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-brand-dark border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-teal transition-colors"
                  placeholder="01712345678"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-brand-muted">Gender</label>
                <select
                  required
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full bg-brand-dark border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-teal transition-colors appearance-none"
                  style={{ colorScheme: "white" }}
                >
                  <option value="" disabled className="text-brand-muted">Select Gender</option>
                  <option value="Male" className="text-black">Male</option>
                  <option value="Female" className="text-black">Female</option>
                  <option value="Other" className="text-black">Other</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-brand-muted">Select Date</label>
              <input
                type="date"
                required
                value={appointmentDate}
                onChange={(e) => setAppointmentDate(e.target.value)}
                className="w-full bg-brand-dark border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-teal transition-colors scheme-dark"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-brand-muted">Available Time Slots</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {availableSlots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setAppointmentTime(slot)}
                    className={`rounded-xl py-3 text-xs font-medium border transition-all ${
                      appointmentTime === slot
                        ? "bg-brand-teal text-brand-dark border-white font-bold hover:cursor-pointer"
                        : "bg-brand-dark text-brand-muted border-white/5 hover:border-white/10 hover:text-white"
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={bookingSubmit}
              className="w-full rounded-xl bg-white py-3.5 text-sm font-semibold text-black shadow-lg shadow-brand-teal/10 transition-all hover:opacity-90 active:scale-[0.99] disabled:opacity-50 hover:cursor-pointer"
            >
              {bookingSubmit ? "Processing Booking..." : "Confirm Secure Appointment"}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}