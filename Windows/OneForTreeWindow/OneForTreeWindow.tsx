import { useContext, useEffect } from 'react';
import { Box, Button, Text } from '@mantine/core';
import Image from 'next/image';
import classes from './OneForTreeWindow.module.css';
import { WindowManagerContext } from '@/components/WindowsManager/WindowManagerProvider';
import crossIcon from '@/assets/cross.png';

export default function OneForTreeWindow(): JSX.Element {
  const windowContext = useContext(WindowManagerContext);

  const isOneForTree =
    windowContext?.windowsState &&
    windowContext.windowsState.find((item) => item.id === 'onefortree')?.zIndex ===
      windowContext.windowsState.length;

  useEffect(() => {
    console.log('rerender');
  }, []);

  return (
    <Box w="100%" h="100%" pos="relative">
      <Button
        pos="absolute"
        right={10}
        top={10}
        onClick={() => {
          window.open('https://onefortree.juthomas.fr/login', '_blank', 'noreferrer');
        }}
        leftSection={
          <Image style={{ imageRendering: 'pixelated' }} src={crossIcon} alt="crossIcon" />
        }
        px="xs"
        className={classes.seeMoreButton}
      >
        <Text>Open In New Tab</Text>
      </Button>
      <iframe
        key="test"
        title="OneForTree"
        height="100%"
        width="100%"
        style={{
          borderWidth: 0,
          pointerEvents: windowContext?.windowDragging || !isOneForTree ? 'none' : undefined,
        }}
        src="https://onefortree.juthomas.fr/login"
      />
    </Box>
  );
}
