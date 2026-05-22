"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false); 
  const [user, setUser] = useState(null);

  // Sync state with localStorage instantly on every page transition
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setIsOpen(false);
    router.push("/login");
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "All Doctors", href: "/doctors" },
    ...(user ? [{ name: "Dashboard", href: "/dashboard" }] : []),
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-brand-dark/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 h-20">
        
        {/* Brand Logo + Name */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-teal/10 border border-brand-teal/20 text-brand-teal transition-transform duration-300 group-hover:scale-105">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            Doc<span className="text-brand-teal">Appoint</span>
          </span>
        </Link>

        {/* Desktop Navigation Links with Active States */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-sm font-medium py-2 transition-colors duration-200 hover:text-brand-teal after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-brand-teal after:transition-all after:duration-300 ${
                  isActive 
                    ? "text-teal-700  font-semibold after:w-full" 
                    : "text-brand-muted after:w-0 hover:after:w-full"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Desktop Action Buttons / User Status Area */}
        <div className="hidden sm:flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              {/* Profile Photo Wrapper */}
              <div className="w-10 h-10 rounded-full border-2 border-brand-teal overflow-hidden bg-brand-surface shadow-md">
                <img 
                  src={user.photoUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb"} 
                  alt={user.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <button
                onClick={handleLogout}
                className="rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-2 text-xs font-semibold tracking-wide text-red-400 uppercase transition-all duration-200 hover:bg-red-500 hover:text-white"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-medium text-brand-muted transition-colors duration-200 hover:text-white px-3 py-2"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="rounded-xl bg-brand-teal px-3 py-2.5 text-sm font-semibold text-brand-dark transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Hamburger Trigger */}
        <div className="flex items-center md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-white hover:text-brand-teal transition-colors rounded-xl bg-white/5 border border-white/5 hover:cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

      </div>

      {/* Mobile Dropdown Drawer Links with Active States */}
      {isOpen && (
        <div className="md:hidden border-b border-white/5 bg-brand-dark px-6 py-5 space-y-4 transition-all duration-200 ">
          
          <div className="space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)} 
                  className={`block text-base font-medium py-2.5 px-4  transition-colors ${
                    isActive 
                      ? "text-brand-teal bg-brand-teal/10 font-semibold border-l-4 border-teal-700" 
                      : "text-brand-muted hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <hr className="border-white/5" />

          {user ? (
            <div className="flex items-center justify-between pt-2 px-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full border-2 border-brand-teal overflow-hidden bg-brand-surface">
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