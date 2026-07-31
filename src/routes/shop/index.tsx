import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PRODUCTS, CATEGORIES, type Category } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { useReveal } from "@/lib/useReveal";
import { Search, Check } from "lucide-react";

export const Route = createFileRoute("/shop/")({
  head: () => ({
    meta: [
      { title: "Shop — Jacked Rabbits Peptide Catalogue" },
      {
        name: "description",
        content:
          "Browse HPLC-verified research peptides for recovery, growth, metabolic adaptation, and longevity.",
      },
      { property: "og:title", content: "Shop the Catalogue — Jacked Rabbits" },
      {
        property: "og:description",
        content:
          "Every compound purity-tested above 98%. Cold-chain shipping. Independent labs.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  validateSearch: (s: Record<string, unknown>) => ({
    cat: (s.cat as string | undefined) ?? undefined,
    q: (s.q as string | undefined) ?? undefined,
    sort: (s.sort as string | undefined) ?? undefined,
  }),
  component: ShopPage,
});

const SORTS = [
  { key: "popularity", label: "Most popular" },
  { key: "price-asc", label: "Price · low to high" },
  { key: "price-desc", label: "Price · high to low" },
  { key: "purity", label: "Highest purity" },
] as const;

type SortKey = (typeof SORTS)[number]["key"];

function purityOf(p: (typeof PRODUCTS)[number]) {
  const spec = p.specs.find((s) => s.label.toLowerCase() === "purity");
  return spec ? parseFloat(spec.value) || 0 : 0;
}

function popularityOf(p: (typeof PRODUCTS)[number]) {
  // Catalogue order reflects demand; earlier entries are the bestsellers.
  return PRODUCTS.length - PRODUCTS.findIndex((x) => x.id === p.id);
}

function ShopPage() {
  useReveal();
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const [q, setQ] = useState(search.q ?? "");
  const cat: Category = (CATEGORIES as readonly string[]).includes(search.cat ?? "")
    ? (search.cat as Category)
    : "All";

  const sort: SortKey = (SORTS.some((s) => s.key === search.sort)
    ? search.sort
    : "popularity") as SortKey;

  const filtered = useMemo(() => {
    const list = PRODUCTS.filter((p) => {
      if (cat !== "All" && p.category !== cat) return false;
      if (q && !`${p.name} ${p.tag} ${p.summary}`.toLowerCase().includes(q.toLowerCase()))
        return false;
      return true;
    });
    const sorted = [...list];
    if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
    if (sort === "purity") sorted.sort((a, b) => purityOf(b) - purityOf(a));
    if (sort === "popularity")
      sorted.sort((a, b) => popularityOf(b) - popularityOf(a));
    return sorted;
  }, [cat, q, sort]);

  return (
    <main className="relative min-h-screen pt-28">
      {/* Compact page header */}
      <section className="border-b border-border">
        <div className="mx-auto flex max-w-6xl flex-wrap items-end justify-between gap-6 px-6 py-12 md:px-12">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-wide text-foreground/40">
              Catalogue
            </span>
            <h1 className="mt-3 font-display text-5xl leading-none md:text-6xl">
              Research peptides
            </h1>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-foreground/55">
            {PRODUCTS.length} compounds, each shipped with a lot-specific
            certificate of analysis.
          </p>
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 md:grid-cols-[200px_1fr] md:px-12">
        {/* Sidebar */}
        <aside className="md:sticky md:top-28 md:self-start">
          <div className="relative mb-8">
            <Search className="pointer-events-none absolute left-0 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-foreground/35" />
            <input
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                navigate({
                  search: (prev: any) => ({ ...prev, q: e.target.value || undefined }),
                });
              }}
              placeholder="Search"
              className="w-full border-b border-border bg-transparent py-2 pl-6 font-mono text-xs text-foreground placeholder:text-foreground/30 focus:border-foreground/40 focus:outline-none"
            />
          </div>

          <div className="font-mono text-[9px] uppercase tracking-wide text-foreground/35">
            Category
          </div>
          <ul className="mt-4 space-y-1">
            {CATEGORIES.map((c) => (
              <li key={c}>
                <button
                  onClick={() =>
                    navigate({
                      search: (prev: any) => ({ ...prev, cat: c === "All" ? undefined : c }),
                    })
                  }
                  className={`w-full border-l-2 py-1.5 pl-3 text-left font-mono text-[11px] uppercase tracking-wide transition-colors ${
                    cat === c
                      ? "border-[rgb(43_90_143)] text-foreground"
                      : "border-transparent text-foreground/45 hover:text-foreground"
                  }`}
                >
                  {c}
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-8 font-mono text-[9px] uppercase tracking-wide text-foreground/35">
            Sort by
          </div>
          <ul className="mt-4 space-y-1">
            {SORTS.map((s) => (
              <li key={s.key}>
                <button
                  onClick={() =>
                    navigate({
                      search: (prev: any) => ({
                        ...prev,
                        sort: s.key === "popularity" ? undefined : s.key,
                      }),
                    })
                  }
                  className={`w-full border-l-2 py-1.5 pl-3 text-left font-mono text-[11px] transition-colors ${
                    sort === s.key
                      ? "border-[rgb(93_138_111)] font-semibold text-foreground"
                      : "border-transparent text-foreground/45 hover:text-foreground"
                  }`}
                >
                  {s.label}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Rows */}
        <section>
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <span className="font-mono text-[11px] text-foreground/45">
              {filtered.length} result{filtered.length === 1 ? "" : "s"}
            </span>
            {cat !== "All" && (
              <Chip
                label={cat}
                onClear={() => navigate({ search: (p: any) => ({ ...p, cat: undefined }) })}
              />
            )}
            {q && (
              <Chip
                label={`“${q}”`}
                onClear={() => {
                  setQ("");
                  navigate({ search: (p: any) => ({ ...p, q: undefined }) });
                }}
              />
            )}
            <Chip
              label={SORTS.find((s) => s.key === sort)!.label}
              tone="green"
              onClear={
                sort === "popularity"
                  ? undefined
                  : () => navigate({ search: (p: any) => ({ ...p, sort: undefined }) })
              }
            />
          </div>

          {filtered.length === 0 ? (
            <div className="border border-border bg-card p-12 text-center">
              <p className="font-display text-3xl text-foreground/60">No matches.</p>
              <p className="mt-2 text-sm text-foreground/40">Try clearing filters.</p>
            </div>
          ) : (
            <ul className="divide-y divide-border border-y border-border">
              {filtered.map((p) => (
                <ProductRow key={p.id} product={p} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}

function ProductRow({ product }: { product: (typeof PRODUCTS)[number] }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  return (
    <li className="reveal group">
      <div className="grid grid-cols-[88px_1fr] items-center gap-5 py-6 sm:grid-cols-[112px_1fr_auto] sm:gap-8">
        <Link
          to="/shop/$productId"
          params={{ productId: product.id }}
          className="block overflow-hidden rounded-lg border border-border bg-card"
        >
          <img
            src={product.img}
            alt={product.name}
            loading="lazy"
            width={224}
            height={224}
            className="h-[88px] w-[88px] object-cover transition-transform duration-500 group-hover:scale-105 sm:h-28 sm:w-28"
          />
        </Link>

        <div className="min-w-0">
          <div className="font-mono text-[9px] uppercase tracking-wide text-foreground/40">
            {product.tag === product.category ? product.category : `${product.category} · ${product.tag}`}
          </div>
          <Link
            to="/shop/$productId"
            params={{ productId: product.id }}
            className="mt-1 block font-display text-2xl leading-none sm:text-3xl"
          >
            {product.name}
          </Link>
          <p className="mt-2 max-w-lg text-sm leading-relaxed text-foreground/55">
            {product.summary}
          </p>
        </div>

        <div className="col-span-2 flex items-center justify-between gap-4 sm:col-span-1 sm:flex-col sm:items-end sm:gap-3">
          <div className="font-display text-2xl">${product.price}</div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                add(product.id);
                setAdded(true);
                setTimeout(() => setAdded(false), 1400);
              }}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-mono text-[10px] uppercase tracking-wide transition-colors ${
                added
                  ? "bg-[rgb(93_138_111)] text-white"
                  : "bg-[rgb(43_90_143)] text-white hover:bg-[rgb(35_74_119)]"
              }`}
            >
              {added ? (
                <>
                  <Check className="h-3.5 w-3.5" /> Added
                </>
              ) : (
                "Add to cart"
              )}
            </button>
            <Link
              to="/shop/$productId"
              params={{ productId: product.id }}
              className="font-mono text-[10px] uppercase tracking-wide text-foreground/50 hover:text-foreground"
            >
              Details
            </Link>
          </div>
        </div>
      </div>
    </li>
  );
}

function Chip({
  label,
  onClear,
  tone = "blue",
}: {
  label: string;
  onClear?: () => void;
  tone?: "blue" | "green";
}) {
  const color = tone === "green" ? "rgb(93 138 111)" : "rgb(43 90 143)";
  return (
    <span
      className="inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[10px]"
      style={{ borderColor: `${color}55`, color, background: `${color}12` }}
    >
      {label}
      {onClear && (
        <button onClick={onClear} aria-label={`Clear ${label}`} className="opacity-60 hover:opacity-100">
          ×
        </button>
      )}
    </span>
  );
}
