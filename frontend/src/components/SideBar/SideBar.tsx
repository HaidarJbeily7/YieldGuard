import { useState, useContext } from "react";
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
  IconSettings,
  IconShoppingCart,
  IconSwitchHorizontal,
  IconUsers,
} from "@tabler/icons-react";
import { Text, SegmentedControl } from "@mantine/core";
import classes from "./SideBar.module.css";
import { WalletContext } from "../../context/WalletContext";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import { IconProps, Icon } from "@tabler/icons-react";

const tabs: Record<
  string,
  {
    link: string;
    label: string;
    icon: ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>;
  }[]
> = {
  account: [
    { link: "", label: "Your Activities", icon: IconFingerprint },
    { link: "", label: "Report Activites", icon: IconAlertHexagon },
    { link: "", label: "Check Activities", icon: IconShieldSearch },
    { link: "", label: "Balances", icon: IconReceipt2 },
    { link: "", label: "Other Settings", icon: IconSettings },
  ],
  general: [
    // To Be Used Later
    { link: "", label: "Orders", icon: IconShoppingCart },
    { link: "", label: "Receipts", icon: IconLicense },
    { link: "", label: "Reviews", icon: IconMessage2 },
    { link: "", label: "Messages", icon: IconMessages },
    { link: "", label: "Customers", icon: IconUsers },
    { link: "", label: "Refunds", icon: IconReceiptRefund },
    { link: "", label: "Files", icon: IconFileAnalytics },
  ],
};

export function SideBar() {
  const [section, setSection] = useState<string>("account");
  const [active, setActive] = useState("Billing");
  const { accountId, Logout } = useContext(WalletContext);

  const handleDisconnect = () => {
    Logout();
  };

  const links = tabs[section]?.map((item) => (
    <a
      className={classes.link}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

  return (
    <nav className={classes.navbar}>
      <div>
        <Text
          fw={500}
          size="sm"
          className={classes.title}
          c="dimmed"
          ta="center"
        >
          {accountId}
        </Text>

        <SegmentedControl
          hidden={true}
          value={section}
          onChange={(value: string) => setSection(value)}
          transitionTimingFunction="ease"
          fullWidth
          data={[
            { label: "Account", value: "account" },
            { label: "System", value: "general" },
          ]}
        />
      </div>

      <div className={classes.navbarMain}>{links}</div>

      <div className={classes.footer}>
        <a className={classes.link} onClick={handleDisconnect}>
          <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
          <span>Change account</span>
        </a>

        <a className={classes.link} onClick={handleDisconnect}>
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>
      </div>
    </nav>
  );
}
