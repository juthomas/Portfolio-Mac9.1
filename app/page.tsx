'use client';

import { Box } from '@mantine/core';
import { Header } from '@/components/Header/Header';
import WindowsManager from '@/components/WindowsManager/WindowsManager';
import Footer from '@/components/Footer/Footer';
import { LoadingScreen } from '@/components/LoadingScreen/LoadingScreen';
import WindowsManagerProvider from '@/components/WindowsManager/WindowManagerProvider';

export default function HomePage() {
  return (
    <WindowsManagerProvider>
      <Box
        style={{
          height: '100%',
          width: '100%',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <LoadingScreen />
        <Header />
        <WindowsManager />
        <Footer />
      </Box>
    </WindowsManagerProvider>
  );
}
