import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center">
      <div className="relative mb-6">
        <h1 className="text-9xl font-extrabold tracking-widest text-white/5 select-none">
          404
        </h1>
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-xl font-bold text-brand-teal tracking-wide uppercase">
            Route Unresolved
          </p>
        </div>
      </div>

      <p className="text-base text-brand-muted max-w-md mb-8 leading-relaxed">
        The clinical terminal page you are looking for has been moved, archived, or does not exist in our directory.
      </p>

      <Link
        href="/"
        className="rounded-xl bg-brand-surface border border-white/10 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-white/10 active:scale-[0.98]"
      >
        Return to Home Station
      </Link>
    </div>
  );
}