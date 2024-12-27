import React, { useContext, useEffect } from "react";
import { Button } from "@mantine/core";
import { WalletContext } from "../../context/WalletContext";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/user";

interface ConnectWalletButtonProps {
  size?: string;
}

export const ConnectWalletButton: React.FC<ConnectWalletButtonProps> = ({
  size = "md",
}) => {
  const { modal, accountId, Logout } = useContext(WalletContext);
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  const navigate = useNavigate();
  const needRedirection = localStorage.getItem("needRedirection");

  const handleConnectWallet = () => {
    if (modal) {
      localStorage.setItem("needRedirection", "true");
      modal.show();
    }
  };

  const handleDisconnecte = () => {
    Logout();
  };

  useEffect(() => {
    if (isLoggedIn && needRedirection === "true") {
      localStorage.setItem("needRedirection", "false");
      navigate("/dashboard");
    }
  }, [isLoggedIn, navigate, needRedirection]);

  return (
    <div>
      {accountId ? (
        <Button
          onClick={handleDisconnecte}
          variant="gradient"
          gradient={{ from: "red", to: "orange", deg: 90 }}
          size={size}
        >
          Disconnect
        </Button>
      ) : (
        <Button
          onClick={handleConnectWallet}
          variant="gradient"
          gradient={{ from: "blue", to: "cyan", deg: 90 }}
          size={size}
        >
          Connect NEAR Wallet
        </Button>
      )}
    </div>
  );
};
