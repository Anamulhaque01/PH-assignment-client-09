"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function LoginView() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [googleLoading, setGoogleLoading] = useState<boolean>(false);

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Invalid credentials");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
      toast.error(err.message || "Login failed. Please verify credentials.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleLogin = () => {
    const globalWindow = window as any;

    if (!globalWindow.google) {
      setError("Google authentication API failed to load. Please refresh.");
      toast.error("Google authentication API unavailable.");
      return;
    }

    setGoogleLoading(true);
    setError("");

    try {
      const client = globalWindow.google.accounts.oauth2.initCodeClient({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        scope: "email profile openid",
        ux_mode: "popup",
        callback: async (response: { code?: string }) => {
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
              
              router.push("/dashboard");
            } catch (err: any) {
              setError(err.message);
              toast.error(err.message || "Google registration sync failed.");
            } finally {
              setGoogleLoading(false);
            }
          }
        },
        error_callback: () => {
          setError("Google login popup closed or encountered an execution failure.");
          toast.error("Google login handshake disrupted.");
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
        <div className="mb-8">
          <p className="text-xs font-semibold tracking-widest text-brand-teal uppercase mb-1">Access</p>
          <h1 className="text-3xl font-bold text-white tracking-tight">Login</h1>
        </div>

        {error && (
          <div className="mb-5 rounded-xl bg-red-500/10 border border-red-500/20 p-3 text-xs text-red-400">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="text-xs font-medium text-brand-muted">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-brand-dark border border-white/5 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-brand-teal transition-colors"
              placeholder="name@example.com"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-brand-muted">Password</label>
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
            className="w-full rounded-xl bg-white hover:cursor-pointer py-3.5 text-sm font-semibold text-black shadow-lg shadow-brand-teal/5 transition-all hover:opacity-90 active:scale-[0.99] disabled:opacity-50 mt-2"
          >
            {submitting ? "Verifying Credentials..." : "Sign In"}
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
            <span>Continue with Google</span>
          )}
        </button>

        <hr className="my-6 border-white/5" />

        <p className="text-center text-xs text-brand-muted">
          Don’t have an account?{" "}
          <Link href="/register" className="text-brand-teal hover:underline font-medium">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}