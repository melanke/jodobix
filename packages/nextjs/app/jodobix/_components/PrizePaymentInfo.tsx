import { TransactionHash } from "~~/app/blockexplorer/_components";
import { useScaffoldEventHistory } from "~~/hooks/scaffold-eth";

interface PrizePaymentInfoProps {
  betId: bigint;
}

export const PrizePaymentInfo = ({ betId }: PrizePaymentInfoProps) => {
  const { data: prizePaymentedEvents, isLoading } = useScaffoldEventHistory({
    contractName: "Jodobix",
    eventName: "PrizePayment",
    fromBlock: 0n,
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
