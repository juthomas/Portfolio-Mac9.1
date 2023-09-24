'use client';

import Image from 'next/image';
import { useDraggable } from '@dnd-kit/core';
import { Box, Group } from '@mantine/core';
import { useState } from 'react';
import fileIcon from '@/assets/file_icon.svg';
import classes from './DraggableElement.module.css';

export function DraggableElement({
  top,
  left,
  children,
  focused,
  focusing,
  deleting,
  height = 400,
  width = 600,
  windowIcon = fileIcon,
  windowName = 'Portfolio',
}: {
  top: number;
  left: number;
  height?: number;
  width?: number;
  children?: React.ReactNode;
  focused: boolean;
  windowIcon?: string;
  windowName?: React.ReactNode;
  focusing: () => void;
  deleting: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: 'default',
    disabled: false,
  });

  const [minimized, setMinimized] = useState(false);

  return (
    <Box
      className={classes.windowOuter}
      onClick={focusing}
      style={{
        height: minimized ? undefined : height,
        paddingBottom: minimized ? 0 : undefined,
        zIndex: focused ? 2 : 1,
        width,
        top,
        left,
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
      }}
    >
      <Box className={classes.windowBar}>
        <Box
          className={classes.button}
          onClick={(event) => {
            event.stopPropagation();
            deleting();
          }}
        />
        <Box className={classes.dragHandle} ref={setNodeRef} {...listeners} {...attributes}>
          <Box className={classes.stripes}>
            <Box className={classes.stripe} />
            <Box className={classes.stripe} />
            <Box className={classes.stripe} />
            <Box className={classes.stripe} />
          </Box>
          <Group gap={5} px={10}>
            <Image
              src={windowIcon}
              alt="logo"
              width={0}
              height={0}
              style={{ width: 'auto', height: '70%' }}
            />
            {windowName}
          </Group>
          <Box className={classes.stripes}>
            <Box className={classes.stripe} />
            <Box className={classes.stripe} />
            <Box className={classes.stripe} />
            <Box className={classes.stripe} />
          </Box>
        </Box>
        <Group gap={3}>
          <Box className={classes.button}>
            <Box className={classes.maximizeButtonBox} />
          </Box>
          <Box
            style={{ display: 'flex', alignItems: 'center' }}
            className={classes.button}
            onClick={() => {
              setMinimized((value) => !value);
            }}
          >
            <Box className={classes.minimizeButtonBox} />
          </Box>
        </Group>
      </Box>

      {!minimized && <Box className={classes.windowInner}>{children}</Box>}
    </Box>
  );
}
