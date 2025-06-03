import { Client, cacheExchange, createClient, fetchExchange } from "urql";

const urqlClient: Record<string, Client> = {
  10: createClient({
    // optimism mainnet
    url: "https://gateway.thegraph.com/api/adca8d5ca99b5c886296cdbf714ddf6b/subgraphs/id/CNojXnaokkytgd54qTvamsYWtKfCjnXm6afHXzKNAT4G",
    exchanges: [cacheExchange, fetchExchange],
  }),
  11155420: createClient({
    // op sepolia
    url: "https://gateway.thegraph.com/api/adca8d5ca99b5c886296cdbf714ddf6b/subgraphs/id/62tPEBeCiSXAxZUtSiCRcM2UMzTpXtmbs6ABcetyEgfW",
    exchanges: [cacheExchange, fetchExchange],
  }),
};

export default urqlClient;

export type UrqlClientNetwork = keyof typeof urqlClient;
