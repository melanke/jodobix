import { TransactionHash } from "~~/app/blockexplorer/_components";
import { useScaffoldEventHistory } from "~~/hooks/scaffold-eth";

interface PrizeClaimInfoProps {
  betId: bigint;
}

export const PrizeClaimInfo = ({ betId }: PrizeClaimInfoProps) => {
  const { data: prizeClaimedEvents, isLoading } = useScaffoldEventHistory({
    contractName: "Critter",
    eventName: "PrizeClaimed",
    fromBlock: 0n,
    filters: { betId },
  });

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (!prizeClaimedEvents || prizeClaimedEvents.length === 0) {
    return <div>Prize not claimed yet</div>;
  }

  console.log(prizeClaimedEvents);

  const { transactionHash } = prizeClaimedEvents[0] as any;

  return (
    <div className="text-sm">
      <TransactionHash hash={transactionHash} />
    </div>
  );
};
