import { Button, Container, Group, Text, Title } from "@mantine/core";

import classes from "./styles.module.css";

const ErrorHandler: React.FC = () => {
  return (
    <Container
      className={classes.root}
      fluid
      h="calc(100dvh - var(--app-shell-header-height, 0px) - var(--app-shell-footer-height, 0px))"
    >
      <div className={classes.label}>500</div>
      <Title className={classes.title}>Something bad just happened...</Title>
      <Text className={classes.description} size="lg" ta="center">
        Our servers could not handle your request. Don&apos;t worry, our
        development team was already notified. Try refreshing the page.
      </Text>
      <Group justify="center">
        <Button size="md" variant="white">
          Refresh the page
        </Button>
      </Group>
    </Container>
  );
};

export default ErrorHandler;
