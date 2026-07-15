"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

// Interface schema configuration for stored user parameters
interface UserSession {
  name: string;
  email: string;
  photoUrl?: string;
}

interface NavLinkItem {
  name: string;
  href: string;
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false); 
  const [user, setUser] = useState<UserSession | null>(null);

  // Sync state with localStorage instantly on every page transition
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, [pathname]);

  const handleLogout = (): void => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setIsOpen(false);
    router.push("/login");
  };

  const navLinks: NavLinkItem[] = [
    { name: "Home", href: "/" },
    { name: "All Doctors", href: "/doctors" },
    {name: "About", href: "/about" },
    {name: "Contact", href: "/contact" },
    ...(user ? [{ name: "Dashboard", href: "/dashboard" }] : []),
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-brand-dark/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 h-20">
        
        {/* Brand Logo + Name */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-teal/10 border border-brand-teal/20 text-brand-teal transition-transform duration-300 group-hover:scale-105">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
            </svg>
          </div>
          <span className="text-base font-bold tracking-tight text-white transition-colors group-hover:text-brand-teal">
            DocAppoint
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-xs font-semibold uppercase tracking-wider transition-colors ${
                  isActive ? "text-brand-teal" : "text-brand-muted hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Desktop Controls */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2.5 bg-white/5 border border-white/5 px-3 py-1.5 rounded-xl">
                <div className="h-6 w-6 rounded-lg overflow-hidden bg-brand-dark border border-white/10">
                  <img 
                    src={user.photoUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb"} 
                    alt={user.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-xs font-medium text-white">{user.name.split(" ")[0]}</span>
              </div>
              <button
                onClick={handleLogout}
                className="rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-2.5 text-xs font-semibold tracking-wide text-red-400 uppercase transition-all hover:bg-red-500 hover:text-white hover:border-transparent hover:cursor-pointer"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="rounded-xl border border-white/10 px-4 py-2.5 text-xs font-semibold text-white hover:bg-white/5 transition-all"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="rounded-xl bg-brand-teal px-4 py-2.5 text-xs font-bold text-brand-dark hover:opacity-90 transition-all shadow-md shadow-brand-teal/10"
              >
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-xl bg-white/5 border border-white/5 p-2.5 text-white md:hidden hover:cursor-pointer"
        >
          {isOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Popout Panel */}
      {isOpen && (
        <div className="md:hidden border-t border-white/5 bg-brand-dark px-6 py-6 space-y-6 shadow-xl animate-fade-in">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`text-sm font-medium transition-colors ${
                  pathname === link.href ? "text-brand-teal" : "text-brand-muted"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <hr className="border-white/5" />

          {user ? (
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2.5">
                <div className="h-7 w-7 rounded-lg overflow-hidden bg-brand-dark border border-white/10">
                  <img 
                    src={user.photoUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb"} 
                    alt={user.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-sm font-medium text-white">{user.name.split(" ")[0]}</span>
              </div>
              <button
                onClick={handleLogout}
                className="rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-2.5 text-xs font-semibold tracking-wide text-red-400 uppercase transition-all"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 pt-1">
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="block text-center rounded-xl border border-white/10 py-3 text-sm font-medium text-white hover:bg-white/5 transition-all"
              >
                Login
              </Link>
              <Link
                href="/register"
                onClick={() => setIsOpen(false)}
                className="block text-center rounded-xl bg-brand-teal py-3 text-sm font-semibold text-brand-dark hover:opacity-90 transition-all shadow-md shadow-brand-teal/10"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}