import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { GamesCreatedDocument, GamesCreatedQuery, execute } from "~~/.graphclient";

export const useGamesCreated = ({
  creator,
  enabled = true,
}: {
  creator?: string;
  enabled?: boolean;
}): UseQueryResult<GamesCreatedQuery["gameCreateds"]> => {
  return useQuery({
    queryKey: ["gamesCreated", creator],
    queryFn: async () => {
      const result = await execute(GamesCreatedDocument, { where: { creator } });
      return result.data?.gameCreateds;
    },
    enabled,
  });
};
