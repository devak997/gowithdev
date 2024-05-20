import { isAuthenticated } from "@/lib/session";
import { Button, Container, Flex, Group, Text } from "@mantine/core";
import Link from "next/link";

import { ColorSchemeToggle } from "../color-scheme-toggle";
import UserAvatar from "./user-avatar";

const AppHeader = async () => {
  const authenticated = await isAuthenticated();

  const getAuthSection = () => {
    if (authenticated) {
      return <UserAvatar />;
    }

    return (
      <Button component={Link} href="/login" size="xs">
        Sign In
      </Button>
    );
  };

  return (
    <Container fluid>
      <Flex align={"center"} h={56} justify={"space-between"}>
        <Button component={Link} href="/" variant="transparent">
          <Text ff="monospace" fw={600} fz="xl">
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
};

export default AppHeader;
