import {
  Box,
  Burger,
  Divider,
  Drawer,
  Group,
  Image,
  ScrollArea,
  Text,
  // useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import Logo from "/img/logo.svg";
import classes from "./Header.module.css";
import { ConnectWalletButton } from "../ConnectWalletButton/ConnectWalletButton";

export function Header() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  // const theme = useMantineTheme();

  return (
    <Box>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <Group gap={4}>
            <Image src={Logo} h={40} />
            <Text size="xl">YieldGuard</Text>
          </Group>
          <Group h="100%" gap={0} visibleFrom="sm">
            <a href="/" className={classes.link}>
              Home
            </a>
            <a href="#features" className={classes.link}>
              Features
            </a>
          </Group>

          <Group visibleFrom="sm" justify="center">
            {/* <Divider orientation="vertical" /> */}
            <ConnectWalletButton size="sm" />
          </Group>

          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            hiddenFrom="sm"
          />
        </Group>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="sm"
        zIndex={1000000}
        styles={{
          header: { backgroundColor: "#09090b" },
          body: { backgroundColor: "#09090b" },
        }}
      >
        <ScrollArea h="calc(100vh - 80px" mx="-md" bg={"#09090b"}>
          <Divider my="sm" c={"#41d7cb"} bg={"#41d7cb"} />
          <a href="#" className={classes.link}>
            Home
          </a>{" "}
          <a href="#featires" className={classes.link}>
            Features
          </a>
          <Divider my="sm" />
          <Group justify="space-between" pb="xl" px="md">
            <ConnectWalletButton size="xs" />
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
