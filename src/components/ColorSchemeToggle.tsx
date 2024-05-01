"use client";

import { ActionIcon, useMantineColorScheme } from "@mantine/core";
import dynamic from "next/dynamic";

const IconMoonStars = dynamic(
  async () => {
    const _module = await import("@tabler/icons-react");
    return _module.IconMoonStars;
  },
  { ssr: false },
);

const IconSun = dynamic(
  async () => {
    const _module = await import("@tabler/icons-react");
    return _module.IconSun;
  },
  { ssr: false },
);

export function ColorSchemeToggle() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <ActionIcon variant="light" onClick={() => toggleColorScheme()}>
      {colorScheme === "dark" ? (
        <IconSun size={16} />
      ) : (
        <IconMoonStars size={16} />
      )}
    </ActionIcon>
  );
}
