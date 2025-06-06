"use client";

import { Balance } from "../Balance";
import { AddressInfoDropdown } from "./AddressInfoDropdown";
import { AddressQRCodeModal } from "./AddressQRCodeModal";
import { WrongNetworkDropdown } from "./WrongNetworkDropdown";
import { usePrivy } from "@privy-io/react-auth";
import { Address, extractChain } from "viem";
import { mainnet } from "viem/chains";
import { useAccount, useChainId, useEnsAvatar, useEnsName } from "wagmi";
import { useNetworkColor } from "~~/hooks/scaffold-eth";
import { useTargetNetwork } from "~~/hooks/scaffold-eth/useTargetNetwork";
import { wagmiConfig } from "~~/services/web3/wagmiConfig";
import { getBlockExplorerAddressLink } from "~~/utils/scaffold-eth";

/**
 * Custom Privy Connect Button (watch balance + custom design)
 */
export const PrivyCustomConnectButton = () => {
  const networkColor = useNetworkColor();
  const { targetNetwork } = useTargetNetwork();
  const { login, authenticated, ready, logout } = usePrivy();
  const account = useAccount();
  const chainId = useChainId();
  const chain = extractChain({
    chains: wagmiConfig.chains,
    id: chainId as 1 | 10 | 11155420,
  });
  const { data: ensName } = useEnsName({
    address: account.address,
    chainId: mainnet.id,
    query: {
      enabled: !!account.address,
    },
  });
  const { data: ensAvatar } = useEnsAvatar({
    name: ensName as string,
    chainId: mainnet.id,
    query: {
      enabled: !!ensName,
    },
  });

  if (!ready) {
    return <span className="loading loading-spinner loading-sm"></span>;
  }

  const handleConnect = async () => {
    // If user is authenticated but has no wallet connected, logout first
    if (authenticated && !account.address) {
      await logout();
    }
    await login();
  };

  // Show loading while we don't have a valid wallet address
  if (!account.address) {
    return <span className="loading loading-spinner loading-sm"></span>;
  }

  if (!authenticated) {
    return (
      <button className="btn btn-primary btn-sm" onClick={handleConnect} type="button">
        Connect Wallet
      </button>
    );
  }

  if (!chainId) {
    return null;
  }

  const blockExplorerAddressLink = account.address
    ? getBlockExplorerAddressLink(targetNetwork, account.address as Address)
    : undefined;

  if (chainId !== targetNetwork.id) {
    return <WrongNetworkDropdown />;
  }

  return (
    <>
      <div className="flex flex-col items-center mr-1">
        <Balance address={account.address as Address} className="min-h-0 h-auto" />
        <span className="text-xs" style={{ color: networkColor }}>
          {chain.name}
        </span>
      </div>
      <AddressInfoDropdown
        address={account.address as Address}
        displayName={account.address as Address}
        ensAvatar={ensAvatar as string}
        blockExplorerAddressLink={blockExplorerAddressLink}
      />
      <AddressQRCodeModal address={account.address as Address} modalId="qrcode-modal" />
    </>
  );
};
