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
  focusing,
  deleting,
  height = 400,
  width = 600,
  zIndex = 1,
  setMaximized,
  maximized,
  focused,
  windowIcon = fileIcon,
  windowTitle = 'Portfolio',
}: {
  top: number;
  left: number;
  height?: number;
  focused?: boolean;
  width?: number;
  zIndex?: number;
  children?: React.ReactNode;
  windowIcon?: string;
  windowTitle?: React.ReactNode;
  maximized?: boolean;
  setMaximized: () => void;
  focusing: () => void;
  deleting: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: 'default',
    disabled: maximized,
  });

  const [minimized, setMinimized] = useState(false);

  return (
    <Box
      className={classes.windowOuter}
      onClick={focusing}
      style={{
        backgroundColor: focused ? undefined : '#bcbcbc',
        height: minimized ? undefined : height,
        paddingBottom: minimized ? 0 : undefined,
        zIndex,
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
        <Box
          style={{ cursor: maximized ? 'default' : undefined }}
          className={classes.dragHandle}
          ref={setNodeRef}
          {...listeners}
          {...attributes}
        >
          <Box className={classes.stripes}>
            {focused && (
              <>
                <Box className={classes.stripe} />
                <Box className={classes.stripe} />
                <Box className={classes.stripe} />
                <Box className={classes.stripe} />
              </>
            )}
          </Box>
          <Group gap={5} px={10}>
            <Image
              src={windowIcon}
              alt="logo"
              width={0}
              height={0}
              style={{ width: 'auto', height: '70%' }}
            />
            {windowTitle}
          </Group>
          <Box className={classes.stripes}>
            {focused && (
              <>
                <Box className={classes.stripe} />
                <Box className={classes.stripe} />
                <Box className={classes.stripe} />
                <Box className={classes.stripe} />
              </>
            )}
          </Box>
        </Box>
        <Group gap={3}>
          <Box
            className={classes.button}
            onClick={(event) => {
              if (minimized) setMinimized((value) => !value);
              event.stopPropagation();
              setMaximized();
            }}
          >
            <Box className={classes.maximizeButtonBox} />
          </Box>
          <Box
            style={{ display: 'flex', alignItems: 'center' }}
            className={classes.button}
            onClick={(event) => {
              setMinimized((value) => !value);
              event.stopPropagation();
              if (!minimized && maximized) setMaximized();
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
