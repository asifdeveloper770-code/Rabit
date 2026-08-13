import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { PRODUCTS } from "@/lib/products";
import { MagneticButton } from "@/components/jr/MagneticButton";
import {
  Minus,
  Plus,
  Trash2,
  Lock,
  Truck,
  ShieldCheck,
  Check,
  Package,
  Mail,
} from "lucide-react";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Jacked Rabbits" },
      { name: "description", content: "Secure checkout. Cold-chain shipping. HPLC-verified peptides." },
      { property: "og:title", content: "Checkout — Jacked Rabbits" },
      { property: "og:description", content: "Complete your Jacked Rabbits order. Secure, encrypted, fast." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CheckoutPage,
});

const STEPS = ["Cart", "Shipping", "Payment"] as const;

function CheckoutPage() {
  const { items, setQty, remove, clear } = useCart();
  const [step, setStep] = useState(0);
  const [placed, setPlaced] = useState(false);
  const [email, setEmail] = useState("");
  const [orderId] = useState(() => `JR-${Math.random().toString(36).slice(2, 8).toUpperCase()}`);

  const lines = items
    .map((i) => {
      const p = PRODUCTS.find((x) => x.id === i.id);
      return p ? { ...p, qty: i.qty } : null;
    })
    .filter(Boolean) as ((typeof PRODUCTS)[number] & { qty: number })[];

  const subtotal = lines.reduce((s, l) => s + l.price * l.qty, 0);
  const shipping = subtotal > 150 ? 0 : subtotal > 0 ? 12 : 0;
  const tax = Math.round(subtotal * 0.07);
  const total = subtotal + shipping + tax;

  const goto = (n: number) => {
    setStep(n);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (placed) {
    return (
      <main className="relative min-h-screen pt-32 bg-slate-50 font-sans text-slate-800 antialiased selection:bg-[rgb(43_90_143)]/10 selection:text-[rgb(43_90_143)]">
        <div className="mx-auto max-w-2xl px-6 pb-24 text-center md:px-12">
          <div
            className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-[rgb(93_138_111)]/30 bg-[rgb(93_138_111)]/10"
          >
            <Check className="h-8 w-8 text-[rgb(93_138_111)]" />
          </div>
          <h1 className="mt-8 font-sans font-extrabold text-5xl tracking-tight text-slate-900 md:text-6xl leading-tight">
            Order <span className="text-[rgb(93_138_111)]">confirmed.</span>
          </h1>
          <p className="mt-4 font-sans text-sm text-slate-600">
            Thanks! A receipt is on its way{email ? ` to ${email}` : ""}. Cold-chain dispatch within 24 hours.
          </p>

          <div className="mt-10 rounded-3xl border border-slate-200/80 bg-white p-8 text-left shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200/80 pb-6">
              <div>
                <div className="font-sans text-[11px] font-bold uppercase tracking-wider text-slate-400">Order number</div>
                <div className="mt-1 font-sans font-extrabold text-3xl text-slate-900">#{orderId}</div>
              </div>
              <div className="text-right">
                <div className="font-sans text-[11px] font-bold uppercase tracking-wider text-slate-400">Total paid</div>
                <div className="mt-1 font-sans font-extrabold text-3xl text-[rgb(43_90_143)]">${total}</div>
              </div>
            </div>
            <ul className="mt-6 space-y-4">
              {[
                { i: Check, t: "Payment authorised", d: "Just now" },
                { i: Package, t: "Packing in cold-chain box", d: "Within 24 hours" },
                { i: Truck, t: "Tracking link emailed", d: "1–3 business days" },
                { i: Mail, t: "Lot-specific COA sent", d: "With your tracking email" },
              ].map((s, i) => (
                <li key={s.t} className="flex items-start gap-4">
                  <span
                    className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                      i === 0
                        ? "bg-[rgb(93_138_111)] text-white shadow-sm"
                        : "border border-slate-200 bg-slate-50 text-slate-400"
                    }`}
                  >
                    <s.i className="h-3.5 w-3.5" />
                  </span>
                  <div>
                    <div className="font-sans font-bold text-sm text-slate-900">{s.t}</div>
                    <div className="font-sans text-xs text-slate-500 mt-0.5">{s.d}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <MagneticButton to="/shop" variant="blue">
              Keep shopping
            </MagneticButton>
            <MagneticButton to="/" variant="ghost">
              Back home
            </MagneticButton>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen pt-28 bg-slate-50 font-sans text-slate-800 antialiased selection:bg-[rgb(43_90_143)]/10 selection:text-[rgb(43_90_143)]">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <span className="font-sans text-xs font-bold uppercase tracking-widest text-[rgb(43_90_143)]">Checkout</span>
        <h1 className="mt-2 font-sans font-extrabold text-4xl tracking-tight text-slate-900 md:text-6xl leading-tight">
          Complete your protocol
        </h1>

        {/* Stepper */}
        <ol className="mt-8 flex items-center gap-3">
          {STEPS.map((s, i) => (
            <li key={s} className="flex flex-1 items-center gap-3">
              <button
                onClick={() => i < step && goto(i)}
                className="flex items-center gap-2 group"
                aria-current={i === step ? "step" : undefined}
              >
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-full font-sans text-xs font-bold transition-all ${
                    i < step
                      ? "bg-[rgb(93_138_111)] text-white shadow-sm"
                      : i === step
                        ? "bg-[rgb(43_90_143)] text-white shadow-sm"
                        : "border border-slate-200 bg-white text-slate-400"
                  }`}
                >
                  {i < step ? <Check className="h-3.5 w-3.5" /> : i + 1}
                </span>
                <span
                  className={`font-sans text-xs font-bold uppercase tracking-wider ${
                    i === step ? "text-slate-900" : "text-slate-400 group-hover:text-slate-600"
                  }`}
                >
                  {s}
                </span>
              </button>
              {i < STEPS.length - 1 && (
                <span
                  className="h-px flex-1 transition-colors"
                  style={{ background: i < step ? "rgb(93 138 111)" : "rgba(226, 232, 240, 0.8)" }}
                />
              )}
            </li>
          ))}
        </ol>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div className="flex flex-col gap-8">
            {lines.length === 0 ? (
              <div className="rounded-3xl border border-slate-200/80 bg-white p-12 text-center shadow-sm">
                <p className="font-sans font-extrabold text-3xl text-slate-900">Your cart is empty</p>
                <p className="mt-2 font-sans text-sm text-slate-500">Head over to the catalogue to build your stack.</p>
                <div className="mt-6 flex justify-center">
                  <MagneticButton to="/shop" variant="blue">
                    Browse peptides
                  </MagneticButton>
                </div>
              </div>
            ) : step === 0 ? (
              <>
                <section className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm md:p-8">
                  <div className="mb-6 flex items-center justify-between border-b border-slate-100 pb-4">
                    <div className="font-sans text-xs font-bold uppercase tracking-wider text-slate-400">
                      Cart · {lines.length} item{lines.length > 1 ? "s" : ""}
                    </div>
                    <button
                      onClick={clear}
                      className="font-sans text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-slate-900 transition-colors"
                    >
                      Clear all
                    </button>
                  </div>
                  <ul className="divide-y divide-slate-200/80">
                    {lines.map((l) => (
                      <li key={l.id} className="flex flex-wrap items-center gap-4 py-4">
                        <img src={l.img} alt={l.name} className="h-20 w-20 rounded-2xl border border-slate-200 object-cover" />
                        <div className="min-w-0 flex-1">
                          <div className="font-sans text-[11px] font-bold uppercase tracking-wider text-[rgb(43_90_143)]">{l.category}</div>
                          <Link
                            to="/shop/$productId"
                            params={{ productId: l.id }}
                            className="font-sans font-extrabold text-lg text-slate-900 hover:text-[rgb(43_90_143)] transition-colors"
                          >
                            {l.name}
                          </Link>
                          <div className="font-sans text-xs text-slate-500">${l.price} each</div>
                        </div>
                        <div className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 p-1">
                          <button
                            onClick={() => setQty(l.id, l.qty - 1)}
                            className="flex h-7 w-7 items-center justify-center rounded-full text-slate-600 hover:bg-white hover:text-slate-900 shadow-sm transition-all"
                            aria-label={`Decrease ${l.name}`}
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <input
                            value={l.qty}
                            onChange={(e) => {
                              const v = parseInt(e.target.value.replace(/\D/g, ""), 10);
                              setQty(l.id, Number.isNaN(v) ? 0 : v);
                            }}
                            inputMode="numeric"
                            aria-label={`Quantity for ${l.name}`}
                            className="w-9 bg-transparent text-center font-sans font-bold text-sm text-slate-900 focus:outline-none"
                          />
                          <button
                            onClick={() => setQty(l.id, l.qty + 1)}
                            className="flex h-7 w-7 items-center justify-center rounded-full text-slate-600 hover:bg-white hover:text-slate-900 shadow-sm transition-all"
                            aria-label={`Increase ${l.name}`}
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <div className="w-20 text-right font-sans font-extrabold text-lg text-slate-900">
                          ${l.price * l.qty}
                        </div>
                        <button
                          onClick={() => remove(l.id)}
                          className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                          aria-label={`Remove ${l.name}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </section>
                <div className="flex flex-wrap items-center gap-4">
                  <MagneticButton variant="blue" onClick={() => goto(1)}>
                    Continue to shipping
                  </MagneticButton>
                  <Link to="/shop" className="font-sans text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-slate-900 transition-colors">
                    ← Continue shopping
                  </Link>
                </div>
              </>
            ) : step === 1 ? (  
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  goto(2);
                }}
                className="flex flex-col gap-6"
              >
                <FormCard title="Contact">
                  <Field
                    label="Email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Field label="Phone" name="phone" type="tel" />
                </FormCard>
                <FormCard title="Shipping address">
                  <Field label="Full name" name="name" required />
                  <Field label="Address" name="address" required className="sm:col-span-2" />
                  <Field label="City" name="city" required />
                  <Field label="State" name="state" required />
                  <Field label="ZIP" name="zip" required />
                  <Field label="Country" name="country" defaultValue="United States" required />
                </FormCard>
                <div className="flex flex-wrap items-center gap-4">
                  <MagneticButton variant="blue" type="submit">
                    Continue to payment
                  </MagneticButton>
                  <button
                    type="button"
                    onClick={() => goto(0)}
                    className="font-sans text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-slate-900 transition-colors"
                  >
                    ← Back to cart
                  </button>
                </div>
              </form>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setPlaced(true);
                  clear();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="flex flex-col gap-6"
              >
                <FormCard title="Payment">
                  <Field
                    label="Card number"
                    name="card"
                    placeholder="4242 4242 4242 4242"
                    required
                    className="sm:col-span-2"
                  />
                  <Field label="Expiry" name="exp" placeholder="MM/YY" required />
                  <Field label="CVC" name="cvc" placeholder="123" required />
                </FormCard>
                <MagneticButton variant="green" type="submit">
                  <span className="inline-flex items-center gap-2">
                    <Lock className="h-3.5 w-3.5" /> Place secure order · ${total}
                  </span>
                </MagneticButton>
                <button
                  type="button"
                  onClick={() => goto(1)}
                  className="self-start font-sans text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-slate-900 transition-colors"
                >
                  ← Back to shipping
                </button>
              </form>
            )}
          </div>

          {/* Summary */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm md:p-8">
              <div className="font-sans text-xs font-bold uppercase tracking-widest text-slate-400">Order summary</div>
              <ul className="mt-6 space-y-3">
                {lines.map((l) => (
                  <li key={l.id} className="flex justify-between font-sans text-xs font-medium text-slate-600">
                    <span>
                      {l.name} × {l.qty}
                    </span>
                    <span className="font-bold text-slate-900">${l.price * l.qty}</span>
                  </li>
                ))}
              </ul>
              <dl className="mt-6 space-y-3 border-t border-slate-200/80 pt-6 font-sans text-sm">
                <Row label="Subtotal" value={`$${subtotal}`} />
                <Row
                  label="Shipping"
                  value={shipping === 0 && subtotal > 0 ? "Free" : `$${shipping}`}
                />
                <Row label="Tax" value={`$${tax}`} />
              </dl>
              <div className="mt-6 flex items-baseline justify-between border-t border-slate-200/80 pt-6">
                <div className="font-sans text-xs font-bold uppercase tracking-wider text-slate-500">Total</div>
                <div className="font-sans font-extrabold text-4xl text-[rgb(43_90_143)]">
                  ${total}
                </div>
              </div>
              <ul className="mt-8 space-y-3 font-sans text-xs font-medium text-slate-500">
                <li className="flex items-center gap-2.5">
                  <Lock className="h-4 w-4 text-[rgb(43_90_143)] shrink-0" /> Encrypted checkout · 256-bit TLS
                </li>
                <li className="flex items-center gap-2.5">
                  <Truck className="h-4 w-4 text-[rgb(93_138_111)] shrink-0" /> Free cold-chain over $150
                </li>
                <li className="flex items-center gap-2.5">
                  <ShieldCheck className="h-4 w-4 text-slate-700 shrink-0" /> Batch-specific COA included
                </li>
              </ul>
            </div>
          </aside>
        </div>
        <div className="py-16" />
      </div>
    </main>
  );
}

function FormCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm md:p-8">
      <div className="mb-6 font-sans text-xs font-bold uppercase tracking-widest text-[rgb(43_90_143)]">{title}</div>
      <div className="grid gap-4 sm:grid-cols-2">{children}</div>
    </section>
  );
}

function Field({
  label,
  className = "",
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string; className?: string }) {
  return (
    <label className={`flex flex-col gap-1.5 ${className}`}>
      <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-slate-500">{label}</span>
      <input
        {...rest}
        className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 font-sans text-sm text-slate-900 placeholder:text-slate-400 focus:border-[rgb(43_90_143)] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[rgb(43_90_143)] transition-all"
      />
    </label>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-slate-500">{label}</dt>
      <dd className="font-sans font-extrabold text-base text-slate-900">{value}</dd>
    </div>
  );
}