"use client";

import { login } from "@/api/auth";
import { Button, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { IconMail, IconPassword } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

import { LoginData } from "./types";

const LoginForm: React.FC = () => {
  const router = useRouter();
  const form = useForm<LoginData>();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formValue: LoginData) => {
    try {
      setLoading(true);
      await login(formValue.email, formValue.password);
      notifications.show({
        color: "teal",
        message: "You are now logged in",
        title: "Login successful",
      });

      router.push("/");
    } catch (error) {
      console.error(error);
      notifications.show({
        color: "red",
        message: "Something went wrong",
        title: "Login failed",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={() => form.onSubmit(handleSubmit)}>
      <Stack gap="lg">
        <TextInput
          label="Email"
          leftSection={<IconMail size={16} />}
          placeholder="Enter your email"
          required
          type="email"
          {...form.getInputProps("email")}
        />
        <TextInput
          label="Password"
          leftSection={<IconPassword size={16} />}
          placeholder="Enter your password"
          required
          type="password"
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
