import { Box, Flex, SimpleGrid } from '@mantine/core';
import classes from './ImageLoading.module.css';

export default function ImageLoading() {
  return (
    <Flex h={64} w={64} justify="center" align="center" >
      <SimpleGrid
        h={32}
        w={32}
        cols={4}
        style={{ alignItems: 'center', justifyItems: 'center' }}
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
    </Flex>
  );
}
