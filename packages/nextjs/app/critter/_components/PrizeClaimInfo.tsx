import { useAccount } from "wagmi";
import { TransactionHash } from "~~/app/blockexplorer/_components";
import chainConstants from "~~/const/chainConstants";
import { useScaffoldEventHistory } from "~~/hooks/scaffold-eth";

interface PrizeClaimInfoProps {
  betId: bigint;
}

export const PrizeClaimInfo = ({ betId }: PrizeClaimInfoProps) => {
  const { chainId } = useAccount();
  const deploymentBlock = chainConstants[chainId as keyof typeof chainConstants]?.Critter?.deploymentBlock ?? 10n;

  const { data: prizeClaimedEvents, isLoading } = useScaffoldEventHistory({
    contractName: "Critter",
    eventName: "PrizeClaimed",
    fromBlock: deploymentBlock - 10n,
    filters: { betId },
    enabled: !!betId,
  });

  if (isLoading) {
    return <div>Loading...</div>;
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
