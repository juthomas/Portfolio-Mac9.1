'use client';

import { Flex, Stack, Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useMediaQuery } from '@mantine/hooks';
import classes from './LoadingScreen.module.css';
import mainClasses from '@/styles/theme.module.css';

export function LoadingScreen() {
  const [active, setActive] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setActive(false);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  const isMobile = useMediaQuery('(max-width: 30em)');

  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  if (!active) return null;

  return [
    <Flex
      key="first-item"
      align="center"
      justify="center"
      pb="10%"
      style={{
        position: 'absolute',
        zIndex: 31,
        inset: 0,
        backgroundColor: 'var(--mantine-color-macBlue-6)',
      }}
    >
      <Flex
        direction="column"
        className={classes.exterior}
        style={{ minWidth: 250, width: isMobile ? '90vw' : 400, height: 300 }}
      >
        <Flex
          direction="column"
          justify="space-evenly"
          align="center"
          className={mainClasses.retroBox}
          style={{ backgroundColor: 'white', height: 210 }}
        >
          <Image
            alt="macImage"
            src="/mac_logo_purple.png"
            height={130}
            width={150}
            priority
            style={{ objectFit: 'contain', imageRendering: 'pixelated' }}
          />
          <Stack align="center" justify="center" gap={0}>
            <Text lh={1} fz={24}>
              Portfolio
            </Text>
            <Text fz={20}>Julien Thomas</Text>
          </Stack>
        </Flex>

        <Flex direction="column" align="center" justify="center" style={{ height: 40 }}>
          <Text>Starting Up...</Text>
          <div className={classes.loadingBar} style={{ position: 'relative' }}>
            {windowWidth !== 0 && <div className={classes.loadingBarInner} />}
          </div>
        </Flex>
      </Flex>
    </Flex>,
    <Flex
      key="second-item"
      justify="space-between"
      px={14}
      pb={14}
      style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}
    >
      {Array.from({ length: (windowWidth - 28) / 80 }, (elem, index) => (
        <Image
          key={`puzzle-${index}`}
          alt="puzzle_piece"
          src={index % 6 > 3 ? '/puzzle_1.png' : '/puzzle_2.png'}
          height={64}
          width={64}
          className={classes.puzzle}
          style={{
            animationDelay: ` ${(index / ((windowWidth - 28) / 80)) * 3}s`,
            zIndex: 40,
            objectFit: 'contain',
            imageRendering: 'pixelated',
          }}
        />
      ))}
    </Flex>,
  ];
}
