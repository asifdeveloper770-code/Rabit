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
    <main className="relative overflow-x-hidden bg-slate-50 font-sans text-slate-800 antialiased selection:bg-[rgb(43_90_143)]/10 selection:text-[rgb(43_90_143)]">
      <Hero />

      {/* Credibility Bar */}
      <section className="border-y border-slate-200/80 bg-white shadow-sm mt-10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-6 py-4 font-sans text-xs font-semibold uppercase tracking-wider text-slate-500 md:px-12">
          <span>ISO-17025 Tested</span>
          <span className="hidden h-3 w-px bg-slate-200 md:block" />
          <span>Cold-Chain Shipping</span>
          <span className="hidden h-3 w-px bg-slate-200 md:block" />
          <span>Batch COA Included</span>
          <span className="hidden h-3 w-px bg-slate-200 md:block" />
          <span>USA Formulated</span>
        </div>
      </section>

      {/* Catalogue Index */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <div className="reveal flex flex-wrap items-end justify-between gap-4 border-b border-slate-200 pb-6">
            <div>
              <span className="font-sans text-xs font-bold uppercase tracking-widest text-[rgb(43_90_143)]">
                Featured Stacks
              </span>
              <h2 className="mt-1 font-sans text-3xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
                Selected Compounds
              </h2>
            </div>
            <Link
              to="/shop "
              className="font-sans text-xs font-semibold uppercase tracking-wider text-slate-500 transition-colors hover:text-slate-900"
            >
              Full Catalogue →
            </Link>
          </div>

          <ul className="divide-y divide-slate-100">
            {featured.map((p, i) => (
              <li key={p.id} className="reveal" style={{ transitionDelay: `${i * 50}ms` }}>
                <Link
                  to="/shop/$productId"
                  params={{ productId: p.id }}
                  data-magnetic
                  className="group grid grid-cols-[64px_1fr_auto] items-center gap-5 py-6 transition-all duration-200 hover:bg-slate-50/80 md:grid-cols-[80px_1.2fr_2fr_auto] md:gap-8 md:rounded-2xl md:px-6"
                >
                  <div className="overflow-hidden rounded-xl border border-slate-200/80 bg-slate-100 shadow-sm">
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
                    <div className="font-sans text-[11px] font-semibold uppercase tracking-wider text-[rgb(43_90_143)]">
                      {p.category}
                    </div>
                    <div className="mt-0.5 font-sans text-xl font-bold tracking-tight text-slate-900 md:text-2xl">
                      {p.name}
                    </div>
                  </div>
                  <p className="col-span-3 hidden font-sans text-xs font-normal leading-relaxed text-slate-500 md:col-span-1 md:block">
                    {p.summary}
                  </p>
                  <div className="text-right font-sans text-xl font-bold text-slate-900 md:text-2xl">
                    ${p.price}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Standard / Purity Section */}
      {/* <section className="border-t border-slate-200/80 bg-slate-100/60 py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 md:grid-cols-2 md:px-12">
          <div className="reveal order-2 flex flex-col gap-6 md:order-1">
            <div>
              <span className="font-sans text-xs font-bold uppercase tracking-widest text-[rgb(43_90_143)]">
                Our Standard
              </span>
              <h2 className="mt-2 font-sans text-3xl font-extrabold tracking-tight text-slate-900 md:text-5xl md:leading-tight">
                Purity you can audit.
              </h2>
            </div>
            <p className="max-w-md font-sans text-sm leading-relaxed text-slate-600">
              Every lot is analysed by an independent ISO-17025 laboratory before
              it ships. No pass, no ship — and we publish the numbers on the
              product page.
            </p>

            <div className="grid grid-cols-3 gap-6 border-t border-slate-200/80 pt-6">
              {[
                { k: "99.4%", v: "Avg Purity" },
                { k: "0.0%", v: "Endotoxin" },
                { k: "24h", v: "Dispatch" },
              ].map((s) => (
                <div key={s.v}>
                  <div className="font-sans text-2xl font-black text-slate-900 md:text-3xl">
                    {s.k}
                  </div>
                  <div className="mt-1 font-sans text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {s.v}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <MagneticButton to="/science" variant="blue">
                Read the science
              </MagneticButton>
            </div>
          </div>

          <div className="reveal order-1 md:order-2">
            <div className="relative mx-auto max-w-sm rounded-2xl border border-slate-200/80 bg-white p-2 shadow-md">
              <img
                src={vial}
                alt="Independently tested research peptide vial"
                loading="lazy"
                width={1024}
                height={1280}
                className="w-full rounded-xl object-cover"
              />
            </div>
          </div>
        </div>
      </section> */}

      {/* Quote + CTA Section */}
      {/* <section className="bg-white py-24 md:py-32">
        <div className="mx-auto max-w-3xl px-6 text-center md:px-12">
          <blockquote className="reveal font-sans text-2xl font-bold leading-tight tracking-tight text-slate-900 md:text-4xl">
            "I've tried every stack. Jacked Rabbits is the standard now."
          </blockquote>
          <div className="reveal mt-4 font-sans text-xs font-semibold uppercase tracking-widest text-slate-400">
            — Marcus K., 4× national powerlifting champion
          </div>
          <div className="reveal mt-10 flex flex-wrap justify-center gap-4">
            <MagneticButton to="/shop" variant="blue">
              Shop the catalogue
            </MagneticButton>
            <MagneticButton to="/contact" variant="ghost">
              Talk to a specialist
            </MagneticButton>
          </div>
        </div>
      </section> */}
    </main>
  );
}