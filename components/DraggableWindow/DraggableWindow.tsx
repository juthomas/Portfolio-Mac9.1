'use client';

import { useDraggable } from '@dnd-kit/core';

import { Box } from '@mantine/core';

// import { useState } from 'react';
import classes from './DraggableWindow.module.css';

export function DraggableWindow({ top, left }: { top: number; left: number }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: 'test',
    disabled: false,
  });

  return (
    <Box
      className={classes.windowOuter}
      style={{
        height: 400,
        width: 600,
        // borderRadius: 666,
        // position: 'absolute',
        // backgroundColor: 'red',
        // border: '3px solid black',

        top,
        left,
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
      }}
    >
      <Box className={classes.dragHandle} ref={setNodeRef} {...listeners} {...attributes} />
      <Box className={classes.windowInner}>cccv</Box>
    </Box>
  );
}
