"use client";

import { Stack, TextInput, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconMail, IconPassword } from "@tabler/icons-react";
import React, { useState } from "react";
import { LoginData } from "./types";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";

const LoginForm: React.FC = () => {
  const router = useRouter();
  const form = useForm<LoginData>();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formValue: LoginData) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formValue),
          credentials: "include",
        }
      );

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
    } catch (error) {
      console.error(error);
      notifications.show({
        title: "Login failed",
        message: "Something went wrong",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
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
        <Button loading={loading} type="submit">
          Login
        </Button>
      </Stack>
    </form>
  );
};

export default LoginForm;
