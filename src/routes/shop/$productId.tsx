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
    <main className="relative min-h-screen pt-28">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <nav className="mb-8 flex items-center gap-2 font-mono text-[11px] text-foreground/40">
          <Link to="/shop" className="hover:text-foreground">
            Shop
          </Link>
          <span>/</span>
          <span className="text-foreground/70">{product.name}</span>
        </nav>

        <div className="grid gap-14 lg:grid-cols-[1.05fr_1fr]">
          {/* Gallery */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="overflow-hidden rounded-3xl border border-border bg-card">
              <img
                src={product.img}
                alt={`${product.name} research peptide vial`}
                className="aspect-[4/5] w-full object-cover transition-all duration-500"
                style={{ objectPosition: VIEWS[view].pos }}
              />
            </div>
            <div className="mt-4 flex gap-3">
              {VIEWS.map((v, i) => (
                <button
                  key={v.label}
                  onClick={() => setView(i)}
                  className={`overflow-hidden rounded-xl border transition-all ${
                    view === i ? "opacity-100" : "opacity-55 hover:opacity-85"
                  }`}
                  style={{ borderColor: view === i ? accent : undefined }}
                  aria-label={`View ${v.label}`}
                >
                  <img
                    src={product.img}
                    alt={`${product.name} ${v.label} view`}
                    className="h-20 w-20 object-cover"
                    style={{ objectPosition: v.pos }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col gap-7">
            <div>
              <span className="font-mono text-[11px] tracking-wide" style={{ color: accent }}>
                {product.tag === product.category ? product.category : `${product.category} · ${product.tag}`}
              </span>
              <h1 className="mt-2 font-display text-5xl leading-tight md:text-6xl">
                {product.name}
              </h1>
              <p className="mt-4 max-w-lg text-base leading-relaxed text-foreground/65">
                {product.summary}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-6 border-y border-border py-6">
              <div className="font-display text-4xl">${product.price}</div>
              <div className="font-mono text-[11px] text-[rgb(93_138_111)]">
                ● In stock · ships in 24h
              </div>
            </div>

            {/* Purity meter */}
            <div className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-[11px] text-foreground/50">HPLC purity</span>
                <span className="font-display text-2xl">{purity}%</span>
              </div>
              <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${Math.min(100, purity)}%`, background: accent }}
                />
              </div>
              <p className="mt-3 text-xs text-foreground/45">
                Verified by an independent US lab. Lot-specific COA ships with every vial.
              </p>
            </div>

            {/* Dosage & handling */}
            <div className="grid gap-3 sm:grid-cols-3">
              <SpecTile icon={Syringe} label="Presentation" value={spec("Weight")} />
              <SpecTile icon={Clock} label="Half-life" value={spec("Half-life")} />
              <SpecTile icon={Snowflake} label="Storage" value={spec("Storage")} />
            </div>

            <p className="text-sm leading-relaxed text-foreground/60">{product.description}</p>

            {/* Qty + add */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="inline-flex items-center gap-1 rounded-full border border-border bg-card p-1">
                <button
                  onClick={() => setQty((v) => Math.max(1, v - 1))}
                  className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-muted"
                  aria-label="Decrease"
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <div className="w-10 text-center font-display text-xl">{qty}</div>
                <button
                  onClick={() => setQty((v) => v + 1)}
                  className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-muted"
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
                className="font-mono text-[11px] text-foreground/50 hover:text-foreground"
              >
                Go to checkout →
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { i: ShieldCheck, l: "HPLC verified" },
                { i: Thermometer, l: "Cold-chain" },
                { i: Beaker, l: "USA lab" },
              ].map((t) => (
                <div
                  key={t.l}
                  className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-4 text-center"
                >
                  <t.i className="h-4 w-4 text-foreground/70" />
                  <div className="font-mono text-[10px] text-foreground/50">{t.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-28 border-t border-border pt-14">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <div>
                <span className="font-mono text-[11px] text-[rgb(93_138_111)]">Stack with</span>
                <h2 className="mt-2 font-display text-4xl">Complete the protocol</h2>
              </div>
              <Link
                to="/shop"
                className="font-mono text-[11px] text-foreground/50 hover:text-foreground"
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
    <div className="rounded-2xl border border-border bg-card p-4">
      <Icon className="h-4 w-4 text-foreground/45" />
      <div className="mt-3 font-mono text-[10px] text-foreground/45">{label}</div>
      <div className="mt-1 font-display text-lg leading-tight">{value}</div>
    </div>
  );
}

function RelatedCard({ product }: { product: (typeof PRODUCTS)[number] }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  return (
    <div className="group overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-lg">
      <Link to="/shop/$productId" params={{ productId: product.id }} className="block overflow-hidden">
        <img
          src={product.img}
          alt={product.name}
          loading="lazy"
          className="aspect-[5/4] w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>
      <div className="flex flex-col gap-2 p-5">
        <div className="font-mono text-[10px] text-foreground/40">{product.category}</div>
        <Link
          to="/shop/$productId"
          params={{ productId: product.id }}
          className="font-display text-2xl leading-none"
        >
          {product.name}
        </Link>
        <p className="line-clamp-2 text-xs leading-relaxed text-foreground/55">{product.summary}</p>
        <div className="mt-2 flex items-center justify-between">
          <span className="font-display text-xl">${product.price}</span>
          <button
            onClick={() => {
              add(product.id);
              setAdded(true);
              setTimeout(() => setAdded(false), 1400);
            }}
            className={`rounded-full px-4 py-2 font-mono text-[10px] text-white transition-colors ${
              added ? "bg-[rgb(93_138_111)]" : "bg-[rgb(43_90_143)] hover:bg-[rgb(35_74_119)]"
            }`}
          >
            {added ? "Added" : "Add to cart"}
          </button>
        </div>
      </div>
    </div>
  );
}
