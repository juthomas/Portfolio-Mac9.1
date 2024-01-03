import { Box, Stack, Text } from '@mantine/core';
import Image from 'next/image';
import classes from '@/styles/notFound.module.css';

export default function NotFound() {
  return (
    <Box
      style={{
        height: '100%',
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Stack align="center" gap={3} pos="relative">
        <Image
          alt="puzzle_piece"
          src="/bootingFolder.png"
          height={64}
          width={64}
          priority
          style={{
            zIndex: 40,
            objectFit: 'contain',
            imageRendering: 'pixelated',
          }}
        />
        <Text className={classes.text} pos="absolute" top={0} fz={45} style={{ zIndex: 50 }}>
          ?
        </Text>
        <Text px={10} style={{ backgroundColor: 'white' }}>
          Not Found
        </Text>
      </Stack>
    </Box>
  );
}
