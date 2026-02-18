"use client";

import type { HeatCell, HeatWeek } from "../lib/heatmap";

const levelColorClass: Record<HeatCell["level"], string> = {
  0: "bg-[#161b22]",
  1: "bg-[#0e4429]",
  2: "bg-[#006d32]",
  3: "bg-[#26a641]",
  4: "bg-[#39d353]",
};

export function Heatmap({ weeks }: { weeks: HeatWeek[] }) {
  return (
    <div className="flex gap-0.75">
      {weeks.map((week, wIdx) => (
        <div key={wIdx} className="flex flex-col gap-0.75">
          {week.map((cell) => (
            <div
              key={cell.date}
              title={`${cell.date} - ${cell.count}`}
              className={`h-5 w-5 rounded-[3px] ${levelColorClass[cell.level]}`}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
