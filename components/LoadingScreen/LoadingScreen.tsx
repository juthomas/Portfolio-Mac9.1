'use client';

import { Flex } from '@mantine/core';
import { useEffect, useState } from 'react';
import classes from './LoadingScreen.module.css';
export function LoadingScreen() {
  const [active, setActive] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setActive(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

    if (!active) return null;

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
      <Flex direction={'column'} className={classes.exterior} style={{ width: 400, height: 300 }}>
        <div style={{ backgroundColor: 'white', flex: 1 }}></div>
        <Flex
          direction={'column'}
          align={'center'}
          justify={'center'}
          style={{ backgroundColor: 'red', height: 40 }}
        >
          <div style={{ height: 10, width: 200, backgroundColor: 'blue', position: 'relative' }}>
            <div
			className={classes.loadingBar}
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                backgroundColor: 'black',
                width: 100,
              }}
            ></div>
          </div>
        </Flex>
      </Flex>
    </Flex>
  );
}
