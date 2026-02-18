"use client";

import { useMemo } from "react";

import type { HeatCell, HeatWeek } from "../lib/heatmap";

type RGB = { r: number; g: number; b: number };

const baseHeatmapColor = "#161b22";

const levelBlendRatio: Record<HeatCell["level"], number> = {
  0: 0,
  1: 0.24,
  2: 0.42,
  3: 0.6,
  4: 0.78,
};

function hexToRgb(hex: string): RGB | null {
  const normalized = hex.trim().replace("#", "");
  const fullHex =
    normalized.length === 3
      ? normalized
          .split("")
          .map((ch) => ch + ch)
          .join("")
      : normalized;

  if (!/^[\da-fA-F]{6}$/.test(fullHex)) return null;

  return {
    r: Number.parseInt(fullHex.slice(0, 2), 16),
    g: Number.parseInt(fullHex.slice(2, 4), 16),
    b: Number.parseInt(fullHex.slice(4, 6), 16),
  };
}

function mix(base: RGB, top: RGB, ratio: number): RGB {
  const clamped = Math.max(0, Math.min(1, ratio));
  return {
    r: Math.round(base.r + (top.r - base.r) * clamped),
    g: Math.round(base.g + (top.g - base.g) * clamped),
    b: Math.round(base.b + (top.b - base.b) * clamped),
  };
}

function rgbToCss(rgb: RGB): string {
  return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
}

export function Heatmap({ weeks, primaryColor }: { weeks: HeatWeek[]; primaryColor: string }) {
  const palette = useMemo(() => {
    const base = hexToRgb(baseHeatmapColor);
    const primary = hexToRgb(primaryColor);
    if (!base || !primary) {
      return {
        0: baseHeatmapColor,
        1: "#0e4429",
        2: "#006d32",
        3: "#26a641",
        4: "#39d353",
      } satisfies Record<HeatCell["level"], string>;
    }

    return {
      0: baseHeatmapColor,
      1: rgbToCss(mix(base, primary, levelBlendRatio[1])),
      2: rgbToCss(mix(base, primary, levelBlendRatio[2])),
      3: rgbToCss(mix(base, primary, levelBlendRatio[3])),
      4: rgbToCss(mix(base, primary, levelBlendRatio[4])),
    } satisfies Record<HeatCell["level"], string>;
  }, [primaryColor]);

  return (
    <div className="flex gap-0.75">
      {weeks.map((week, wIdx) => (
        <div key={wIdx} className="flex flex-col gap-0.75">
          {week.map((cell) => (
            <div
              key={cell.date}
              title={`${cell.date} - ${cell.count}`}
              className="h-5 w-5 rounded-[3px]"
              style={{ backgroundColor: palette[cell.level] }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
