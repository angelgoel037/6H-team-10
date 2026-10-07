import { CATEGORY_LABELS } from '@/src/shared/constants';
import { StatusBadge } from '@/components/StatusBadge';
import { Compass, Sparkles, CheckCircle2, Users, Layers, ShieldCheck } from 'lucide-react';

export default function HomePage() {
  const teamTracks = [
    { name: 'Angel', role: 'Team Lead · Product, Content & UX/UI', branch: 'feat/angel/*' },
    { name: 'Nidhi', role: 'Frontend & PWA Engineering', branch: 'feat/nidhi/*' },
    { name: 'Jayant', role: 'Backend, Database & Publisher Flow', branch: 'feat/jayant/*' },
    { name: 'Prabhav', role: 'AI Extraction & Intelligence', branch: 'feat/prabhav/*' },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between p-6 sm:p-12 max-w-5xl mx-auto">
      {/* Header */}
      <header className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          Phase 0 Foundation Established
        </div>
        <div className="flex items-center gap-3">
          <Compass className="w-9 h-9 text-indigo-400" />
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-indigo-300 bg-clip-text text-transparent">
            CampusPilot
          </h1>
        </div>
        <p className="text-lg text-slate-400 max-w-2xl">
          One campus. Thousands of experiences. One personalized feed.
        </p>
      </header>

      {/* Grid: Architecture & Readiness */}
      <section className="my-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* System & Architecture Status */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-slate-200 flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-400" />
              Architecture & Conventions
            </h2>
            <StatusBadge importance="normal" />
          </div>
          <ul className="space-y-2 text-sm text-slate-400">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Modular Monolith with strict layer boundaries</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Domain model <code className="text-indigo-300">CampusItem</code> & Zod validation schema</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>SOLID principles & decoupled AI/DB adapters</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>PWA-ready manifest and responsive layout baseline</span>
            </li>
          </ul>
        </div>

        {/* Team Ownership Tracks */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-slate-200 flex items-center gap-2">
              <Users className="w-4 h-4 text-indigo-400" />
              Engineering Ownership Tracks
            </h2>
            <ShieldCheck className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="space-y-2.5">
            {teamTracks.map((member) => (
              <div
                key={member.name}
                className="flex items-center justify-between p-2 rounded-lg bg-slate-950/50 border border-slate-800/60 text-xs"
              >
                <div>
                  <span className="font-semibold text-slate-200">{member.name}</span>
                  <span className="text-slate-500 ml-2">({member.role})</span>
                </div>
                <code className="text-indigo-400 font-mono text-[11px]">{member.branch}</code>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Taxonomy Preview */}
      <section className="space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          Core Campus Category Taxonomy (7 MVP Streams)
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 text-xs">
          {Object.entries(CATEGORY_LABELS).map(([key, item]) => (
            <div
              key={key}
              className="p-3 rounded-xl bg-slate-900/40 border border-slate-800/60 flex items-center gap-2.5"
            >
              <span className="text-base">{item.icon}</span>
              <span className="font-medium text-slate-300">{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-12 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
        <span>CampusPilot Phase 0 · Ready for Phase 1 Parallel Execution</span>
        <span>Next.js · TypeScript · Tailwind CSS · Vitest</span>
      </footer>
    </main>
  );
}
