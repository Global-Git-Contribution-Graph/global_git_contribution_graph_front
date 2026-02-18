"use client";

import type { HeatCell, HeatWeek } from "../lib/heatmap";

const levelOpacityClass: Record<HeatCell["level"], string> = {
	0: "opacity-[0.25]",
	1: "opacity-[0.4]",
	2: "opacity-[0.55]",
	3: "opacity-[0.7]",
	4: "opacity-[0.85]",
};

export function Heatmap({ weeks }: { weeks: HeatWeek[] }) {
  return (
		<div className="flex gap-0.5">
			{weeks.map((week, wIdx) => (
				<div key={wIdx} className="flex flex-col gap-0.5">
					{week.map((cell) => (
						<div
							key={cell.date}
							title={`${cell.date} - ${cell.count}`}
							className={`h-3 w-3 rounded-[3px] bg-current ${levelOpacityClass[cell.level]}`}
						/>
					))}
				</div>
			))}
		</div>
  );
}
