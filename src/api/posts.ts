import { Post } from "@/types";

import { getApiUrl } from "./utils";

export const getPosts = async (): Promise<Post[]> => {
  const response = await fetch(getApiUrl("/api/posts"));
  return response.json() as Promise<Post[]>;
};

export const createPost = async (post: Omit<Post, "id" | "updated_at">) => {
  const response = await fetch(getApiUrl("/api/admin/posts"), {
    body: JSON.stringify(post),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return response.json();
};

export const updatePost = async (
  id: string,
  post: Omit<Post, "id" | "updated_at">
) => {
  const response = await fetch(getApiUrl(`/api/admin/posts/${id}`), {
    body: JSON.stringify(post),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return response.json();
};

export const getPost = async (id: string): Promise<Post> => {
  const response = await fetch(getApiUrl(`/api/posts/${id}`));

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return response.json() as Promise<Post>;
};
