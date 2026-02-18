export const STATS_QUERY = `
    query Stats($forges: [ForgeInput!]!) {
        stats(forges: $forges) {
            heatmap {
                days {
                    date
                    count
                    level
                }
            }
        }
    }
`;
