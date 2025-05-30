import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { PrizePaymentsDocument, PrizePaymentsQuery, execute } from "~~/.graphclient";

export const usePrizePayments = ({
  betId,
  enabled = true,
}: {
  betId?: bigint;
  enabled?: boolean;
}): UseQueryResult<PrizePaymentsQuery["prizePayments"]> => {
  return useQuery({
    queryKey: ["prizePayments", betId],
    queryFn: async () => {
      const result = await execute(PrizePaymentsDocument, { where: { betId } });
      return result.data?.prizePayments;
    },
    enabled,
  });
};
