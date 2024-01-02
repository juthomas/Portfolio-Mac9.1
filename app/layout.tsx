import '@mantine/core/styles.css';
import './fonts.css';
import './layout.css';
import React from 'react';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { theme } from '../theme';
import '@mantine/notifications/styles.css';
import notificationClasses from '@/styles/notifications.module.css';

export const metadata = {
  title: 'Julien Thomas',
  description: 'Welcome on my portfolio !',
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <link href="https://fonts.googleapis.com/css2?family=VT323&display=swap" rel="stylesheet" />
        
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <MantineProvider theme={theme}>
          <Notifications
            classNames={{
              notification: notificationClasses.notification,
              root: notificationClasses.notificationsRoot,
            }}
            position="top-right"
          />

          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
