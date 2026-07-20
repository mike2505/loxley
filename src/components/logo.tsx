import { cn } from "@/lib/utils";

/* Arrowhead "L" mark — a drawn bow / arrow tip */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      className={cn("h-7 w-7", className)}
      aria-hidden
    >
      <path
        d="M4 4L20.5 11.5L13.5 13.5L11.5 20.5L4 4Z"
        fill="currentColor"
        className="text-lox"
      />
      <path
        d="M14.5 17.5L28 28M28 28V19.5M28 28H19.5"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-snow"
      />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <LogoMark />
      <span className="font-display text-lg font-semibold tracking-tight text-snow">
        LOXLEY
      </span>
    </span>
  );
}
