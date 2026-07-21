import Image from "next/image";
import { cn } from "@/lib/utils";

/* Glassy "L" mark cropped from public/logo.png (see public/logo-mark.png) */
export function LogoMark({ className }: { className?: string }) {
  return (
    <Image
      src="/logo-mark.png"
      alt=""
      width={28}
      height={28}
      className={cn("h-7 w-7 rounded-lg", className)}
      aria-hidden
    />
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
