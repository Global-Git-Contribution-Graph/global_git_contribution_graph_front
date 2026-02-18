"use client";

import { ReactNode, useMemo } from 'react';
import {
  Provider,
  createClient,
  cacheExchange,
  fetchExchange,
  debugExchange,
} from "urql";

const GRAPHQL_URL = "http://127.0.0.1:8080/graphql";

export const UrqlProvider = ({ children }: { children: ReactNode}) => {
    const client = useMemo(() => createClient({ url: GRAPHQL_URL, exchanges: [debugExchange, cacheExchange, fetchExchange],
 }), []);
    return <Provider value={client}>{children}</Provider>;
}