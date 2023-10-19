import { Box, Flex, List, Space, Text, Title } from '@mantine/core';

import { Carousel } from '@/components/Carousel/Carousel';
import mdma from '@/assets/carousels/mdma.webp';
import iota from '@/assets/carousels/holy.webp';

export default function ProjectsWindow(): JSX.Element {
  const slides = [
    { image: mdma, alt: 'mdma image' },
    { image: iota, alt: 'iota image' },
  ];

  return (
    <Flex direction="column" align="center" h="100%">
      <Flex direction="column" align="center" h="100%" w="100%" pt="xl" maw="650px">
        <Carousel slides={slides} options={{ loop: true }} />
      </Flex>
    </Flex>
  );
}
