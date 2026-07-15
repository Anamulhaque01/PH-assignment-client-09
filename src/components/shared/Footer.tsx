"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function Footer() {
  const [currentYear, setCurrentYear] = useState<string>("");

  // Prevent Next.js hydration mismatch errors by resolving the year on the client side
  useEffect(() => {
    setCurrentYear(new Date().getFullYear().toString());
  }, []);

  return (
    <footer className="w-full border-t border-white/5 bg-brand-dark mt-auto">
      <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        
        {/* Main Content Grid Split into 4 Columns */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4">
          
          {/* Column 1: Platform Identity */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-teal/10 border border-brand-teal/20 text-brand-teal">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                </svg>
              </div>
              <span className="text-sm font-bold tracking-tight text-white transition-colors group-hover:text-brand-teal">
                DocAppoint
              </span>
            </Link>
            <p className="text-xs text-brand-muted leading-relaxed">
              Simplifying healthcare bookings by matching verified clinical experts with immediate appointment timelines.
            </p>
          </div>

          {/* Column 2: Directory Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Directory</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/doctors" className="text-brand-muted hover:text-brand-teal transition-colors">
                  Find a Doctor
                </Link>
              </li>
              <li>
                <Link href="/doctors" className="text-brand-muted hover:text-brand-teal transition-colors">
                  Clinical Specialties
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-brand-muted hover:text-brand-teal transition-colors">
                  Patient Portals
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal Foundations */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Compliance</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <span className="text-brand-muted hover:text-brand-teal transition-colors cursor-pointer">Privacy Policies</span>
              </li>
              <li>
                <span className="text-brand-muted hover:text-brand-teal transition-colors cursor-pointer">Terms of Service</span>
              </li>
              <li>
                <span className="text-brand-muted hover:text-brand-teal transition-colors cursor-pointer">Data Protection Logs</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Ecosystem Connect */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Connect Workspace</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-brand-muted transition-colors hover:text-brand-teal">
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                  <span>Twitter</span>
                </a>
              </li>
              <li>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-brand-muted transition-colors hover:text-brand-teal">
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                  <span>LinkedIn</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-12 border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-brand-muted">
          <p>© {currentYear || "2026"} DocAppoint Ecosystem. All professional metrics reserved.</p>
          <p className="tracking-wide">Designed for Next-Gen Clinical Scheduling</p>
        </div>

      </div>
    </footer>
  );
}