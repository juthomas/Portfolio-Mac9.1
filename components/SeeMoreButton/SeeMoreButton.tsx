import { Button, Text } from '@mantine/core';
import Image from 'next/image';
import classes from './SeeMoreButton.module.css';
import crossIcon from '@/assets/cross.png';

export function SeeMoreButton() {
  return (
    <Button
      leftSection={
        <Image style={{ imageRendering: 'pixelated' }} src={crossIcon} alt="crossIcon" />
      }
      px="xs"
      className={classes.seeMoreButton}
    >
      <Text>See More</Text>
    </Button>
  );
}
