import { Divider, Paper, Text } from "@mantine/core";

type AccountData = {
  account_id: string;
  timestamp_creation: string;
  sha_code: string;
  parent: string;
};

export function AccountOverview({ accountData }: { accountData: AccountData }) {
  return (
    <Paper
      m="2rem"
      p="1rem"
      bg="#121215"
      withBorder
      radius="lg"
      shadow="lg"
      w="fit-content"
    >
      <Text fw={700}>Overview</Text>
      <Divider my="md" />
      <Text fw={300}>
        <b>Created On:</b>{" "}
        {new Date(
          Number(accountData.timestamp_creation) / 1e6
        ).toLocaleString()}
      </Text>
      <Divider my="sm" />

      <Text fw={300}>
        <b>SHA Code:</b> {accountData.sha_code}
      </Text>
      <Divider my="sm" />

      <Text fw={300}>
        <b>Parent Account:</b> {accountData.parent}
      </Text>
    </Paper>
  );
}
