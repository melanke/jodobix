import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { useChainId } from "wagmi";
import { BetsPlacedDocument, BetsPlacedQuery } from "~~/.graphclient";
import urqlClient, { UrqlClientNetwork } from "~~/services/graph/urqlClient";

export const useBetsPlaced = ({
  network,
  gameId,
  number,
  bettor,
  enabled = true,
}: {
  network?: UrqlClientNetwork;
  gameId?: string;
  number?: number;
  bettor?: string;
  enabled?: boolean;
}): UseQueryResult<BetsPlacedQuery["betPlaceds"] | undefined> => {
  const defaultChainId = useChainId();
  const networkWithFallback = network ?? defaultChainId;

  return useQuery({
    queryKey: ["betPlaceds", networkWithFallback, gameId, number, bettor],
    queryFn: async () => {
      const result = await urqlClient[networkWithFallback].query(BetsPlacedDocument, {
        where: { gameId, number, bettor },
      });
      return result.data?.betPlaceds;
    },
    enabled: enabled && !!networkWithFallback,
  });
};
