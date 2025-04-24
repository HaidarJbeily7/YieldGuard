import { useState, useContext } from "react";
import { WalletContext } from "../../context/WalletContext";
import {
  IconAlertHexagon,
  IconFileAnalytics,
  IconFingerprint,
  IconShieldSearch,
  IconLicense,
  IconLogout,
  IconMessage2,
  IconMessages,
  IconReceipt2,
  IconReceiptRefund,
  IconShoppingCart,
  IconSwitchHorizontal,
  IconUsers,
  IconMenu2,
  IconX,
} from "@tabler/icons-react";

const tabs = {
  account: [
    { label: "Your Activities", icon: IconFingerprint },
    // { label: "Report Activities", icon: IconAlertHexagon },
    { label: "Check Activities", icon: IconShieldSearch },
    { label: "Balances", icon: IconReceipt2 },
    { label: "Features Section", icon: IconFileAnalytics }, 
    { label: "Performance", icon: IconFileAnalytics }, 
  ],
  general: [
    { label: "Orders", icon: IconShoppingCart },
    { label: "Receipts", icon: IconLicense },
    { label: "Reviews", icon: IconMessage2 },
    { label: "Messages", icon: IconMessages },
    { label: "Customers", icon: IconUsers },
    { label: "Refunds", icon: IconReceiptRefund },
    { label: "Files", icon: IconFileAnalytics },
  ],
};

interface SideBarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function SideBar({ activeTab, setActiveTab }: SideBarProps) {
  const [isOpen, setIsOpen] = useState(true);
  const { accountId, Logout } = useContext(WalletContext);

  return (
    <div className="relative ">
      <button
        className="fixed top-4 left-4 z-50 bg-gray-800 p-2 rounded-md text-white lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
      </button>

      <div
        className={`fixed top-0 left-0 h-screen w-64 border-r border-gray-300 bg-[#09090b] text-white p-5 flex flex-col transition-transform duration-300 ease-in-out z-40 
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0 lg:relative lg:w-64 overflow-y-auto`}
      >
        <div className="text-center font-semibold text-lg mb-4">@{accountId}</div>
        <hr className="border-gray-700 mb-4" />

        <div className="flex flex-col gap-2 flex-grow">
          {tabs.account.map((item) => (
            <button
              key={item.label}
              className={`flex items-center gap-2 p-3 rounded-md transition-colors 
                ${activeTab === item.label ? "bg-teal-600 text-white" : "hover:bg-gray-800"}`}
              onClick={() => setActiveTab(item.label)}
            >
              <item.icon size={20} />
              <span className={`${isOpen ? "block" : "hidden"} lg:block`}>
                {item.label}
              </span>
            </button>
          ))}
        </div>

        <div className="mt-auto z-[11000]">
          <button
            className="flex items-center gap-2 w-full p-3 rounded-md hover:bg-gray-800"
            onClick={Logout}
          >
            <IconSwitchHorizontal size={20} />
            <span className={`${isOpen ? "block" : "hidden"} lg:block`}>
              Change account
            </span>
          </button>
          <button
            className="flex items-center gap-2 w-full p-3 rounded-md hover:bg-red-600"
            onClick={Logout}
          >
            <IconLogout size={20} />
            <span className={`${isOpen ? "block" : "hidden"} lg:block`}>
              Logout
            </span>
          </button>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </div>
  );
}
