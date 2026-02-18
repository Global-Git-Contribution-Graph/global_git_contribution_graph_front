export const STATS_QUERY = `
    query Stats($forges: [ForgeInput!]!) {
        stats(forges: $forges) {
            history {
                date
                contributionCount
            }
        }
    }
`;
