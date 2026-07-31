import { createFileRoute } from "@tanstack/react-router";
import { ScienceSection } from "@/components/jr/ScienceSection";
import { MagneticButton } from "@/components/jr/MagneticButton";
import { useReveal } from "@/lib/useReveal";
import { FlaskConical, FileCheck2, Microscope, ShieldCheck } from "lucide-react";
import vial from "@/assets/vial.jpg";

export const Route = createFileRoute("/science")({
  head: () => ({
    meta: [
      { title: "Science — HPLC-verified Peptides · Jacked Rabbits" },
      { name: "description", content: "The mechanism, the methodology, and the lab data behind every Jacked Rabbits compound." },
      { property: "og:title", content: "The Science — Jacked Rabbits" },
      { property: "og:description", content: "Peptide signaling, HPLC verification, and third-party lab reports." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SciencePage,
});

function SciencePage() {
  useReveal();
  return (
    <main className="relative min-h-screen pt-32">
      <section className="relative overflow-hidden border-b border-border py-16 md:py-24">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-40"
          style={{
            background:
              "radial-gradient(900px 500px at 30% 30%, rgb(43 90 143 / 0.18), transparent 60%), radial-gradient(900px 500px at 70% 70%, rgb(93 138 111 / 0.15), transparent 60%)",
          }}
        />
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <span className="font-mono text-[10px] uppercase tracking-wide text-[rgb(43_90_143)]">
            / The Science
          </span>
          <h1 className="mt-4 font-display text-6xl leading-[0.9] md:text-8xl">
            Engineered.<br />
            <span className="text-shimmer">Audited.</span>
          </h1>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-foreground/60 md:text-base">
            Every compound in the arsenal is analyzed by an ISO-17025 accredited
            laboratory. No pass, no ship. We publish the numbers.
          </p>
        </div>
      </section>

      <ScienceSection />

      <section className="border-t border-border py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="grid gap-6 md:grid-cols-4">
            {[
              { i: FlaskConical, t: "Synthesis", d: "Solid-phase peptide synthesis in ISO-9001 facilities." },
              { i: Microscope, t: "Analysis", d: "HPLC + mass spec on every 500-unit production lot." },
              { i: FileCheck2, t: "Documentation", d: "Batch-specific COA published on the product page." },
              { i: ShieldCheck, t: "Verification", d: "Blind spot-checks by an unaffiliated ISO-17025 lab." },
            ].map((c) => (
              <div key={c.t} className="reveal rounded-2xl border border-border bg-card p-6">
                <c.i className="h-6 w-6 text-[rgb(93_138_111)]" />
                <h3 className="mt-4 font-display text-2xl">{c.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/60">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-32">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 md:grid-cols-2 md:items-center md:px-12">
          <div className="reveal relative">
            <div className="absolute -inset-6 -z-10 rounded-3xl bg-gradient-to-br from-[rgb(43_90_143)]/20 to-[rgb(93_138_111)]/20 blur-2xl" />
            <img src={vial} alt="Vial" className="w-full rounded-3xl border border-border object-cover" />
          </div>
          <div className="reveal flex flex-col gap-6">
            <span className="font-mono text-[10px] uppercase tracking-wide text-[rgb(43_90_143)]">
              / Reference the data
            </span>
            <h2 className="font-display text-5xl leading-[0.9] md:text-6xl">
              Read the <span className="text-shimmer">lab reports.</span>
            </h2>
            <p className="max-w-md text-sm leading-relaxed text-foreground/60 md:text-base">
              Every product page links its lot-specific COA. Every COA is signed
              by the analyst who ran it. Every batch archived for eight years.
            </p>
            <div>
              <MagneticButton to="/shop" variant="blue">Browse compounds</MagneticButton>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
