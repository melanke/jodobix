import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { EndsOfBettingPeriodDocument, EndsOfBettingPeriodQuery, execute } from "~~/.graphclient";

export const useEndsOfBettingPeriod = ({
  enabled = true,
}: {
  enabled?: boolean;
}): UseQueryResult<EndsOfBettingPeriodQuery["endOfBettingPeriods"]> => {
  return useQuery({
    queryKey: ["endsOfBettingPeriod"],
    queryFn: async () => {
      const result = await execute(EndsOfBettingPeriodDocument, {});
      return result.data?.endOfBettingPeriods;
    },
    enabled,
  });
};
