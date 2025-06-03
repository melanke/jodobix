import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { useChainId } from "wagmi";
import { PrizePaymentsDocument, PrizePaymentsQuery } from "~~/.graphclient";
import urqlClient, { UrqlClientNetwork } from "~~/services/graph/urqlClient";

export const usePrizePayments = ({
  network,
  betId,
  enabled = true,
}: {
  network?: UrqlClientNetwork;
  betId?: bigint;
  enabled?: boolean;
}): UseQueryResult<PrizePaymentsQuery["prizePayments"] | undefined> => {
  const defaultChainId = useChainId();
  const networkWithFallback = network ?? defaultChainId;

  return useQuery({
    queryKey: ["prizePayments", networkWithFallback, betId],
    queryFn: async () => {
      const result = await urqlClient[networkWithFallback].query(PrizePaymentsDocument, { where: { betId } });
      return result.data?.prizePayments;
    },
    enabled: enabled && !!networkWithFallback,
  });
};
