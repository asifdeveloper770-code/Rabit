import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ShoppingBag, Menu, X } from "lucide-react";
import mark from "@/assets/jacked-rabbits-mark.png";
import { useCart } from "@/lib/cart";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/results", label: "Results" },
  { to: "/science", label: "Science" },
  { to: "/contact", label: "Contact" },
] as const;

export function NavBar({ transparent = false }: { transparent?: boolean }) {
  const { count } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const solid = !transparent || scrolled;

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        solid
          ? "border-b border-border bg-[oklch(0.12_0.005_240/0.75)] backdrop-blur-xl"
          : "bg-transparent"
      }`}
      style={{
        paddingLeft: "max(env(safe-area-inset-left), 0px)",
        paddingRight: "max(env(safe-area-inset-right), 0px)",
      }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8 md:px-12">
        <Link to="/" className="flex min-w-0 items-center gap-3">
          <img src={mark} alt="" width={44} height={44} className="h-9 w-9 shrink-0 object-contain" />
          <span className="truncate font-display text-base tracking-wide sm:text-lg sm:tracking-wide">
            <span className="text-foreground">JACKED</span>
            <span className="mx-2 text-[rgb(43_90_143)]">/</span>
            <span className="text-[rgb(93_138_111)]">RABBITS</span>
          </span>
        </Link>

        <div className="hidden gap-8 font-mono text-[10px] uppercase tracking-wide md:flex">
          {LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              className="text-foreground/60 transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/checkout"
            data-magnetic
            className="relative inline-flex h-10 items-center gap-2 rounded-full border border-border bg-muted px-4 font-mono text-[10px] uppercase tracking-wide text-foreground transition-colors hover:border-[rgb(43_90_143)] hover:bg-[rgb(43_90_143)]/10"
          >
            <ShoppingBag className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Cart</span>
            {count > 0 && (
              <span
                className="ml-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[rgb(93_138_111)] px-1 text-[10px] font-bold text-white"
                style={{ boxShadow: "0 0 12px rgb(93 138 111 / 0.6)" }}
              >
                {count}
              </span>
            )}
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-muted text-foreground md:hidden"
            aria-label="Menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-[oklch(0.1_0.005_240/0.98)] backdrop-blur-xl md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-4">
            {LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                activeOptions={{ exact: l.to === "/" }}
                className="rounded-lg px-4 py-3 font-mono text-xs uppercase tracking-wide text-foreground/70 hover:bg-muted hover:text-foreground"
                activeProps={{ className: "text-foreground bg-muted" }}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
