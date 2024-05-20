import { PreSignedResponse } from "@/types";

import { getApiUrl } from "./utils";

export const getPreSignedUrl = async (): Promise<PreSignedResponse> => {
  const response = await fetch(getApiUrl("/api/media/pre-signed-url"));

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return response.json() as Promise<PreSignedResponse>;
};

export const uploadFile = async (file: File, url: string) => {
  const response = await fetch(url, {
    body: file,
    method: "PUT",
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }
};
