import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { BetsPlacedDocument, BetsPlacedQuery, execute } from "~~/.graphclient";

export const useBetsPlaced = ({
  gameId,
  number,
  bettor,
  enabled = true,
}: {
  gameId?: bigint;
  number?: number;
  bettor?: string;
  enabled?: boolean;
}): UseQueryResult<BetsPlacedQuery["betPlaceds"]> => {
  return useQuery({
    queryKey: ["betPlaceds", gameId, number, bettor],
    queryFn: async () => {
      const result = await execute(BetsPlacedDocument, { where: { gameId, number, bettor } });
      return result.data?.betPlaceds;
    },
    enabled,
  });
};
