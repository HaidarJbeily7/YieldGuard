import { createContext } from "react";
import { WalletSelector } from "@near-wallet-selector/core";
import { WalletSelectorModal } from "@near-wallet-selector/modal-ui";

interface WalletContextValue {
  selector: WalletSelector | null;
  modal: WalletSelectorModal | null;
  accountId: string | null;
  setAccountId: (accountId: string | null) => void;
}

export const WalletContext = createContext<WalletContextValue>({
  selector: null,
  modal: null,
  accountId: null,
  setAccountId: () => {},
});
