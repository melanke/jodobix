import { useAccount } from "wagmi";
import { TransactionHash } from "~~/app/blockexplorer/_components";
import chainConstants from "~~/const/chainConstants";
import { useScaffoldEventHistory } from "~~/hooks/scaffold-eth";

interface PrizePaymentInfoProps {
  betId: bigint;
}

export const PrizePaymentInfo = ({ betId }: PrizePaymentInfoProps) => {
  const { chainId } = useAccount();
  const deploymentBlock = chainConstants[chainId as keyof typeof chainConstants]?.Critter?.deploymentBlock ?? 10n;

  const { data: prizePaymentedEvents, isLoading } = useScaffoldEventHistory({
    contractName: "Critter",
    eventName: "PrizePayment",
    fromBlock: deploymentBlock - 10n,
    filters: { betId },
    enabled: !!betId,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!prizePaymentedEvents || prizePaymentedEvents.length === 0) {
    return <div>Prize not claimed yet</div>;
  }

  const { transactionHash } = prizePaymentedEvents[0] as any;

  return (
    <div className="text-sm">
      <TransactionHash hash={transactionHash} />
    </div>
  );
};
