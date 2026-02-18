"use client";

import { DotPattern } from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";

export function BackgroundDots({ children }: { children: React.ReactNode }) {
	return (
		<div className="relative h-full w-full overflow-hidden bg-[#0d1117] text-[#c9d1d9]">
			<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_15%,rgba(47,129,247,0.14),transparent_35%),radial-gradient(circle_at_82%_78%,rgba(57,211,83,0.08),transparent_40%)]" />
			<DotPattern
				width={22}
				height={22}
				cx={1.4}
				cy={1.4}
				cr={1.25}
				className={cn(
					"text-[#6e7681]/45 [mask-image:radial-gradient(900px_circle_at_center,white,transparent)]"
				)}
			/>
			<div className="relative z-10 h-full w-full">{children}</div>
		</div>
	);
}
