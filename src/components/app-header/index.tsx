import { Button, Container, Flex, Group, Text } from "@mantine/core";
import Link from "next/link";

import { ColorSchemeToggle } from "../color-scheme-toggle";

const AppHeader = () => {
  return (
    <Container fluid>
      <Flex align={"center"} h={56} justify={"space-between"}>
        <Button component={Link} href="/" variant="transparent">
          <Text ff="monospace" fw={600} fz="xl">
            gowithdev
          </Text>
        </Button>
        <Group>
          <ColorSchemeToggle />
        </Group>
      </Flex>
    </Container>
  );
};

export default AppHeader;
