import { TransactionHash } from "~~/app/blockexplorer/_components";
import { usePrizePayments } from "~~/hooks/usePrizePayments";

interface PrizePaymentInfoProps {
  betId: bigint;
}

export const PrizePaymentInfo = ({ betId }: PrizePaymentInfoProps) => {
  const { data: prizePaymentedEvents, isLoading } = usePrizePayments({
    betId: betId.toString(),
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
