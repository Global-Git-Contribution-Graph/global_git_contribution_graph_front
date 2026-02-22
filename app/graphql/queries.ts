export const STATS_QUERY = `
    query Stats($uid: String!, $forges: [ForgeInput!]!) {
        stats(uid: $uid, forges: $forges) {
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
