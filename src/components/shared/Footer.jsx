"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function Footer() {
  const [currentYear, setCurrentYear] = useState("");

  // Prevent Next.js hydration mismatch errors by resolving the year on the client side
  useEffect(() => {
    setCurrentYear(new Date().getFullYear().toString());
  }, []);

  return (
    <footer className="w-full border-t border-white/5 bg-brand-dark mt-auto">
      <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        
        {/* Main Content Grid Split into 4 Columns */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4">
          
          {/* Column 1: Platform Identity (Logo + Name matched perfectly) */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-teal/10 border border-brand-teal/20 text-brand-teal">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <span className="text-lg font-bold tracking-tight text-white">
                Doc<span className="text-brand-teal">Appoint</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-brand-muted max-w-xs">
              Seamlessly connect with top-rated medical experts and take full control of your healthcare journey.
            </p>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">Platform</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="text-brand-muted transition-colors hover:text-brand-teal">Home</Link>
              </li>
              <li>
                <Link href="/doctors" className="text-brand-muted transition-colors hover:text-brand-teal">Find Doctors</Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-brand-muted transition-colors hover:text-brand-teal">Patient Dashboard</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">Contact</h4>
            <ul className="space-y-2.5 text-sm text-brand-muted">
              <li>KDA Avenue, Khulna, Bangladesh</li>
              <li>support@docappoint.com</li>
              <li>+880 1700-000000</li>
            </ul>
          </div>

          {/* Column 4: Social Channels Section */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">Social</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-brand-muted transition-colors hover:text-brand-teal">
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
                  </svg>
                  <span>Facebook</span>
                </a>
              </li>
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

        {/* Footer Base Strip */}
        <div className="mt-12 border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brand-muted">
          <p>&copy; {currentYear || "2026"} DocAppoint. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-brand-teal transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-brand-teal transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
}