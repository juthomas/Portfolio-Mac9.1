'use client';

import { Flex, Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useMediaQuery } from '@mantine/hooks';
import classes from './LoadingScreen.module.css';

export function LoadingScreen() {
  const [active, setActive] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setActive(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const isMobile = useMediaQuery('(max-width: 30em)');

  //   if (!active) return null;

  return (
    <Flex
      align="center"
      justify="center"
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
          style={{ backgroundColor: 'white', height: 210, border: '2px solid black' }}
        >
          <Image
            alt="macImage"
            src="/mac_logo_purple.png"
            height={130}
            width={150}
            priority
            style={{ objectFit: 'contain', imageRendering: 'pixelated' }}
          />
          <Text fz={20}>Julien Thomas</Text>
        </Flex>

        <Flex direction="column" align="center" justify="center" style={{ height: 40 }}>
          <Text>Starting Up...</Text>
          <div className={classes.loadingBar} style={{ position: 'relative' }}>
            <div className={classes.loadingBarInner} />
          </div>
        </Flex>
      </Flex>
    </Flex>
  );
}
