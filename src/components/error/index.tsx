import { Title, Text, Button, Container, Group } from "@mantine/core";
import classes from "./styles.module.css";

function Error() {
  return (
    <Container
      className={classes.root}
      fluid
      h="calc(100dvh - var(--app-shell-header-height, 0px) - var(--app-shell-footer-height, 0px))"
    >
      <div className={classes.label}>500</div>
      <Title className={classes.title}>Something bad just happened...</Title>
      <Text size="lg" ta="center" className={classes.description}>
        Our servers could not handle your request. Don&apos;t worry, our
        development team was already notified. Try refreshing the page.
      </Text>
      <Group justify="center">
        <Button variant="white" size="md">
          Refresh the page
        </Button>
      </Group>
    </Container>
  );
}

export default Error;
