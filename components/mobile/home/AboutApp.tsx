"use client";

export default function AboutApp() {
  return (
    <div className="w-full h-full bg-[#0b0b0b] text-white overflow-y-auto">
      <div className="px-6 pt-14 pb-24 space-y-20 max-w-105 mx-auto">

        {/* HEADER */}
        <section className="space-y-5">
          <h1 className="text-3xl font-semibold tracking-tight">
            Arshad
          </h1>

          <p className="text-sm text-white/60 leading-relaxed">
            Full-Stack Engineer<br />
            Backend Practitioner · Systems-Oriented Builder
          </p>

          {/* subtle divider */}
          <div className="h-px w-12 bg-white/20" />
        </section>

        {/* ABOUT */}
        <section className="space-y-5">
          <h2 className="text-lg font-medium text-white/90">
            About
          </h2>

          <p className="text-sm text-white/70 leading-relaxed">
            I build software with a bias toward correctness, scalability,
            and long-term maintainability.
          </p>

          <p className="text-sm text-white/70 leading-relaxed">
            My comfort zone is closer to the backend — APIs, databases,
            distributed components, and infrastructure-aware systems —
            but I enjoy owning products end-to-end when needed.
          </p>

          <p className="text-sm text-white/70 leading-relaxed">
            I value understanding <span className="text-white/85">why</span> things work,
            not just <span className="text-white/85">how</span> to use them.
          </p>
        </section>

        {/* HIGHLIGHT CARD */}
        <section className="rounded-2xl bg-white/5 border border-white/10 p-5 space-y-3">
          <p className="text-sm text-white/80 leading-relaxed">
            I’m not framework-driven.
          </p>

          <p className="text-sm text-white/70 leading-relaxed">
            I focus on fundamentals, trade-offs, and how systems behave
            under load, failure, and unexpected conditions.
          </p>
        </section>

        {/* WHAT I WORK ON */}
        <section className="space-y-6">
          <h2 className="text-lg font-medium text-white/90">
            What I Work On
          </h2>

          <ul className="space-y-4 text-sm text-white/70">
            <li>
              <span className="text-white/90">Backend APIs</span>
              <div className="text-white/50 text-xs">
                Service boundaries, contracts, versioning
              </div>
            </li>

            <li>
              <span className="text-white/90">Data & Storage</span>
              <div className="text-white/50 text-xs">
                Databases, caching, consistency models
              </div>
            </li>

            <li>
              <span className="text-white/90">Distributed Systems</span>
              <div className="text-white/50 text-xs">
                Message queues, replication, failure handling
              </div>
            </li>

            <li>
              <span className="text-white/90">Security</span>
              <div className="text-white/50 text-xs">
                Auth, access control, system trust boundaries
              </div>
            </li>
          </ul>
        </section>

        {/* ENGINEERING PHILOSOPHY */}
        <section className="space-y-5">
          <h2 className="text-lg font-medium text-white/90">
            Engineering Philosophy
          </h2>

          <p className="text-sm text-white/70 leading-relaxed">
            Good software should be predictable, observable, and boring
            in the best possible way.
          </p>

          <p className="text-sm text-white/70 leading-relaxed">
            I care deeply about edge cases, failure modes, and the
            operational reality of systems — not just happy-path demos.
          </p>
        </section>

        {/* CURRENT FOCUS */}
        <section className="space-y-6">
          <h2 className="text-lg font-medium text-white/90">
            Current Focus
          </h2>

          <ul className="space-y-4 text-sm text-white/70">
            <li>• Designing scalable backend architectures</li>
            <li>• Improving reliability & performance under load</li>
            <li>• Building systems meant to live for years</li>
            <li>• Deepening distributed systems knowledge</li>
          </ul>
        </section>

        {/* FOOTER */}
        <section className="pt-12 border-t border-white/10">
          <p className="text-xs text-white/40 leading-relaxed">
            Substance over hype.<br />
            Systems over shortcuts.
          </p>
        </section>

      </div>
    </div>
  );
}
