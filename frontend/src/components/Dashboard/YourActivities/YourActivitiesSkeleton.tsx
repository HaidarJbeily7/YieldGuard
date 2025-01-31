import { useContext } from "react";
import { Divider, Flex, Skeleton, Title } from "@mantine/core";
import { AccountId } from "./AccountId";
import { WalletContext } from "../../../context/WalletContext";

export function YourActivitiesSkeleton() {
  const { accountId } = useContext(WalletContext);

  const AccountData = {
    account_id: accountId || "Loading...",
    timestamp_creation: "",
    sha_code: "",
    parent: "",
  };

  return (
    <div style={{ padding: "1rem" }}>
      {accountId ? <AccountId accountData={AccountData} /> : <></>}
      <Divider mt={16} size="xs" />
      <Flex justify="space-between" gap={8} mx="2rem" my="1rem">
        <Skeleton height={250} maw="60%" radius="md" mt="md" />

        <Skeleton height={250} maw="30%" radius="md" mt="md" />
      </Flex>
      <Title mx="2rem" order={2} mt="4rem">
        Transactions Activity
      </Title>

      <Skeleton height={360} radius="md" mt="2rem" mx="2rem" />
    </div>
  );
}
