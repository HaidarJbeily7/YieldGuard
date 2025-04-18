import { Flex, Paper, Stack, Title } from "@mantine/core";
import { ConnectWalletButton } from "../components/ConnectWalletButton/ConnectWalletButton";

export function LoginPage() {
  return (
    <Flex
      mih="100vh"
      gap="xl"
      justify="center"
      align="center"
      direction="column"
      wrap="wrap"
    >
      <Title
        order={1}
        mt="xl"
        mb="xl"
        fz={{ base: "18px", sm: "24px", md: "32px", lg: "36px" }} 
      >
        Sign In with Your Near Wallet
      </Title>
      <Paper shadow="xs" p="xl">
        <Stack>
          <ConnectWalletButton />
        </Stack>
      </Paper>
    </Flex>
  );
}
