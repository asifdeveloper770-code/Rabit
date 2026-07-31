import { createFileRoute, Link } from "@tanstack/react-router";
import { Hero } from "@/components/jr/Hero";
import { MagneticButton } from "@/components/jr/MagneticButton";
import { useReveal } from "@/lib/useReveal";
import { PRODUCTS } from "@/lib/products";
import vial from "@/assets/vial.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Jacked Rabbits — Research Peptides for the Relentless" },
      {
        name: "description",
        content:
          "High-purity research peptides engineered for recovery, growth, and metabolic adaptation. Independently lab-verified.",
      },
      { property: "og:title", content: "Jacked Rabbits — Build. Recover. Adapt." },
      {
        property: "og:description",
        content:
          "Research-grade peptides for athletes who refuse average. HPLC-verified. Independently tested.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  useReveal();
  const featured = PRODUCTS.slice(0, 4);

  return (
    <main className="relative overflow-x-hidden bg-background text-foreground">
      <Hero />

      {/* Thin credibility strip */}
      <section className="border-y border-border bg-secondary/40">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-6 py-5 font-mono text-[10px] uppercase tracking-wide text-foreground/45 md:px-12">
          <span>ISO-17025 Tested</span>
          <span className="hidden h-3 w-px bg-border md:block" />
          <span>Cold-Chain Shipping</span>
          <span className="hidden h-3 w-px bg-border md:block" />
          <span>Batch COA Included</span>
          <span className="hidden h-3 w-px bg-border md:block" />
          <span>USA Formulated</span>
        </div>
      </section>

      {/* Catalogue index — editorial list, not cards */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <div className="reveal flex flex-wrap items-baseline justify-between gap-4 border-b border-border pb-6">
            <h2 className="font-display text-4xl leading-none md:text-5xl">
              Selected compounds
            </h2>
            <Link
              to="/shop"
              className="font-mono text-[10px] uppercase tracking-wide text-foreground/50 transition-colors hover:text-foreground"
            >
              Full catalogue →
            </Link>
          </div>

          <ul className="divide-y divide-border">
            {featured.map((p, i) => (
              <li key={p.id} className="reveal" style={{ transitionDelay: `${i * 50}ms` }}>
                <Link
                  to="/shop/$productId"
                  params={{ productId: p.id }}
                  data-magnetic
                  className="group grid grid-cols-[64px_1fr_auto] items-center gap-5 py-6 transition-colors hover:bg-secondary/50 md:grid-cols-[80px_1.2fr_2fr_auto] md:gap-8 md:px-4"
                >
                  <div className="overflow-hidden rounded-lg border border-border bg-card">
                    <img
                      src={p.img}
                      alt={p.name}
                      loading="lazy"
                      width={160}
                      height={160}
                      className="h-16 w-16 object-cover transition-transform duration-500 group-hover:scale-105 md:h-20 md:w-20"
                    />
                  </div>
                  <div>
                    <div className="font-mono text-[9px] uppercase tracking-wide text-foreground/40">
                      {p.category}
                    </div>
                    <div className="mt-1 font-display text-2xl leading-none md:text-3xl">
                      {p.name}
                    </div>
                  </div>
                  <p className="col-span-3 hidden text-sm leading-relaxed text-foreground/55 md:col-span-1 md:block">
                    {p.summary}
                  </p>
                  <div className="text-right font-display text-2xl text-foreground/80">
                    ${p.price}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Standard / purity split */}
      <section className="border-t border-border bg-secondary/30 py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 md:grid-cols-2 md:px-12">
          <div className="reveal order-2 md:order-1 flex flex-col gap-6">
            <span className="font-mono text-[10px] uppercase tracking-wide text-[rgb(43_90_143)]">
              / Our standard
            </span>
            <h2 className="font-display text-4xl leading-[0.95] md:text-6xl">
              Purity you can audit.
            </h2>
            <p className="max-w-md text-sm leading-relaxed text-foreground/60">
              Every lot is analysed by an independent ISO-17025 laboratory before
              it ships. No pass, no ship — and we publish the numbers on the
              product page.
            </p>
            <div className="grid grid-cols-3 gap-6 border-t border-border pt-6">
              {[
                { k: "99.4%", v: "Avg purity" },
                { k: "0.0%", v: "Endotoxin" },
                { k: "24h", v: "Dispatch" },
              ].map((s) => (
                <div key={s.v}>
                  <div className="font-display text-3xl">{s.k}</div>
                  <div className="mt-1 font-mono text-[9px] uppercase tracking-wide text-foreground/40">
                    {s.v}
                  </div>
                </div>
              ))}
            </div>
            <div>
              <MagneticButton to="/science" variant="blue">
                Read the science
              </MagneticButton>
            </div>
          </div>
          <div className="reveal order-1 md:order-2">
            <img
              src={vial}
              alt="Independently tested research peptide vial"
              loading="lazy"
              width={1024}
              height={1280}
              className="mx-auto w-full max-w-sm rounded-2xl border border-border bg-card object-cover"
            />
          </div>
        </div>
      </section>

      {/* Quote + CTA */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-3xl px-6 text-center md:px-12">
          <blockquote className="reveal font-display text-3xl leading-tight md:text-5xl">
            "I've tried every stack. Jacked Rabbits is the standard now."
          </blockquote>
          <div className="reveal mt-6 font-mono text-[10px] uppercase tracking-wide text-foreground/45">
            — Marcus K., 4× national powerlifting champion
          </div>
          <div className="reveal mt-12 flex flex-wrap justify-center gap-4">
            <MagneticButton to="/shop" variant="blue">
              Shop the catalogue
            </MagneticButton>
            <MagneticButton to="/contact" variant="ghost">
              Talk to a specialist
            </MagneticButton>
          </div>
        </div>
      </section>
    </main>
  );
}
