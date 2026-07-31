import { useRef, type ReactNode, type MouseEvent } from "react";
import { Link } from "@tanstack/react-router";

type Variant = "blue" | "green" | "ghost";

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
};

type ButtonProps = CommonProps & {
  onClick?: () => void;
  to?: undefined;
  href?: undefined;
  type?: "button" | "submit";
};

type LinkProps = CommonProps & {
  to: string;
  onClick?: () => void;
};

type AnchorProps = CommonProps & {
  href: string;
  onClick?: () => void;
};

const palettes: Record<Variant, string> = {
  blue: "border-transparent bg-[rgb(43_90_143)] text-white hover:bg-[rgb(35_74_119)] hover:shadow-[0_14px_28px_-14px_rgb(43_90_143/0.7)]",
  green:
    "border-[rgb(43_90_143)]/25 bg-card text-[rgb(43_90_143)] hover:bg-[rgb(43_90_143)]/8 hover:shadow-[0_14px_28px_-16px_rgb(28_32_36/0.35)]",
  ghost: "border-border bg-card text-foreground hover:bg-muted",
};

const baseCls =
  "group relative inline-flex items-center justify-center overflow-hidden rounded-full border px-8 py-4 font-mono text-xs uppercase tracking-wide transition-[transform,box-shadow,background-color] duration-300 ease-out will-change-transform";

export function MagneticButton(props: ButtonProps | LinkProps | AnchorProps) {
  const ref = useRef<HTMLElement>(null);
  const { children, variant = "blue", className = "", onClick } = props;

  const onMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    (el as HTMLElement).style.transform = `translate(${x * 0.25}px, ${y * 0.35}px) scale(1.05)`;
  };
  const onLeave = () => {
    const el = ref.current;
    if (el) (el as HTMLElement).style.transform = "translate(0,0) scale(1)";
  };

  const cls = `${baseCls} ${palettes[variant]} ${className}`;
  const inner = (
    <>
      <span className="relative">{children}</span>
    </>
  );

  if ("to" in props && props.to) {
    return (
      <Link
        ref={ref as any}
        to={props.to}
        data-magnetic
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        onClick={onClick}
        className={cls}
      >
        {inner}
      </Link>
    );
  }

  if ("href" in props && props.href) {
    return (
      <a
        ref={ref as any}
        href={props.href}
        data-magnetic
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        onClick={onClick}
        className={cls}
      >
        {inner}
      </a>
    );
  }

  return (
    <button
      ref={ref as any}
      type={(props as ButtonProps).type || "button"}
      data-magnetic
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onClick}
      className={cls}
    >
      {inner}
    </button>
  );
}
