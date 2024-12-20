import React, { useContext } from "react";
import { Button, Flex, Text } from "@mantine/core";
import { WalletContext } from "../../context/WalletContext";

export const ConnectWalletButton: React.FC = () => {
  const { modal, accountId, Logout } = useContext(WalletContext);

  const handleConnectWallet = () => {
    if (modal) {
      modal.show();
    }
  };

  const handleDisconnecte = () => {
    Logout();
  };

  return (
    <div>
      {accountId ? (
        <Flex
          mih={50}
          gap="xl"
          justify="center"
          align="center"
          direction="column"
          wrap="wrap"
        >
          <Text fw={500} size="lg">
            Connected as {accountId}
          </Text>
          <Button
            onClick={handleDisconnecte}
            variant="gradient"
            gradient={{ from: "red", to: "orange", deg: 90 }}
            size="lg"
          >
            Disconnect
          </Button>
        </Flex>
      ) : (
        <Button
          onClick={handleConnectWallet}
          variant="gradient"
          gradient={{ from: "blue", to: "cyan", deg: 90 }}
          size="lg"
        >
          Connect NEAR Wallet
        </Button>
      )}
    </div>
  );
};
