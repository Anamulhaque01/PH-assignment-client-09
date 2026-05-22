"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function RegisterView() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    
    if (!hasUpper) {
      const msg = "Password must contain at least one uppercase letter.";
      setError(msg);
      toast.error(msg);
      return;
    }
    if (!hasLower) {
      const msg = "Password must contain at least one lowercase letter.";
      setError(msg);
      toast.error(msg);
      return;
    }
    if (password.length < 6) {
      const msg = "Password must be at least 6 characters long.";
      setError(msg);
      toast.error(msg);
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, photoUrl, password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Registration failed");

      toast.success("Account created successfully! Please login.");
      router.push("/login");
    } catch (err) {
      setError(err.message);
      toast.error(err.message || "Registration sequence failure.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleLogin = () => {
    if (!window.google) {
      setError("Google authentication API failed to load. Please refresh.");
      toast.error("Google authentication API unavailable.");
      return;
    }

    setGoogleLoading(true);
    setError("");

    try {
      const client = window.google.accounts.oauth2.initCodeClient({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        scope: "email profile openid",
        ux_mode: "popup",
        callback: async (response) => {
          if (response.code) {
            try {
              const backendRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/google`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ code: response.code }),
              });

              const backendData = await backendRes.json();

              if (!backendRes.ok) {
                throw new Error(backendData.message || "Google authorization handshake failed.");
              }

              localStorage.setItem("token", backendData.token);
              localStorage.setItem("user", JSON.stringify(backendData.user));
              
              toast.success("Signed up successfully via Google!");
              router.push("/dashboard");
            } catch (err) {
              setError(err.message);
              toast.error(err.message || "Google registration handshake failed.");
            } finally {
              setGoogleLoading(false);
            }
          }
        },
        error_callback: (err) => {
          setError("Google registration popup closed or encountered an execution failure.");
          toast.error("Google popup closed unexpectedly.");
          setGoogleLoading(false);
        }
      });

      client.requestCode();
    } catch (err) {
      setError("Failed initializing Google Client authorization workflow.");
      toast.error("Could not run OAuth initialization.");
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-6 py-12 bg-brand-dark">
      <div className="w-full max-w-md rounded-3xl border border-white/5 bg-brand-surface p-8 shadow-2xl">
        <div className="mb-6">
          <p className="text-xs font-semibold tracking-widest text-brand-teal uppercase mb-1">Access</p>
          <h1 className="text-3xl font-bold text-white tracking-tight">Register</h1>
        </div>

        {error && (
          <div className="mb-5 rounded-xl bg-red-500/10 border border-red-500/20 p-3 text-xs text-red-400">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-medium text-brand-muted block mb-1">Full Name</label>
            <input 
              type="text" 
              required 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              className="w-full bg-brand-dark border border-white/5 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-brand-teal transition-colors" 
              placeholder="John Doe" 
            />
          </div>
          
          <div>
            <label className="text-xs font-medium text-brand-muted block mb-1">Email Address</label>
            <input 
              type="email" 
              required 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="w-full bg-brand-dark border border-white/5 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-brand-teal transition-colors" 
              placeholder="john@example.com" 
            />
          </div>
          
          <div>
            <label className="text-xs font-medium text-brand-muted block mb-1">Profile Photo URL</label>
            <input 
              type="url" 
              required 
              value={photoUrl} 
              onChange={(e) => setPhotoUrl(e.target.value)} 
              className="w-full bg-brand-dark border border-white/5 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-brand-teal transition-colors" 
              placeholder="https://link.com/photo.jpg" 
            />
          </div>
          
          <div>
            <label className="text-xs font-medium text-brand-muted block mb-1">Password</label>
            <input 
              type="password" 
              required 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className="w-full bg-brand-dark border border-white/5 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-brand-teal transition-colors" 
              placeholder="••••••••" 
            />
          </div>

          <button 
            type="submit" 
            disabled={submitting || googleLoading} 
            className="w-full rounded-xl bg-white py-3.5 text-sm font-semibold text-black shadow-lg shadow-brand-teal/5 transition-all hover:opacity-90 active:scale-[0.99] disabled:opacity-50 mt-2 hover:cursor-pointer"
          >
            {submitting ? "Creating Account..." : "Register"}
          </button>
        </form>

        <div className="relative flex py-6 items-center">
          <div className="flex-grow border-t border-white/5"></div>
          <span className="flex-shrink mx-4 text-[10px] uppercase font-bold tracking-widest text-brand-muted">or continue with</span>
          <div className="flex-grow border-t border-white/5"></div>
        </div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={submitting || googleLoading}
          className="w-full flex items-center justify-center gap-3 rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm font-medium text-white transition-all hover:bg-white/10 active:scale-[0.99] disabled:opacity-50 hover:cursor-pointer"
        >
          {googleLoading ? (
            <span className="text-xs text-brand-muted">Connecting Account Securely...</span>
          ) : (
            <span>SignUp with Google</span>
          )}
        </button>

        <hr className="my-6 border-white/5" />

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