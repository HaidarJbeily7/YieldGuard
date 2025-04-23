import { useContext } from "react";
import { AccountOverview } from "./AccountOverview";
import { LatestTransactions } from "./LatestTransactions";
import { DailyTransactionChart } from "./DailyTransactionChart";
import { TotalTransactions } from "./TotalTransactions";
import useSWR from "swr";
import axios from "axios";
import { mockData } from "./mockData";
import { Divider, Flex } from "@mantine/core";
import { AccountId } from "./AccountId";
import { WalletContext } from "../../../context/WalletContext";
import { YourActivitiesSkeleton } from "./YourActivitiesSkeleton";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Fetcher function with delay
const fetcherWithDelay = async (urls: string[], useMock = false) => {
  if (useMock) {
    return [
      mockData.accountData,
      mockData.transactions,
      mockData.dailyTxCounts,
      mockData.totalTx,
    ];
  }

  const results = [];
  for (const url of urls) {
    const response = await axios.get(url, {
      headers: { "x-api-key": import.meta.env.VITE_API_KEY },
    });
    results.push(response.data);
    await delay(1000);
  }
  return results;
};

export function YourActivities() {
  const { accountId } = useContext(WalletContext);
  const useMock = true;

  const { data, error } = useSWR(
    accountId
      ? [
        `https://api.pikespeak.ai/account/accounts-parents?accounts=${accountId}`,
        `https://api.pikespeak.ai/account/transactions/${accountId}?limit=10`,
        `https://api.pikespeak.ai/account/daily-tx-count/${accountId}`,
        `https://api.pikespeak.ai/account/tx-count/${accountId}`,
      ]
      : null,
    async (urls) => {
      const [accountData, transactions, dailyTxCounts, totalTx] =
        await fetcherWithDelay(urls, useMock);
      return {
        accountData: accountData[0],
        transactions,
        dailyTxCounts,
        totalTx,
      };
    },
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 60000,
    }
  );

  if (error) {
    return <YourActivitiesSkeleton />;
  }

  if (!data) {
    return <YourActivitiesSkeleton />;
  }

  const { accountData, transactions, dailyTxCounts, totalTx } = data;

  return (
    <div style={{ padding: "1rem" }}>
      <AccountId accountData={accountData} />
      <Divider mt={16} size="xs" />
      <Flex
        justify="space-between"
        style={{
          display: 'flex',
          alignItems: 'center',
          alignContent: 'space-around',
          flexWrap: 'wrap'
        }}
      >
        <AccountOverview accountData={accountData} />
        <TotalTransactions totalTx={totalTx} />
      </Flex>

      <DailyTransactionChart dailyTxCounts={dailyTxCounts} />

      <LatestTransactions transactions={transactions} />
     
  

    </div>
  );
}