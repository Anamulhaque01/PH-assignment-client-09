import React from "react";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-white/5 bg-brand-dark mt-auto">
      <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        
        {/* Main Grid: 1 Column on Mobile, 3 Columns on Tablet/Desktop */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3">
          
          {/* Brand Column */}
          <div className="space-y-4">
            <Link href="/" className="text-lg font-bold tracking-tight text-white">
              Doc<span className="text-brand-teal">Appoint</span>
            </Link>
            <p className="text-sm leading-relaxed text-brand-muted max-w-xs">
              Seamlessly connect with top-rated medical experts and take full control of your healthcare journey.
            </p>
          </div>

          {/* Quick Links Column */}
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

          {/* Contact / Location Column */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">Contact</h4>
            <ul className="space-y-2.5 text-sm text-brand-muted">
              <li>KDA Avenue, Khulna, Bangladesh</li>
              <li>support@docappoint.com</li>
              <li>+880 1700-000000</li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Multi-directional layout shifting */}
        <div className="mt-12 border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brand-muted">
          <p>&copy; {currentYear} DocAppoint. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-brand-teal transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-brand-teal transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
}