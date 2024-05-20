"use client";
import { useAuth } from "@/context/auth-context";
import { Avatar } from "@mantine/core";

const UserAvatar = () => {
  const { user } = useAuth();

  if (!user) {
    return;
  }

  return (
    <Avatar alt={user.name} radius="xl" size="md" src={user.avatar}>
      {`${user.name[0]}${user.name[1]}`.toUpperCase()}
    </Avatar>
  );
};

export default UserAvatar;
