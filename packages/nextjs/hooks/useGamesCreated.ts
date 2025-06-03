import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { useChainId } from "wagmi";
import { GamesCreatedDocument, GamesCreatedQuery } from "~~/.graphclient";
import urqlClient, { UrqlClientNetwork } from "~~/services/graph/urqlClient";

export const useGamesCreated = ({
  network,
  creator,
  enabled = true,
}: {
  network?: UrqlClientNetwork;
  creator?: string;
  enabled?: boolean;
}): UseQueryResult<GamesCreatedQuery["gameCreateds"] | undefined> => {
  const defaultChainId = useChainId();
  const networkWithFallback = network ?? defaultChainId;

  return useQuery({
    queryKey: ["gamesCreated", networkWithFallback, creator],
    queryFn: async () => {
      const result = await urqlClient[networkWithFallback].query(GamesCreatedDocument, { where: { creator } });
      return result.data?.gameCreateds;
    },
    enabled: enabled && !!networkWithFallback,
  });
};
