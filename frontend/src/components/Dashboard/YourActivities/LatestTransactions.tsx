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
  return (
    <div className="px-4 md:px-8">
      <Title order={2} className="text-lg md:text-2xl font-semibold my-4">
        Transactions History
      </Title>

      {transactions.length === 0 ? (
        <Text className="text-center">No transactions available</Text>
      ) : (
        <Paper className="p-4 bg-[#121215] rounded-lg shadow-lg border border-gray-700">
          <div className="overflow-x-auto">
            <Table highlightOnHover verticalSpacing="md" className="min-w-full">
              <Table.Thead>
                <Table.Tr>
                  <Table.Th></Table.Th>
                  <Table.Th>Txn Hash</Table.Th>
                  <Table.Th>Method</Table.Th>
                  <Table.Th className="hidden md:table-cell">From</Table.Th>
                  <Table.Th className="hidden md:table-cell">To</Table.Th>
                  <Table.Th className="hidden md:table-cell">Block Height</Table.Th>
                  <Table.Th>Date</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {transactions.map((tx) => (
                  <Table.Tr key={tx.id} className="text-sm md:text-base">
                    <Table.Td>
                      {tx.has_error ? (
                        <IconX className="text-red-500" size={18} />
                      ) : (
                        <IconCheck className="text-green-500" size={18} />
                      )}
                    </Table.Td>
                    <Table.Td>
                      <a
                        href={`https://nearblocks.io/txns/${tx.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#3bc8bd] font-medium hover:underline"
                      >
                        {`${tx.id.slice(0, 10)}...`}
                      </a>
                    </Table.Td>
                    <Table.Td>
                      <Badge color="cyan" variant="light">
                        {tx.method_name}
                      </Badge>
                    </Table.Td>
                    <Table.Td className="hidden md:table-cell">{tx.signer}</Table.Td>
                    <Table.Td className="hidden md:table-cell">{tx.receiver}</Table.Td>
                    <Table.Td className="hidden md:table-cell">{tx.block_height}</Table.Td>
                    <Table.Td>
                      {new Date(Number(tx.transaction_timestamp) / 1e6).toLocaleDateString()}
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </div>
        </Paper>
      )}
    </div>
  );
}
