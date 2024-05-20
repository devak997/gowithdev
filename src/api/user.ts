import { User } from "@/types";

import { getApiUrl } from "./utils";

export const getCurrentUser = async (): Promise<User> => {
  const response = await fetch(getApiUrl("/api/me"));
  return response.json() as Promise<User>;
};
