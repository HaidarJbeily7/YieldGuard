import { Table, Title, Text, Badge, Paper } from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons-react";

type Transaction = {
  id: string;
  block_height: string;
  signer: string;
  receiver: string;
  method_name: string;
  transaction_timestamp: string;
  has_error: boolean;
};

export function LatestTransactions({
  transactions,
}: {
  transactions: Transaction[];
}) {
  const rows = transactions.map((tx) => (
    <Table.Tr key={tx.id}>
      <Table.Td>
        {tx.has_error ? (
          <IconX color="red" size={18} />
        ) : (
          <IconCheck color="green" size={18} />
        )}
      </Table.Td>
      {/* Transaction ID with clickable link */}
      <Table.Td>
        <a
          href={`https://nearblocks.io/txns/${tx.id}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "#3bc8bd",
            textDecoration: "none",
            fontWeight: 500,
          }}
        >
          {`${tx.id.slice(0, 10)}...`}
        </a>
      </Table.Td>
      {/* Method Name */}
      <Table.Td>
        <Badge color="cyan" variant="light">
          {tx.method_name}
        </Badge>
      </Table.Td>
      {/* Signer */}
      <Table.Td>{tx.signer}</Table.Td>
      {/* Receiver */}
      <Table.Td>{tx.receiver} </Table.Td>
      {/* Block Height */}
      <Table.Td>{tx.block_height}</Table.Td>
      {/* Timestamp */}
      <Table.Td>
        {new Date(Number(tx.transaction_timestamp) / 1e6).toLocaleDateString()}
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <div>
      <Title mx="2rem" order={2} my="2rem">
        Transactions History
      </Title>
      {transactions.length === 0 ? (
        <Text ta="center">No transactions available</Text>
      ) : (
        <Paper
          mx="2rem"
          p="1rem"
          bg="#121215"
          withBorder
          radius="lg"
          shadow="lg"
        >
          <Table highlightOnHover verticalSpacing="md">
            <Table.Thead>
              <Table.Tr>
                <Table.Th></Table.Th>
                <Table.Th>Txn Hash</Table.Th>
                <Table.Th>Method</Table.Th>
                <Table.Th>From</Table.Th>
                <Table.Th>To</Table.Th>
                <Table.Th>Block Height</Table.Th>
                <Table.Th>Date</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </Paper>
      )}
    </div>
  );
}
