import AppHeader from "@/components/app-header";
import AuthProvider from "@/context/auth-context";
import { isAuthenticated } from "@/lib/session";
import {
  AppShell,
  AppShellHeader,
  AppShellMain,
  ColorSchemeScript,
  MantineProvider,
} from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/dropzone/styles.css";
import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";
import "@mantine/tiptap/styles.css";

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default async function RootLayout({ children }: RootLayoutProps) {
  const authenticated = await isAuthenticated();
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
