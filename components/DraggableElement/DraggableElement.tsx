'use client';

import { useDraggable } from '@dnd-kit/core';
import { Box } from '@mantine/core';
import classes from './DraggableElement.module.css';

export function DraggableElement({
  top,
  left,
  children,
}: {
  top: number;
  left: number;
  children?: React.ReactNode;
}) {
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
        top,
        left,
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
      }}
    >
      <Box className={classes.dragHandle} ref={setNodeRef} {...listeners} {...attributes} />
      <Box className={classes.windowInner}>{children}</Box>
    </Box>
  );
}
