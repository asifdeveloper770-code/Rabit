import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { PRODUCTS, getProduct } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { MagneticButton } from "@/components/jr/MagneticButton";
import {
  Check,
  ShoppingBag,
  Minus,
  Plus,
  ShieldCheck,
  Thermometer,
  Beaker,
  Syringe,
  Clock,
  Snowflake,
} from "lucide-react";

export const Route = createFileRoute("/shop/$productId")({
  loader: ({ params }) => {
    const product = getProduct(params.productId);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Product not found — Jacked Rabbits" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const p = loaderData.product;
    return {
      meta: [
        { title: `${p.name} — Jacked Rabbits` },
        { name: "description", content: p.summary },
        { property: "og:title", content: `${p.name} — Jacked Rabbits` },
        { property: "og:description", content: p.summary },
        { property: "og:type", content: "product" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ProductDetail,
});

const VIEWS = [
  { label: "Vial", pos: "center" },
  { label: "Label", pos: "top" },
  { label: "Seal", pos: "bottom" },
];

function ProductDetail() {
  const { product } = Route.useLoaderData();
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [view, setView] = useState(0);

  const accent = product.accent === "blue" ? "rgb(43 90 143)" : "rgb(93 138 111)";
  const spec = (label: string) =>
    product.specs.find((s: { label: string; value: string }) => s.label.toLowerCase() === label.toLowerCase())?.value ?? "—";
  const purity = parseFloat(spec("Purity")) || 99;

  const related = PRODUCTS.filter(
    (p) => p.id !== product.id && (product.stack.includes(p.id) || p.category === product.category),
  ).slice(0, 3);

  return (
    <main className="relative min-h-screen pt-28 bg-slate-50 font-sans text-slate-800 antialiased selection:bg-[rgb(43_90_143)]/10 selection:text-[rgb(43_90_143)]">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        {/* Breadcrumbs */}
        <nav className="mb-8 flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-wider text-slate-400">
          <Link to="/shop" className="hover:text-slate-900 transition-colors">
            Shop
          </Link>
          <span>/</span>
          <span className="text-slate-700">{product.name}</span>
        </nav>

        <div className="grid gap-12 lg:grid-cols-[1.05fr_1fr]">
          {/* Gallery */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-2 shadow-sm">
              <img
                src={product.img}
                alt={`${product.name} research peptide vial`}
                className="aspect-[4/5] w-full rounded-2xl object-cover transition-all duration-500"
                style={{ objectPosition: VIEWS[view].pos }}
              />
            </div>
            <div className="mt-4 flex gap-3">
              {VIEWS.map((v, i) => (
                <button
                  key={v.label}
                  onClick={() => setView(i)}
                  className={`overflow-hidden rounded-2xl border bg-white p-1 transition-all ${
                    view === i ? "ring-2 ring-offset-1 shadow-sm" : "border-slate-200/80 opacity-60 hover:opacity-100"
                  }`}
                  style={{
                    borderColor: view === i ? accent : undefined,
                    //@ts-ignore
                    "--tw-ring-color": accent,
                  }}
                  aria-label={`View ${v.label}`}
                >
                  <img
                    src={product.img}
                    alt={`${product.name} ${v.label} view`}
                    className="h-20 w-20 rounded-xl object-cover"
                    style={{ objectPosition: v.pos }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col gap-7">
            <div>
              <span className="font-sans text-xs font-bold uppercase tracking-widest" style={{ color: accent }}>
                {product.tag === product.category ? product.category : `${product.category} · ${product.tag}`}
              </span>
              <h1 className="mt-2 font-sans font-extrabold text-4xl leading-tight text-slate-900 md:text-6xl">
                {product.name}
              </h1>
              <p className="mt-4 max-w-lg font-sans text-base leading-relaxed text-slate-600">
                {product.summary}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-6 border-y border-slate-200/80 py-6">
              <div className="font-sans font-extrabold text-4xl text-slate-900">${product.price}</div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[rgb(93_138_111)]/30 bg-[rgb(93_138_111)]/10 px-3 py-1 font-sans text-xs font-bold text-[rgb(93_138_111)]">
                <span className="h-2 w-2 rounded-full bg-[rgb(93_138_111)] animate-pulse" />
                In stock · Ships in 24h
              </div>
            </div>

            {/* Purity meter */}
            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm">
              <div className="flex items-baseline justify-between">
                <span className="font-sans text-xs font-bold uppercase tracking-wider text-slate-400">HPLC purity</span>
                <span className="font-sans font-extrabold text-3xl text-slate-900">{purity}%</span>
              </div>
              <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${Math.min(100, purity)}%`, background: accent }}
                />
              </div>
              <p className="mt-3 font-sans text-xs text-slate-500">
                Verified by an independent US lab. Lot-specific COA ships with every vial.
              </p>
            </div>

            {/* Dosage & handling */}
            <div className="grid gap-3 sm:grid-cols-3">
              <SpecTile icon={Syringe} label="Presentation" value={spec("Weight")} />
              <SpecTile icon={Clock} label="Half-life" value={spec("Half-life")} />
              <SpecTile icon={Snowflake} label="Storage" value={spec("Storage")} />
            </div>

            <p className="font-sans text-sm leading-relaxed text-slate-600">{product.description}</p>

            {/* Qty + add */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white p-1 shadow-sm">
                <button
                  onClick={() => setQty((v) => Math.max(1, v - 1))}
                  className="flex h-10 w-10 items-center justify-center rounded-full text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                  aria-label="Decrease"
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <div className="w-10 text-center font-sans font-extrabold text-lg text-slate-900">{qty}</div>
                <button
                  onClick={() => setQty((v) => v + 1)}
                  className="flex h-10 w-10 items-center justify-center rounded-full text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                  aria-label="Increase"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>

              <MagneticButton
                variant={product.accent}
                onClick={() => {
                  add(product.id, qty);
                  setAdded(true);
                  setTimeout(() => setAdded(false), 1500);
                }}
              >
                {added ? (
                  <span className="inline-flex items-center gap-2">
                    <Check className="h-3.5 w-3.5" /> Added
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-2">
                    <ShoppingBag className="h-3.5 w-3.5" /> Add {qty} to cart
                  </span>
                )}
              </MagneticButton>

              <Link
                to="/checkout"
                className="font-sans text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-slate-900 transition-colors"
              >
                Go to checkout →
              </Link>
            </div>

            {/* Badges */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { i: ShieldCheck, l: "HPLC verified" },
                { i: Thermometer, l: "Cold-chain" },
                { i: Beaker, l: "USA lab" },
              ].map((t) => (
                <div
                  key={t.l}
                  className="flex flex-col items-center gap-2 rounded-2xl border border-slate-200/80 bg-white p-4 text-center shadow-sm"
                >
                  <t.i className="h-4 w-4 text-slate-700" />
                  <div className="font-sans text-[11px] font-bold uppercase tracking-wider text-slate-500">{t.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-28 border-t border-slate-200/80 pt-14">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <div>
                <span className="font-sans text-xs font-bold uppercase tracking-widest text-[rgb(93_138_111)]">Stack with</span>
                <h2 className="mt-2 font-sans font-extrabold text-4xl text-slate-900">Complete the protocol</h2>
              </div>
              <Link
                to="/shop"
                className="font-sans text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-slate-900 transition-colors"
              >
                View all compounds →
              </Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <RelatedCard key={r.id} product={r} />
              ))}
            </div>
          </section>
        )}

        <div className="py-16" />
      </div>
    </main>
  );
}

function SpecTile({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm">
      <Icon className="h-4 w-4 text-slate-400" />
      <div className="mt-2 font-sans text-[11px] font-bold uppercase tracking-wider text-slate-400">{label}</div>
      <div className="mt-1 font-sans font-extrabold text-lg text-slate-900 leading-tight">{value}</div>
    </div>
  );
}

function RelatedCard({ product }: { product: (typeof PRODUCTS)[number] }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  return (
    <div className="group overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm transition-all hover:shadow-md">
      <Link to="/shop/$productId" params={{ productId: product.id }} className="block overflow-hidden bg-slate-100">
        <img
          src={product.img}
          alt={product.name}
          loading="lazy"
          className="aspect-[5/4] w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>
      <div className="flex flex-col gap-2 p-6">
        <div className="font-sans text-[11px] font-bold uppercase tracking-wider text-[rgb(43_90_143)]">{product.category}</div>
        <Link
          to="/shop/$productId"
          params={{ productId: product.id }}
          className="font-sans font-extrabold text-2xl text-slate-900 hover:text-[rgb(43_90_143)] transition-colors"
        >
          {product.name}
        </Link>
        <p className="line-clamp-2 font-sans text-xs text-slate-500 leading-relaxed">{product.summary}</p>
        <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-4">
          <span className="font-sans font-extrabold text-2xl text-slate-900">${product.price}</span>
          <button
            onClick={() => {
              add(product.id);
              setAdded(true);
              setTimeout(() => setAdded(false), 1400);
            }}
            className={`rounded-full px-4 py-2 font-sans text-xs font-bold uppercase tracking-wider text-white transition-all shadow-sm ${
              added ? "bg-[rgb(93_138_111)]" : "bg-[rgb(43_90_143)] hover:bg-[rgb(35_74_119)] active:scale-95"
            }`}
          >
            {added ? "Added" : "Add to cart"}
          </button>
        </div>
      </div>
    </div>
  );
}