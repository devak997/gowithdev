import { Button, Container, Flex, Group, Text } from "@mantine/core";

import { ColorSchemeToggle } from "./ColorSchemeToggle";
import Link from "next/link";
import { isAuthenticated } from "@/lib/session";

async function AppHeader() {
  const authenticated = await isAuthenticated();

  const getAuthSection = () => {
    if (authenticated) {
      return (
        <Button size="xs" component={Link} href="/admin">
          Dashboard
        </Button>
      );
    }

    return (
      <Button size="xs" component={Link} href="/login">
        Sign In
      </Button>
    );
  };

  return (
    <Container fluid>
      <Flex justify={"space-between"} align={"center"} h={56}>
        <Text fz="xl" ff="monospace" fw={600}>
          Codejedi
        </Text>
        <Group>
          <ColorSchemeToggle />
          {getAuthSection()}
        </Group>
      </Flex>
    </Container>
  );
}

export default AppHeader;
