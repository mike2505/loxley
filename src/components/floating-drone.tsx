"use client";

import Image from "next/image";
import { Parallax } from "./primitives";
import { cn } from "@/lib/utils";

/* cut-out drone drifting between sections: scroll parallax + idle hover bob */
export function FloatingDrone({
  className,
  distance = 160,
  flip = false,
  size = 176,
}: {
  className?: string;
  distance?: number;
  flip?: boolean;
  size?: number;
}) {
  return (
    <Parallax
      distance={distance}
      className={cn("pointer-events-none absolute z-20", className)}
    >
      <div className="animate-hover-bob" style={{ width: size, height: size * 0.75 }}>
        <Image
          src="/layers/drone.webp"
          alt=""
          width={600}
          height={448}
          className={cn(
            "h-full w-full object-contain drop-shadow-[0_20px_40px_rgba(9,58,64,0.3)] [filter:drop-shadow(0_0_24px_rgba(10,162,178,0.25))]",
            flip && "-scale-x-100"
          )}
        />
      </div>
    </Parallax>
  );
}
