"use client";

import { useState } from "react";
import { createWalletClient, http, parseEther } from "viem";
import { hardhat, optimismSepolia } from "viem/chains";
import { useAccount } from "wagmi";
import { BanknotesIcon } from "@heroicons/react/24/outline";
import { useTransactor } from "~~/hooks/scaffold-eth";
import { useWatchBalance } from "~~/hooks/scaffold-eth/useWatchBalance";

// Number of ETH faucet sends to an address
const NUM_OF_ETH = "1";
const FAUCET_ADDRESS = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";

const localWalletClient = createWalletClient({
  chain: hardhat,
  transport: http(),
});

/**
 * FaucetButton button which lets you grab eth.
 */
export const FaucetButton = () => {
  const { address, chain: ConnectedChain } = useAccount();

  const isHardhat = ConnectedChain?.id === hardhat.id;
  const isOpSepolia = ConnectedChain?.id === optimismSepolia.id;

  const { data: balance } = useWatchBalance({ address });

  const [loading, setLoading] = useState(false);

  const faucetTxn = useTransactor(localWalletClient);

  const clickHandler = () => {
    if (!address) return;
    if (isHardhat) {
      sendETH();
    } else if (isOpSepolia) {
      window.open("https://console.optimism.io/faucet", "_blank");
    } else {
      window.open("https://global-stg.transak.com/", "_blank");
    }
  };

  const sendETH = async () => {
    if (!address) return;
    try {
      setLoading(true);
      await faucetTxn({
        account: FAUCET_ADDRESS,
        to: address,
        value: parseEther(NUM_OF_ETH),
      });
      setLoading(false);
    } catch (error) {
      console.error("⚡️ ~ file: FaucetButton.tsx:sendETH ~ error", error);
      setLoading(false);
    }
  };

  const isBalanceZero = balance && balance.value === 0n;

  const tooltipText = isHardhat || isOpSepolia ? "Grab funds from faucet" : "Buy ETH (optimism) on Transak";

  if (!address) return null;

  return (
    <div
      className={
        !isBalanceZero
          ? "ml-1"
          : "ml-1 tooltip tooltip-bottom tooltip-secondary tooltip-open font-bold before:left-auto before:transform-none before:content-[attr(data-tip)] before:right-0"
      }
      data-tip={tooltipText}
    >
      <button className="btn btn-secondary btn-sm px-2 rounded-full" onClick={clickHandler} disabled={loading}>
        {!loading ? (
          <BanknotesIcon className="h-4 w-4" />
        ) : (
          <span className="loading loading-spinner loading-xs"></span>
        )}
      </button>
    </div>
  );
};
