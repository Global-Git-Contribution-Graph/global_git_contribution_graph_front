"use client";

import { useQuery } from "urql";

import { useGGCGStore } from "../store/useGGCGStore";
import { STATS_QUERY } from "../graphql/queries";
import { buildHeatmapWeeks } from "../lib/heatmap";


type HistoryPoint = {
  date: string;
  contributionCount: number;
};

type StatsData = {
  stats: {
    history: HistoryPoint[];
  };
};

export default function DashboardPage() {
    const forges = useGGCGStore((s) => s.forges);

    const [{ data, fetching, error }] = useQuery<StatsData>({
        query: STATS_QUERY,
        variables: { forges: forges.map(({ id, ...gql }) => gql) },
    });

    const weeks = data ? buildHeatmapWeeks(data.stats.history, 52) : [];


    return (
        <main style={{ padding: 24 }}>
            <h1>GGCG Dashboard</h1>

            {fetching && <div>Loading…</div>}
            {error && <pre>{error.message}</pre>}

            {data && (
                <div style={{ display: "flex", gap: 2, marginTop: 16 }}>
                    {weeks.map((week, wIdx) => (
                        <div key={wIdx} style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                            {week.map((cell) => (
                                <div
                                    key={cell.date}
                                    title={`${cell.date} — ${cell.count}`}
                                    style={{
                                        width: 12,
                                        height: 12,
                                        borderRadius: 3,
                                        opacity: 0.25 + cell.level * 0.15,
                                        background: "currentColor",
                                    }}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            )}
        </main>
    );

}