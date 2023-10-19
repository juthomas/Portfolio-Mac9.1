import Image from 'next/image';
import { EmblaOptionsType } from 'embla-carousel-react';
import { Box, Flex, List, Space, Text, Title } from '@mantine/core';
import DraggableShortcut from '@/components/DraggableShortcut/DraggableShortcut';
import juthomasPicture from '@/assets/juthomas-picture.png';
import classes from '@/styles/theme.module.css';
import { Carousel } from '@/components/Carousel/Carousel';

const OPTIONS: EmblaOptionsType = { loop: true };
const SLIDE_COUNT = 5;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

export default function ProjectsWindow(): JSX.Element {
  return (
    <Flex direction="column" align="center" h="100%">
      <Flex direction="column" align="center" h="100%" w="100%" pt="xl" maw="650px">
        <Carousel slides={SLIDES} options={OPTIONS} />
      </Flex>
    </Flex>
  );
}
