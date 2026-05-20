"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Criteria Password Assessment
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    
    if (!hasUpper) {
      setError("Password must contain at least one uppercase letter.");
      return;
    }
    if (!hasLower) {
      setError("Password must contain at least one lowercase letter.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, photoUrl, password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Registration failed");

      router.push("/login");
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-6 py-12 bg-brand-dark">
      <div className="w-full max-w-md rounded-3xl border border-white/5 bg-brand-surface p-8 shadow-xl">
        <h1 className="text-2xl font-bold text-white mb-6">Register</h1>

        {error && (
          <div className="mb-4 rounded-xl bg-red-500/10 border border-red-500/20 p-3 text-xs text-red-400">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs text-brand-muted block mb-1">Full Name</label>
            <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-brand-dark border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-teal" placeholder="John Doe" />
          </div>
          <div>
            <label className="text-xs text-brand-muted block mb-1">Email Address</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-brand-dark border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-teal" placeholder="john@example.com" />
          </div>
          <div>
            <label className="text-xs text-brand-muted block mb-1">Profile Photo URL</label>
            <input type="url" required value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} className="w-full bg-brand-dark border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-teal" placeholder="https://link.com/photo.jpg" />
          </div>
          <div>
            <label className="text-xs text-brand-muted block mb-1">Password</label>
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-brand-dark border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-teal" placeholder="••••••••" />
          </div>

          <button type="submit" disabled={submitting} className="w-full rounded-xl bg-brand-teal py-3.5 text-sm font-semibold text-brand-dark shadow-lg transition-all hover:opacity-90">
            {submitting ? "Registering..." : "Register"}
          </button>
        </form>
        <p className="text-center text-xs text-brand-muted mt-4">
          Already have an account? <Link href="/login" className="text-brand-teal font-medium">Login</Link>
        </p>
      </div>
    </div>
  );
}