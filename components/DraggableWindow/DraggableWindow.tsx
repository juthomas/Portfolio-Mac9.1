'use client';

import { useDraggable } from '@dnd-kit/core';

import { Box } from '@mantine/core';

// import { useState } from 'react';
// import classes from './DraggableWindow.module.css';

export function DraggableWindow({
  top,
  left,
  size = 40,
}: {
  top: number;
  left: number;
  size?: number;
}) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: 'test',
    disabled: false,
  });

  return (
    <Box
      style={{
        height: size,
        width: size,
        borderRadius: 666,
        position: 'absolute',
        // backgroundColor: 'red',
        border: `${size * 0.075}px solid black`,
        touchAction: 'none',
        cursor: 'pointer',
        top,
        left,
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
      }}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
    >
      cc
    </Box>
  );
}
