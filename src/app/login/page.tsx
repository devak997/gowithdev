"use client";
import { Button, Container, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { IconMail, IconPassword } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

type LoginData = {
  email: string;
  password: string;
};

function LoginPage() {
  const router = useRouter();
  const form = useForm<LoginData>();

  const handleSubmit = async (formValue: LoginData) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValue),
      credentials: "include",
    });

    if (!response.ok) {
      return notifications.show({
        title: "Login failed",
        message: "Something went wrong",
        color: "red",
      });
    }

    notifications.show({
      title: "Login successful",
      message: "You are now logged in",
      color: "teal",
    });

    router.push("/");
  };

  return (
    <Container size="xs" p="md">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap="lg">
          <TextInput
            label="Email"
            type="email"
            leftSection={<IconMail size={16} />}
            placeholder="Enter your email"
            required
            {...form.getInputProps("email")}
          />
          <TextInput
            label="Password"
            placeholder="Enter your password"
            type="password"
            leftSection={<IconPassword size={16} />}
            required
            {...form.getInputProps("password")}
          />
          <Button type="submit">Login</Button>
        </Stack>
      </form>
    </Container>
  );
}

export default LoginPage;
