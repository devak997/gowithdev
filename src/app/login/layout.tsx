import { isAuthenticated } from "@/lib/session";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

const LoginLayout = async ({ children }: PropsWithChildren) => {
  const authenticated = await isAuthenticated();
  if (authenticated) {
    redirect("/");
  }

  return children;
};

export default LoginLayout;
