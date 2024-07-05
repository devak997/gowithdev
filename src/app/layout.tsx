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
import "@mantine/code-highlight/styles.css";
import Script from "next/script";

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default async function RootLayout({ children }: RootLayoutProps) {
  const authenticated = await isAuthenticated();
  return (
    <html lang="en">
      <head>
        <link href="/favicon.ico" rel="icon" sizes="any" />
        <ColorSchemeScript defaultColorScheme="auto" />
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-E849SJSMLD"
        ></Script>
        <Script id="ga-tag">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-E849SJSMLD');`}
        </Script>
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
