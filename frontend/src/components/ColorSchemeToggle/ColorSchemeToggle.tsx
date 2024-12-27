import {
  Group,
  Switch,
  useMantineColorScheme,
  useMantineTheme,
  rem,
} from "@mantine/core";
import { IconSun, IconMoon } from "@tabler/icons-react";

export function ColorSchemeToggle() {
  const theme = useMantineTheme();

  const { colorScheme, setColorScheme } = useMantineColorScheme();

  const sunIcon = (
    <IconSun
      style={{ width: rem(16), height: rem(16) }}
      stroke={2.5}
      color={theme.colors.yellow[4]}
    />
  );

  const moonIcon = (
    <IconMoon
      style={{ width: rem(16), height: rem(16) }}
      stroke={2.5}
      color={theme.colors.blue[6]}
    />
  );

  return (
    <Group justify="center">
      <Switch
        checked={colorScheme === "dark"}
        onChange={(event) =>
          setColorScheme(event.currentTarget.checked ? "dark" : "light")
        }
        size="md"
        color="dark.4"
        onLabel={sunIcon}
        offLabel={moonIcon}
      />
    </Group>
  );
}
