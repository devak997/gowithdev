import { isAuthenticated } from "@/lib/session";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

async function LoginLayout({ children }: PropsWithChildren) {
  const authenticated = await isAuthenticated();
  if (authenticated) {
    redirect("/");
  }

  return children;
}

export default LoginLayout;
