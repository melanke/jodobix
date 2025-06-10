"use client";

import React, { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useAccount, useSwitchChain } from "wagmi";
import { ArrowPathIcon } from "@heroicons/react/24/outline";

const JodobixPage = () => {
  const router = useRouter();
  const { chain } = useAccount();
  const { switchChainAsync } = useSwitchChain();

  const handleSwitchChain = async () => {
    const defaultChainId = chain?.id || 10;
    await switchChainAsync?.({ chainId: defaultChainId });
    router.replace(`/jodobix/${defaultChainId}`);
  };

  useEffect(() => {
    handleSwitchChain();
  }, [chain?.id, router]);

  return (
    <div className="flex justify-center items-center h-screen">
      <ArrowPathIcon className="h-10 w-10 animate-spin" />
    </div>
  );
};

export default JodobixPage;
