import { useState, useEffect } from "react";
import { Skeleton } from "@mantine/core";
import { balanceData } from "./BalaceData";
import Token3D from "./Token3D";

export function Balances() {
  const [balances, setBalances] = useState<typeof balanceData>();

  useEffect(() => {
    setTimeout(() => {
      setBalances(balanceData);
    }, 1000);
  }, []);

  return (
    <div className="flex flex-col items-center p-6">
      <h2 className="text-2xl font-bold text-white mb-4">Your Balances</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
        {balances
          ? balances.map((balance, index) => (
              <div
                key={index}
                className="flex items-center bg-[#121215] border border-gray-600 shadow-lg rounded-lg p-4 text-white"
              >
                <img
                  src={balance.icon}
                  alt={balance.symbol}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <Token3D icon={balance.icon} altText={balance.symbol} />

                <div>
                  <h3 className="text-lg font-semibold">{balance.symbol}</h3>
                  <p className="text-gray-400">
                    {Number(balance.amount).toFixed(4)} {balance.symbol}
                  </p>
                </div>
              </div>
            ))
          : [...Array(2)].map((_, i) => (
              <Skeleton key={i} height={80} className="w-full rounded-lg" />
            ))}
      </div>
    </div>
  );
}
