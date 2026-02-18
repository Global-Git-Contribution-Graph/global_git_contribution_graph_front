"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { useQuery } from "urql";
import GlassSurface from "../../components/GlassSurface";

import { useGGCGStore } from "../store/useGGCGStore";
import { STATS_QUERY } from "../graphql/queries";
import { buildHeatmapWeeks, type HistoryPoint } from "../lib/heatmap";
import { Heatmap } from "./Heatmap";

type StatsData = {
  stats: {
    history: HistoryPoint[];
  };
};

export function StatsPanel() {
  const forges = useGGCGStore((s) => s.forges);
  const heatmapPrimaryColor = useGGCGStore((s) => s.heatmapPrimaryColor);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [surfaceSize, setSurfaceSize] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });
  const gqlForges = forges.map((forge) => {
    const { id, ...gql } = forge;
    void id;
    return gql;
  });

  const [{ data, fetching, error }] = useQuery<StatsData>({
    query: STATS_QUERY,
    variables: { forges: gqlForges },
  });

  const weeks = data ? buildHeatmapWeeks(data.stats.history, 52) : [];

  useLayoutEffect(() => {
    if (!data) return;

    const content = contentRef.current;
    if (!content) return;

    const updateSize = () => {
      const nextWidth = Math.ceil(content.scrollWidth);
      const nextHeight = Math.ceil(content.scrollHeight);

      setSurfaceSize((prev) =>
        prev.width === nextWidth && prev.height === nextHeight
          ? prev
          : { width: nextWidth, height: nextHeight }
      );
    };

    updateSize();
    const observer = new ResizeObserver(updateSize);
    observer.observe(content);

    return () => observer.disconnect();
  }, [data, weeks.length]);

  if (fetching) return <div>Loading...</div>;
  if (error) return <pre>{error.message}</pre>;
  if (!data) return <div>No data</div>;

  return (
    <div className="flex h-full w-full items-center justify-center">
      <GlassSurface
        className="inline-flex shadow-[0_12px_40px_rgba(0,0,0,0.45)]"
        width={surfaceSize.width > 0 ? surfaceSize.width : "fit-content"}
        height={surfaceSize.height > 0 ? surfaceSize.height : "fit-content"}
        borderRadius={18}
        borderWidth={0.12}
        brightness={34}
        opacity={0.82}
        blur={8}
        displace={8}
        backgroundOpacity={0.16}
        saturation={1.2}
        distortionScale={-90}
        greenOffset={8}
        blueOffset={12}
      >
        <div ref={contentRef} className="inline-flex flex-col">
          <div className="w-fit rounded-md border border-white/10 bg-black/15 p-3">
            <Heatmap weeks={weeks} primaryColor={heatmapPrimaryColor} />
          </div>
        </div>
      </GlassSurface>
    </div>
  );
}
