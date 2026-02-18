"use client";

import DotGrid from "../../components/DotGrid";

export function BackgroundDots({ children }: { children: React.ReactNode }) {
	return (
		<div className="relative min-h-screen">
			<div className="pointer-events-none absolute inset-0 z-0">
				<DotGrid
					dotSize={5}
					gap={15}
					baseColor="#271E37"
					activeColor="#5227FF"
					proximity={120}
					shockRadius={250}
					shockStrength={5}
					resistance={750}
					returnDuration={1.5}
				/>
			</div>
			<div className="relative z-10">{children}</div>
		</div>
	);
}
