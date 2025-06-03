import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { useChainId } from "wagmi";
import { EndsOfBettingPeriodDocument, EndsOfBettingPeriodQuery } from "~~/.graphclient";
import urqlClient, { UrqlClientNetwork } from "~~/services/graph/urqlClient";

export const useEndsOfBettingPeriod = ({
  network,
  enabled = true,
}: {
  network?: UrqlClientNetwork;
  enabled?: boolean;
}): UseQueryResult<EndsOfBettingPeriodQuery["endOfBettingPeriods"] | undefined> => {
  const defaultChainId = useChainId();
  const networkWithFallback = network ?? defaultChainId;

  return useQuery({
    queryKey: ["endsOfBettingPeriod", networkWithFallback],
    queryFn: async () => {
      const result = await urqlClient[networkWithFallback].query(EndsOfBettingPeriodDocument, {});
      return result.data?.endOfBettingPeriods;
    },
    enabled: enabled && !!networkWithFallback,
  });
};
