'use client';

import { createTheme, MantineColorsTuple } from '@mantine/core';

const purple: MantineColorsTuple = [
  '#ebedff',
  '#d3d6fb',
  '#a4a9f5',
  '#7279f0',
  '#4951ec',
  '#2f37e9',
  '#232ae9',
  '#171fd0',
  '#0f1ab7',
  '#0116a4',
];

const macBlue: MantineColorsTuple = [
  '#f1f1ff',
  '#e2e2f1',
  '#c1c1da',
  '#9f9fc5',
  '#8282b2',
  '#6f6fa7',
  '#6666a2',
  '#56568e',
  '#4b4c80',
  '#404173',
];

export const theme = createTheme({
  /* Put your mantine theme override here */
  colors: {
    purple,
    macBlue,
  },
});
