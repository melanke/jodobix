"use client";

import React, { useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface DismissibleAlertProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

export const DismissibleAlert: React.FC<DismissibleAlertProps> = ({ id, children, className }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const isDismissed = localStorage.getItem(`alert-${id}`);
    if (!isDismissed) {
      setIsVisible(true);
    }
  }, [id]);

  const handleDismiss = () => {
    localStorage.setItem(`alert-${id}`, "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className={`p-4 relative ${className}`}>
      <button
        onClick={handleDismiss}
        className="absolute top-2 right-2 btn btn-ghost btn-sm btn-circle"
        aria-label="Close alert"
      >
        <XMarkIcon className="h-5 w-5" />
      </button>
      {children}
    </div>
  );
};
