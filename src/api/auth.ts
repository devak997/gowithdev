import { getApiUrl } from "./utils";

export const login = async (email: string, password: string): Promise<void> => {
  const response = await fetch(getApiUrl("/api/login"), {
    body: JSON.stringify({ email, password }),
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }
};
