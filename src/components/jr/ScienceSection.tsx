import { useEffect, useRef, useState } from "react";
import vial from "@/assets/vial.jpg";

const CARDS = [
  {
    tag: "01 / Signal",
    title: "Targeted Peptide Signaling",
    body:
      "Amino-acid chains that speak directly to receptors — driving hypertrophy, recovery, and cellular repair with sniper precision.",
  },
  {
    tag: "02 / Recovery",
    title: "Accelerated Tissue Repair",
    body:
      "Collagen synthesis, mitochondrial density, and CNS recovery — bounce back from brutal sessions in a fraction of the time.",
  },
  {
    tag: "03 / Adapt",
    title: "Adaptive Metabolic Load",
    body:
      "Optimized nutrient partitioning. Fat becomes fuel, protein becomes muscle. Zero wasted calories, maximum output.",
  },
];

export function ScienceSection() {
  const wrapRef = useRef<HTMLElement>(null);
  const [t, setT] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = wrapRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 as section enters viewport bottom, 1 as it leaves the top
      const p = Math.max(0, Math.min(1, 1 - (r.top + r.height * 0.3) / (vh + r.height * 0.6)));
      setT(p);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const rotate = t * 180;

  return (
    <section
      id="science"
      ref={wrapRef}
      className="relative overflow-hidden py-24 md:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(1000px 700px at 20% 40%, rgb(43 90 143 / 0.08), transparent 60%), radial-gradient(900px 600px at 85% 70%, rgb(93 138 111 / 0.07), transparent 60%)",
        }}
      />

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 px-6 md:grid-cols-2 md:gap-10 md:px-12">
        {/* Left: vial */}
        <div className="relative flex min-h-[60vh] items-center justify-center md:sticky md:top-24 md:min-h-[80vh]">
          <div
            aria-hidden
            className="absolute inset-0 -z-10 blur-3xl"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgb(43 90 143 / 0.22), transparent 60%), radial-gradient(circle at 40% 60%, rgb(93 138 111 / 0.16), transparent 65%)",
            }}
          />
          <img
            src={vial}
            alt="Peptide vial"
            loading="lazy"
            width={1024}
            height={1280}
            className="max-h-[70vh] w-auto object-contain drop-shadow-[0_24px_40px_rgb(28_32_36/0.18)]"
            style={{
              transform: `rotate(${rotate}deg) scale(${0.95 + t * 0.08})`,
              transition: "transform 0.4s cubic-bezier(.2,.7,.2,1)",
            }}
          />
        </div>

        {/* Right: content */}
        <div className="reveal flex flex-col gap-6">
          <span className="font-mono text-[10px] uppercase tracking-wide text-[rgb(93_138_111)]">
            / The Mechanism
          </span>
          <h2 className="font-display text-5xl leading-[0.9] md:text-7xl">
            Science
            <br />
            <span className="text-shimmer">Engineered.</span>
          </h2>
          <p className="max-w-md text-sm leading-relaxed text-foreground/60 md:text-base">
            Every compound is third-party lab-verified. Every batch is HPLC-tested.
            We don't sell hope — we sell measurable adaptation.
          </p>

          <div className="mt-4 flex flex-col gap-4">
            {CARDS.map((c) => (
              <div
                key={c.tag}
                data-magnetic
                className="glass gradient-border reveal group relative rounded-2xl p-6 transition-transform duration-500 hover:-translate-y-1"
              >
                <div className="flex items-baseline justify-between font-mono text-[10px] uppercase tracking-wide text-foreground/40">
                  <span>{c.tag}</span>
                  <span className="text-[rgb(93_138_111)]">Verified</span>
                </div>
                <h3 className="mt-3 font-display text-2xl">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/60">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
