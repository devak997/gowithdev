import { Post } from "@/types";

import { getApiUrl } from "./utils";

export const getPosts = async (): Promise<Post[]> => {
  const response = await fetch(getApiUrl("/api/posts"));
  return response.json() as Promise<Post[]>;
};

export const createPost = async (post: Omit<Post, "id" | "updated_at">) => {
  const response = await fetch(getApiUrl("/api/posts"), {
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
  const response = await fetch(getApiUrl(`/api/posts/${id}`), {
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
