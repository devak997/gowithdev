import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import "server-only";

export const verifyToken = async () => {
  const token = cookies().get("token")?.value;
  if (!token) {
    throw new Error("No token found");
  }

  const secretArray = new TextEncoder().encode(
    process.env.JWT_SECRET as string
  );

  return jwtVerify(token, secretArray);
};

export const isAuthenticated = async () => {
  try {
    await verifyToken();
    return true;
  } catch {
    return false;
  }
};
