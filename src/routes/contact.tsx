import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MagneticButton } from "@/components/jr/MagneticButton";
import { useReveal } from "@/lib/useReveal";
import { Mail, MapPin, Phone, Clock, Check, MessageSquare, Beaker, HelpCircle } from "lucide-react";
import vial from "@/assets/vial.jpg";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Talk to a Jacked Rabbits Specialist" },
      { name: "description", content: "Reach the Jacked Rabbits lab and support team. Protocol questions, batch verification, wholesale inquiries." },
      { property: "og:title", content: "Contact — Jacked Rabbits" },
      { property: "og:description", content: "Talk to a real human. Real fast. Real answers." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  useReveal();
  const [sent, setSent] = useState(false);
  const [topic, setTopic] = useState("Protocol help");

  return (
    <main className="relative min-h-screen pt-32">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border py-16 md:py-24">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-30"
          style={{
            backgroundImage: `url(${vial})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "grayscale(1) contrast(1.05)",
          }}
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/60 via-background/85 to-background" />
        <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-2 md:items-end md:px-12">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-wide text-[rgb(43_90_143)]">
              / Talk to us
            </span>
            <h1 className="mt-4 font-display text-6xl leading-[0.9] md:text-8xl">
              Real humans.<br />
              <span className="text-shimmer">Real answers.</span>
            </h1>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-foreground/60 md:text-base">
            Whether you need protocol advice, a batch verification, or you're a
            gym owner asking about wholesale — a specialist will respond within
            one business hour, seven days a week.
          </p>
        </div>
      </section>

      {/* Contact grid */}
      <section className="py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 md:grid-cols-3 md:px-12">
          {[
            { i: Mail, t: "Email", v: "lab@jackedrabbits.com", s: "Response within 1 hr", c: "blue" },
            { i: Phone, t: "Phone", v: "+1 (833) JR-STACK", s: "Mon–Sun · 6a–10p PT", c: "green" },
            { i: MapPin, t: "Lab HQ", v: "Reno, Nevada · USA", s: "By appointment only", c: "blue" },
          ].map((c) => (
            <div
              key={c.t}
              data-magnetic
              className="reveal glass gradient-border group relative rounded-2xl p-8 transition-transform duration-500 hover:-translate-y-2"
            >
              <div
                className="flex h-12 w-12 items-center justify-center rounded-xl border"
                style={{
                  borderColor: c.c === "blue" ? "rgb(43 90 143 / 0.4)" : "rgb(93 138 111 / 0.4)",
                  background: c.c === "blue" ? "rgb(43 90 143 / 0.08)" : "rgb(93 138 111 / 0.08)",
                }}
              >
                <c.i
                  className="h-5 w-5"
                  style={{ color: c.c === "blue" ? "rgb(43 90 143)" : "rgb(93 138 111)" }}
                />
              </div>
              <div className="mt-6 font-mono text-[10px] uppercase tracking-wide text-foreground/50">
                {c.t}
              </div>
              <div className="mt-2 font-display text-2xl">{c.v}</div>
              <div className="mt-2 flex items-center gap-2 text-xs text-foreground/50">
                <Clock className="h-3 w-3" /> {c.s}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Form + sidebar */}
      <section className="py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 md:px-12 lg:grid-cols-[1.4fr_1fr]">
          <div className="rounded-3xl border border-border bg-card p-8 md:p-12">
            {sent ? (
              <div className="flex flex-col items-center py-12 text-center">
                <div
                  className="flex h-20 w-20 items-center justify-center rounded-full border border-[rgb(93_138_111)]/40 bg-[rgb(93_138_111)]/10"
                  style={{ boxShadow: "0 0 40px rgb(93 138 111 / 0.4)" }}
                >
                  <Check className="h-8 w-8 text-[rgb(93_138_111)]" />
                </div>
                <h2 className="mt-8 font-display text-5xl">
                  Message <span className="text-shimmer">received.</span>
                </h2>
                <p className="mt-4 max-w-md text-sm text-foreground/60">
                  A specialist will reach you at the email you provided within
                  one business hour.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-8 font-mono text-[10px] uppercase tracking-wide text-foreground/60 hover:text-foreground"
                >
                  ← Send another
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
                className="flex flex-col gap-6"
              >
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-wide text-[rgb(93_138_111)]">
                    / Send a message
                  </span>
                  <h2 className="mt-3 font-display text-4xl md:text-5xl">
                    Tell us what you need.
                  </h2>
                </div>

                <div>
                  <div className="mb-3 font-mono text-[10px] uppercase tracking-wide text-foreground/50">
                    What's this about?
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {["Protocol help", "Batch verification", "Wholesale", "Press", "Other"].map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setTopic(t)}
                        className={`rounded-full border px-4 py-2 font-mono text-[10px] uppercase tracking-wide transition-colors ${
                          topic === t
                            ? "border-[rgb(43_90_143)] bg-[rgb(43_90_143)]/15 text-foreground"
                            : "border-border bg-card text-foreground/60 hover:border-foreground/20 hover:text-foreground"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Name" name="name" required />
                  <Field label="Email" name="email" type="email" required />
                </div>
                <Field label="Subject" name="subject" required />
                <label className="flex flex-col gap-1.5">
                  <span className="font-mono text-[9px] uppercase tracking-wide text-foreground/50">
                    Message
                  </span>
                  <textarea
                    required
                    rows={6}
                    className="rounded-lg border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-foreground/25 focus:border-[rgb(43_90_143)] focus:outline-none"
                    placeholder="Tell us your goals, current protocol, and where you're stuck…"
                  />
                </label>
                <label className="flex items-center gap-3 text-xs text-foreground/60">
                  <input type="checkbox" className="h-4 w-4 accent-[rgb(93_138_111)]" />
                  Subscribe to the Jacked Rabbits Journal — protocols, lab data, athlete features.
                </label>
                <div>
                  <MagneticButton variant="green" type="submit">
                    Send message
                  </MagneticButton>
                </div>
              </form>
            )}
          </div>

          <aside className="flex flex-col gap-6">
            <div className="rounded-3xl border border-border bg-card p-8">
              <div className="font-mono text-[10px] uppercase tracking-wide text-foreground/50">
                / Fastest path
              </div>
              <ul className="mt-6 space-y-5 text-sm">
                {[
                  { i: MessageSquare, t: "Protocol help", s: "Chat with a certified prep coach." },
                  { i: Beaker, t: "Batch COAs", s: "Reply with your order # for the lot report." },
                  { i: HelpCircle, t: "General FAQ", s: "Shipping, storage, reconstitution guides." },
                ].map((r) => (
                  <li key={r.t} className="flex items-start gap-3">
                    <r.i className="mt-0.5 h-4 w-4 text-[rgb(93_138_111)]" />
                    <div>
                      <div className="font-display text-lg text-foreground">{r.t}</div>
                      <div className="text-foreground/50">{r.s}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-border bg-gradient-to-br from-[rgb(43_90_143)]/10 to-[rgb(93_138_111)]/10 p-8">
              <div className="font-mono text-[10px] uppercase tracking-wide text-foreground/60">
                / Emergency
              </div>
              <p className="mt-4 text-sm text-foreground/70">
                Peptides are for research use only. If you're experiencing an
                adverse reaction, contact your physician or Poison Control at
                <span className="font-mono text-foreground"> 1-800-222-1222</span>.
              </p>
            </div>
          </aside>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-border py-24">
        <div className="mx-auto max-w-4xl px-6 md:px-12">
          <span className="font-mono text-[10px] uppercase tracking-wide text-[rgb(43_90_143)]">
            / FAQ
          </span>
          <h2 className="mt-3 font-display text-5xl leading-[0.9] md:text-6xl">
            The <span className="text-shimmer">quick hits.</span>
          </h2>
          <div className="mt-10 divide-y divide-border border-y border-border">
            {[
              { q: "How fast do you ship?", a: "24-hour dispatch on every order, Monday through Saturday. Cold-chain express arrives in 2–3 business days anywhere in the continental US." },
              { q: "How are peptides shipped cold?", a: "Every order goes out in an insulated pouch with reusable gel packs, temperature-logged for the full transit window." },
              { q: "Can I get the lab report for my batch?", a: "Yes. Every product page links to the batch COA, and we'll happily email a signed copy referencing your order number." },
              { q: "Do you offer wholesale?", a: "Yes — for licensed research organizations, clinics, and vetted supplement retailers. Reach out through the form above with 'Wholesale' selected." },
              { q: "Is this legal?", a: "All products are sold strictly for research purposes and are not for human consumption. You must be 21+ to purchase." },
            ].map((f) => (
              <details key={f.q} className="group py-6">
                <summary className="flex cursor-pointer items-center justify-between font-display text-2xl text-foreground/90 hover:text-foreground">
                  {f.q}
                  <span className="ml-4 font-mono text-2xl text-foreground/40 transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-foreground/60">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function Field({
  label,
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-mono text-[9px] uppercase tracking-wide text-foreground/50">{label}</span>
      <input
        {...rest}
        className="rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-foreground/25 focus:border-[rgb(43_90_143)] focus:outline-none"
      />
    </label>
  );
}
