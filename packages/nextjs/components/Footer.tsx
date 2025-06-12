import React from "react";
import Link from "next/link";
import { FaGithub, FaTelegram } from "react-icons/fa6";
import { RiContractFill } from "react-icons/ri";
import { hardhat } from "viem/chains";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { SwitchTheme } from "~~/components/SwitchTheme";
import { Faucet } from "~~/components/scaffold-eth";
import { useTargetNetwork } from "~~/hooks/scaffold-eth/useTargetNetwork";

/**
 * Site footer
 */
export const Footer = () => {
  const { targetNetwork } = useTargetNetwork();
  const isLocalNetwork = targetNetwork.id === hardhat.id;

  return (
    <div className="min-h-0 py-5 px-1 mb-11 lg:mb-0">
      <div>
        {/* Transparency and Security Message */}
        <div className="flex flex-col items-center p-6 mb-4 mx-4">
          <h3 className="text-lg font-semibold mb-3 text-primary">🔒 Transparency & Security</h3>
          <p className="text-sm text-base-content/80 leading-relaxed mb-4 max-w-xl text-center">
            Jodobix code is fully open source and verified on Etherscan. The contract has no owner and is not updatable,
            making it impossible for anyone to perform malicious actions. Complete transparency for your peace of mind.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Link
              href="https://github.com/melanke/jodobix"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline btn-sm gap-2 hover:btn-primary"
            >
              <FaGithub size={18} />
              View Source Code
            </Link>
            <Link
              href="https://optimistic.etherscan.io/address/0xB23Bd5Eb9986B03E83197BBD22cD12f52607B06C#code"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline btn-sm gap-2 hover:btn-secondary"
            >
              <RiContractFill size={18} />
              View Contract
            </Link>
            <Link
              href="https://t.me/melankeee"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline btn-sm gap-2 hover:btn-accent"
            >
              <FaTelegram size={18} />
              Contact via Telegram
            </Link>
          </div>
        </div>

        {/* Existing bottom toolbar */}
        <div className="fixed flex justify-between items-center w-full z-10 p-4 bottom-0 left-0 pointer-events-none">
          <div className="flex flex-col md:flex-row gap-2 pointer-events-auto">
            {isLocalNetwork && (
              <>
                <Faucet />
                <Link href="/blockexplorer" passHref className="btn btn-primary btn-sm font-normal gap-1">
                  <MagnifyingGlassIcon className="h-4 w-4" />
                  <span>Block Explorer</span>
                </Link>
              </>
            )}
          </div>
          <SwitchTheme className={`pointer-events-auto ${isLocalNetwork ? "self-end md:self-auto" : ""}`} />
        </div>
      </div>
    </div>
  );
};
