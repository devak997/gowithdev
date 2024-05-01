import { Button, Container, Flex, Group, Text } from "@mantine/core";

import { ColorSchemeToggle } from "./ColorSchemeToggle";
import Link from "next/link";

async function AppHeader() {
  return (
    <Container fluid>
      <Flex justify={"space-between"} align={"center"} h={56}>
        <Text fz="xl" ff="monospace" fw={600}>
          Codejedi
        </Text>
        <Group>
          <ColorSchemeToggle />
          <Button size="xs" component={Link} href="/login">
            Sign In
          </Button>
        </Group>
      </Flex>
    </Container>
  );
}

export default AppHeader;
