import { Link as RouterLink } from "@tanstack/react-router";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type LinkProps = Omit<ComponentProps<"a">, "href"> & { to: string };

/** Router link that accepts plain paths, including /a/<slug> placeholders. */
export function Link({ to, ...props }: LinkProps) {
  const target = to.startsWith("/a/")
    ? { to: "/a/$slug", params: { slug: to.slice(3) } }
    : { to };
  return <RouterLink {...(target as never)} {...props} />;
}

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all active:scale-[0.97] disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground shadow-[0_8px_20px_-12px_var(--primary)]",
        secondary: "bg-secondary text-secondary-foreground",
        soft: "bg-primary-soft text-primary",
        neutral: "bg-surface text-foreground",
        outline: "border border-border bg-background text-foreground",
        destructive: "bg-destructive text-destructive-foreground",
        ghost: "text-muted-foreground",
      },
      size: {
        sm: "h-9 px-4 text-[0.8125rem]",
        md: "h-11 px-5 text-sm",
        lg: "h-14 px-6 text-[0.9375rem]",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export function AButton({
  className,
  variant,
  size,
  ...props
}: ComponentProps<"button"> & VariantProps<typeof buttonVariants>) {
  return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

/** Primary action roughly twice the width of the secondary. */
export function ActionPair({
  primary,
  secondary,
  className,
}: {
  primary: ReactNode;
  secondary: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("grid grid-cols-3 gap-3", className)}>
      <div className="col-span-1 [&>button]:w-full">{secondary}</div>
      <div className="col-span-2 [&>button]:w-full">{primary}</div>
    </div>
  );
}

export function Card({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-border/70 bg-card p-5 shadow-card",
        className,
      )}
      {...props}
    />
  );
}

const iconTint = cva("grid place-items-center shrink-0", {
  variants: {
    tone: {
      orange: "bg-tint-orange text-primary",
      blue: "bg-tint-blue text-tint-blue-foreground",
      green: "bg-tint-green text-tint-green-foreground",
      amber: "bg-tint-amber text-tint-amber-foreground",
      violet: "bg-tint-violet text-tint-violet-foreground",
      neutral: "bg-surface text-foreground",
      dark: "bg-foreground text-background",
    },
    shape: { round: "rounded-full", squircle: "rounded-2xl" },
    size: { sm: "h-9 w-9", md: "h-11 w-11", lg: "h-14 w-14" },
  },
  defaultVariants: { tone: "neutral", shape: "squircle", size: "md" },
});

export function IconBadge({
  className,
  tone,
  shape,
  size,
  children,
}: VariantProps<typeof iconTint> & { className?: string; children: ReactNode }) {
  return <div className={cn(iconTint({ tone, shape, size }), className)}>{children}</div>;
}

export function SectionHeader({
  title,
  action,
  className,
}: {
  title: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center justify-between gap-3 px-1", className)}>
      <h2 className="eyebrow text-muted-foreground">{title}</h2>
      {action}
    </div>
  );
}

export function Pill({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  tone?: "neutral" | "blue" | "orange" | "green" | "red" | "amber" | "violet";
  className?: string;
}) {
  const tones: Record<string, string> = {
    neutral: "bg-surface text-muted-foreground",
    blue: "bg-tint-blue text-tint-blue-foreground",
    orange: "bg-tint-orange text-primary",
    green: "bg-tint-green text-tint-green-foreground",
    amber: "bg-tint-amber text-tint-amber-foreground",
    red: "bg-destructive-soft text-destructive",
    violet: "bg-tint-violet text-tint-violet-foreground",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-[0.6875rem] font-bold",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
