    "use client";

    import React, { useState } from "react";
    import Link from "next/link";
    import { usePathname } from "next/navigation";

    export default function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false); 


    const navLinks = [
        { name: "Home", href: "/" },
        { name: "All Doctors", href: "/doctors" },
        { name: "Dashboard", href: "/dashboard" },
    ];

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-brand-dark/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 h-20">
            

            <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight text-white">
                Doc<span className="text-brand-teal">Appoint</span>
            </span>
            </Link>


            <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                <Link
                    key={link.href}
                    href={link.href}
                    className={`text-sm font-medium transition-colors duration-200 hover:text-brand-teal ${
                    isActive ? "text-brand-teal" : "text-brand-muted"
                    }`}
                >
                    {link.name}
                </Link>
                );
            })}
            </div>


            <div className="hidden sm:flex items-center gap-3">
            <Link
                href="/login"
                className="text-sm font-medium text-brand-muted transition-colors duration-200 hover:text-white px-4 py-2"
            >
                Sign In
            </Link>
            <Link
                href="/register"
                className="rounded-xl bg-brand-teal px-5 py-2.5 text-sm font-semibold text-brand-dark transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
            >
                Register
            </Link>
            </div>

            <div className="flex items-center md:hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-white hover:text-brand-teal transition-colors rounded-xl bg-white/5 border border-white/5"
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


        {isOpen && (
            <div className="md:hidden border-b border-white/5 bg-brand-dark px-6 py-5 space-y-4 transition-all duration-200">
            

            <div className="space-y-1">
                {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                    <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)} 
                    className={`block text-base font-medium py-2.5 px-3 rounded-xl transition-colors ${
                        isActive ? "text-brand-teal bg-brand-teal/5" : "text-brand-muted hover:text-white"
                    }`}
                    >
                    {link.name}
                    </Link>
                );
                })}
            </div>

            <hr className="border-white/5" />


            <div className="grid grid-cols-2 gap-3 pt-1">
                <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="block text-center rounded-xl border border-white/10 py-3 text-sm font-medium text-white hover:bg-white/5 transition-all"
                >
                Sign In
                </Link>
                <Link
                href="/register"
                onClick={() => setIsOpen(false)}
                className="block text-center rounded-xl bg-brand-teal py-3 text-sm font-semibold text-brand-dark hover:opacity-90 transition-all shadow-md shadow-brand-teal/10"
                >
                Register
                </Link>
            </div>

            </div>
        )}
        </nav>
    );
    }