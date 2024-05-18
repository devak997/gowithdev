import { Button, Container, Flex, Group, Text } from "@mantine/core";

import { ColorSchemeToggle } from "../ColorSchemeToggle";
import Link from "next/link";
import { isAuthenticated } from "@/lib/session";
import UserAvatar from "./UserAvatar";

async function AppHeader() {
  const authenticated = await isAuthenticated();

  const getAuthSection = () => {
    if (authenticated) {
      return <UserAvatar />;
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
        <Button variant="transparent" component={Link} href="/">
          <Text fz="xl" ff="monospace" fw={600}>
            Codejedi
          </Text>
        </Button>
        <Group>
          <ColorSchemeToggle />
          {getAuthSection()}
        </Group>
      </Flex>
    </Container>
  );
}

export default AppHeader;
