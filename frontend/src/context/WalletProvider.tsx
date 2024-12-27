import React, { ReactNode, useEffect, useState } from "react";
import { setupBitgetWallet } from "@near-wallet-selector/bitget-wallet";
import {
  NetworkId,
  setupWalletSelector,
  WalletSelector,
} from "@near-wallet-selector/core";
import { setupHereWallet } from "@near-wallet-selector/here-wallet";
import {
  setupModal,
  WalletSelectorModal,
} from "@near-wallet-selector/modal-ui";
import { setupMyNearWallet } from "@near-wallet-selector/my-near-wallet";
import { useUserStore } from "../store/user";
import { WalletContext } from "./WalletContext";

interface WalletProviderProps {
  children: ReactNode;
}
export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const [selector, setSelector] = useState<WalletSelector | null>(null);
  const [modal, setModal] = useState<WalletSelectorModal | null>(null);
  const [accountId, setAccountId] = useState<string | null>(null);
  const { login, logout } = useUserStore();

  useEffect(() => {
    const init = async () => {
      const _selector = await setupWalletSelector({
        network: "testnet" as NetworkId,

        modules: [setupMyNearWallet(), setupHereWallet(), setupBitgetWallet()],
      });

      const _modal = setupModal(_selector, {
        contractId: "placeholder.testnet",
      });

      setSelector(_selector);
      setModal(_modal);

      const accounts = await _selector.store.getState().accounts;
      if (accounts.length > 0) {
        setAccountId(accounts[0].accountId);
        login(accounts[0].accountId);
      }
    };

    init().catch((err) => {
      throw new Error(`Error: ${err instanceof Error ? err.message : err}`);
    });
  }, [login]);

  useEffect(() => {
    if (selector) {
      const subscription = selector.store.observable.subscribe((state) => {
        const accounts = state.accounts;
        if (accounts.length > 0) {
          setAccountId(accounts[0].accountId);
          login(accounts[0].accountId);
        } else {
          setAccountId(null);
          logout();
        }
      });

      return () => subscription.unsubscribe();
    }
  }, [selector, login, logout]);

  const Logout = async () => {
    if (selector) {
      const wallet = await selector.wallet();
      try {
        await wallet.signOut();
      } catch (error) {
        console.error("Error during wallet disconnect:", error);
      }
    }
    setAccountId(null);
    logout();
  };

  return (
    <WalletContext.Provider
      value={{ selector, modal, accountId, setAccountId, Logout }}
    >
      {children}
    </WalletContext.Provider>
  );
};
