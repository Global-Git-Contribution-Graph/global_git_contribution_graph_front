"use client";

import { useQuery } from "urql";

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
	const gqlForges = forges.map((forge) => {
		const { id, ...gql } = forge;
		void id;
		return gql;
	});

	const [{ data, fetching, error }] = useQuery<StatsData>({
		query: STATS_QUERY,
		variables: { forges: gqlForges },
	});

	if (fetching) return <div>Loading...</div>;
	if (error) return <pre>{error.message}</pre>;
	if (!data) return <div>No data</div>;

	const weeks = buildHeatmapWeeks(data.stats.history, 52);

	return (
		<section className="mt-4">
			<Heatmap weeks={weeks} />
		</section>
	);
}
