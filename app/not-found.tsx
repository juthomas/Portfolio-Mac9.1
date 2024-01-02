import { Box, Stack, Text } from '@mantine/core';
import Image from 'next/image';

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
      <Stack align="center" gap={3}>
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
        <Text px={10} style={{ backgroundColor: 'white' }}>Not Found</Text>
      </Stack>
    </Box>
  );
}
