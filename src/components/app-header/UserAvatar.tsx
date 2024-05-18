"use client";
import { useAuth } from "@/context/AuthContext";
import { Avatar } from "@mantine/core";

const UserAvatar = () => {
  const { user } = useAuth();

  console.log(user);

  return (
    <Avatar src={user?.avatar} alt={user?.name} radius="xl" size="md">
      {`${user?.name[0]}${user?.name[1]}`.toUpperCase()}
    </Avatar>
  );
};

export default UserAvatar;
