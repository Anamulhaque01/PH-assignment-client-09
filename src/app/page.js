export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-brand-dark p-6">
      <div className="bg-brand-surface border border-slate-800 p-8 rounded-2xl max-w-md text-center shadow-xl">
        <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">DocAppoint</h1>
        <p className="text-brand-muted mb-6">Your Next.js Swiss Minimalist Healthcare Dashboard.</p>
        <button className="bg-brand-teal text-brand-dark font-semibold px-6 py-2.5 rounded-xl transition-transform hover:scale-[1.02] active:scale-[0.98]">
          Next.js + Tailwind Active
        </button>
      </div>
    </main>
  );
}