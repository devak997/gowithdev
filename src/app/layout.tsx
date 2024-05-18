import "@mantine/core/styles.css";
import "@mantine/tiptap/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/dropzone/styles.css";

import {
  AppShell,
  AppShellHeader,
  AppShellMain,
  ColorSchemeScript,
  MantineProvider,
} from "@mantine/core";
import AppHeader from "@/components/app-header";
import { Notifications } from "@mantine/notifications";
import AuthProvider from "@/context/AuthContext";
import { isAuthenticated } from "@/lib/session";

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default async function RootLayout({ children }: RootLayoutProps) {
  const authenticated = await isAuthenticated()
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript defaultColorScheme="auto" />
      </head>
      <body>
        <MantineProvider defaultColorScheme="auto">
          <AuthProvider authenticated={authenticated}>
            <Notifications />
            <AppShell header={{ height: 56 }}>
              <AppShellHeader>
                <AppHeader />
              </AppShellHeader>
              <AppShellMain>{children}</AppShellMain>
            </AppShell>
          </AuthProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
