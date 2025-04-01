import { useState } from "react";
import { Text, ActionIcon, Flex } from "@mantine/core"; // Use Flex instead of Group
import { IconClipboardCopy, IconClipboardCheckFilled } from "@tabler/icons-react";
import { useMediaQuery } from '@mantine/hooks';

type AccountData = {
  account_id: string;
  timestamp_creation: string;
  sha_code: string;
  parent: string;
};

export function AccountId({ accountData }: { accountData: AccountData }) {
  const [copied, setCopied] = useState(false);
  const isSmallScreen = useMediaQuery("(max-width: 768px)"); // Example breakpoint

  const handleCopy = () => {
    navigator.clipboard.writeText(accountData.account_id);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <Flex gap={4} direction={isSmallScreen ? "column" : "row"} align="center">
      <Text fw={300} size="xl" ml="2rem">
        <b>Near Account:</b>
      </Text>
      <Text fw={500} size="xl" fs="italic">
        @{accountData.account_id}
      </Text>
      <ActionIcon onClick={handleCopy} ml={4} radius={50} bg="#3bc8bd33">
        {copied ? (
          <IconClipboardCheckFilled size={16} stroke={1.5} />
        ) : (
          <IconClipboardCopy size={16} stroke={1.5} />
        )}
      </ActionIcon>
    </Flex>
  );
}
