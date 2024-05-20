export const API_ENDPOINT = process.env.NEXT_PUBLIC_API_URL as string;

export const getApiUrl = (path: string): string => {
  return `${API_ENDPOINT}${path}`;
};