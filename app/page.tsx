"use client";

import { useQuery } from "urql";

const TestQuery = `query { __typename }`;

export default function Home() {
    const [{ data, fetching, error }] = useQuery({ query: TestQuery });

    if (fetching) return <div>Loading…</div>;
    if (error) return <pre>{error.message}</pre>;
    
    return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
