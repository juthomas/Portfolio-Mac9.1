import { Button, Text } from '@mantine/core';
import Image from 'next/image';
import classes from './OpenButton.module.css';
import crossIcon from '@/assets/cross.png';

export function OpenButton() {
  return (
    <Button
      // leftSection={
      //   <Image style={{ imageRendering: 'pixelated' }} src={crossIcon} alt="crossIcon" />
      // }
      px="xs"
      className={classes.OpenButton}
    >
      <Text>Open...</Text>
    </Button>
  );
}
