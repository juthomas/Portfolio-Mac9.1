import { Box, Flex, SimpleGrid } from '@mantine/core';
import classes from './ImageLoading.module.css';

export default function ImageLoading() {
  return (
    <Box h={0} w={64} pos="relative">
      <SimpleGrid
        pos="absolute"
        h={32}
        w={32}
        cols={4}
        style={{ top: 16, left: 16, alignItems: 'center', justifyItems: 'center' }}
        spacing={0}
      >
        <Box className={classes.animatedSquare} h={8} w={8} />
        <Box className={classes.animatedSquare} h={8} w={8} />
        <Box className={classes.animatedSquare} h={8} w={8} />
        <Box className={classes.animatedSquare} h={8} w={8} />
        <Box className={classes.animatedSquare} h={8} w={8} />
        <Box h={8} w={8} />
        <Box h={8} w={8} />
        <Box className={classes.animatedSquare} h={8} w={8} />
        <Box className={classes.animatedSquare} h={8} w={8} />
        <Box h={8} w={8} />
        <Box h={8} w={8} />
        <Box className={classes.animatedSquare} h={8} w={8} />
        <Box className={classes.animatedSquare} h={8} w={8} />
        <Box className={classes.animatedSquare} h={8} w={8} />
        <Box className={classes.animatedSquare} h={8} w={8} />
        <Box className={classes.animatedSquare} h={8} w={8} />
      </SimpleGrid>
    </Box>
  );
}
