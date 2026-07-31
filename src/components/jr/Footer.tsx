import { Link } from "@tanstack/react-router";
import mark from "@/assets/jacked-rabbits-mark.png";

export function Footer() {
  return (
    <footer id="contact" className="relative">
      <div className="gradient-line h-px w-full" />
      <div className="mx-auto max-w-7xl px-6 py-20 md:px-12">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-4">
              <img
                src={mark}
                width={80}
                height={80}
                alt="Jacked Rabbits"
                className="h-16 w-16 object-contain"
              />
              <div className="font-display text-2xl tracking-wide">
                JACKED <span className="text-[rgb(43_90_143)]">/</span>{" "}
                <span className="text-[rgb(93_138_111)]">RABBITS</span>
              </div>
            </Link>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-foreground/50">
              Research-grade peptides for the relentless. Formulated in the USA.
              Verified by independent laboratories. Trusted by athletes who
              refuse average.
            </p>
          </div>

          {[
            {
              t: "Shop",
              i: [
                { label: "All Peptides", to: "/shop" },
                { label: "Recovery", to: "/shop?cat=Recovery" },
                { label: "Growth", to: "/shop?cat=Growth" },
                { label: "Metabolic", to: "/shop?cat=Metabolic" },
              ],
            },
            {
              t: "Learn",
              i: [
                { label: "Science", to: "/science" },
                { label: "Results", to: "/results" },
                { label: "Lab Reports", to: "/science" },
              ],
            },
            {
              t: "Company",
              i: [
                { label: "Contact", to: "/contact" },
                { label: "Home", to: "/" },
              ],
            },
          ].map((col) => (
            <div key={col.t}>
              <div className="font-mono text-[10px] uppercase tracking-wide text-foreground/40">
                {col.t}
              </div>
              <ul className="mt-4 space-y-3 text-sm">
                {col.i.map((x) => (
                  <li key={x.label}>
                    <Link to={x.to} className="text-foreground/80 hover:text-foreground">
                      {x.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-xl border border-border bg-card p-6 text-xs leading-relaxed text-foreground/40">
          <span className="font-mono uppercase tracking-wide text-foreground/60">
            Medical Disclaimer —
          </span>{" "}
          Products sold for research purposes only. Not intended for human
          consumption. Not evaluated by the FDA. Not intended to diagnose, treat,
          cure, or prevent any disease. Consult a licensed medical professional
          before use. Must be 21+ to purchase.
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <div className="font-mono text-[10px] uppercase tracking-wide text-foreground/40">
            © {new Date().getFullYear()} Jacked Rabbits Laboratories
          </div>
          <div className="flex gap-6 font-mono text-[10px] uppercase tracking-wide text-foreground/40">
            <Link to="/contact" className="hover:text-foreground">Privacy</Link>
            <Link to="/contact" className="hover:text-foreground">Terms</Link>
            <Link to="/contact" className="hover:text-foreground">Shipping</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
