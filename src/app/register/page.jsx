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
    setSubmitting(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, photoUrl, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      router.push("/login");
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md rounded-3xl border border-white/5 bg-brand-surface p-8 shadow-xl">
        <div className="mb-8">
          <p className="text-xs font-semibold tracking-widest text-brand-teal uppercase mb-2">Join</p>
          <h1 className="text-2xl font-bold text-white tracking-tight">Register</h1>
        </div>

        {error && (
          <div className="mb-4 rounded-xl bg-red-500/10 border border-red-500/20 p-3 text-xs text-red-400">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-brand-muted">Full Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-brand-dark border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-teal transition-colors"
              placeholder="John Doe"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-brand-muted">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-brand-dark border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-teal transition-colors"
              placeholder="john@example.com"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-brand-muted">Profile Photo URL</label>
            <input
              type="url"
              required
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              className="w-full bg-brand-dark border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-teal transition-colors"
              placeholder="https://images.com/avatar.jpg"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-brand-muted">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-brand-dark border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-teal transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-xl bg-brand-teal py-3.5 text-sm font-semibold text-brand-dark shadow-lg shadow-brand-teal/10 transition-all hover:opacity-90 active:scale-[0.99] disabled:opacity-50"
          >
            {submitting ? "Creating Profile..." : "Create Account"}
          </button>
        </form>

        <hr className="my-5 border-white/5" />

        <p className="text-center text-xs text-brand-muted">
          Already have an account?{" "}
          <Link href="/login" className="text-brand-teal hover:underline font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}