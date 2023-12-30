import { Box } from '@mantine/core';
import { Welcome } from '../components/Welcome/Welcome';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { Header } from '@/components/Header/Header';
import WindowsManager from '@/components/WindowsManager/WindowsManager';
import Footer from '@/components/Footer/Footer';
import { LoadingScreen } from '@/components/LoadingScreen/LoadingScreen';

export default function HomePage() {
  return (
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
      {/* <Welcome /> */}
      {/* <ColorSchemeToggle /> */}
      <Footer />
    </Box>
  );
}
