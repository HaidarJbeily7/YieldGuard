import React, { useContext, useEffect } from "react";
import { Button } from "@mantine/core";
import { WalletContext } from "../../context/WalletContext";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/user";

interface ConnectWalletButtonProps {
  size?: string;
  style?: React.CSSProperties;
  className?: string;
  textStyle?: React.CSSProperties;
  textClassName?: string;
  gradient?: { from: string; to: string; deg?: number };
  rightSection?: React.ReactNode;
  text?: string;
}

export const ConnectWalletButton: React.FC<ConnectWalletButtonProps> = ({
  size = "md",
  style,
  className,
  textStyle,
  textClassName,
  gradient = { from: "#36b9af", to: "cyan", deg: 90 },
  rightSection,
  text,
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

  const handleDisconnect = () => {
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
          onClick={handleDisconnect}
          variant="gradient"
          gradient={gradient}
          size={size}
          style={style}
          className={className}
          rightSection={rightSection}
        >
          <span style={textStyle} className={textClassName}>
            {text || "Disconnect"}
          </span>
        </Button>
      ) : (
        <Button
          onClick={handleConnectWallet}
          variant="gradient"
          gradient={gradient}
          size={size}
          style={style}
          className={className}
          rightSection={rightSection}
        >
          <span style={textStyle} className={textClassName}>
            {text || "Connect NEAR Wallet"}
          </span>
        </Button>
      )}
    </div>
  );
};
