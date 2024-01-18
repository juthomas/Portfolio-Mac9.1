'use client';

import Image from 'next/image';
import { useDraggable } from '@dnd-kit/core';
import { Box, Group } from '@mantine/core';
import { useContext, useEffect, useRef, useState } from 'react';
import fileIcon from '@/assets/file_icon.svg';
import arrowUp from '@/assets/icons/arrowUp.svg';
import arrowDown from '@/assets/icons/arrowDown.svg';
import classes from './DraggableElement.module.css';
import { ScrollArea } from '../ScrollArea';
import { WindowManagerContext } from '../WindowsManager/WindowManagerProvider';

function useRepeater(action: () => void, delay: number) {
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  const start = () => {
    const id = setInterval(action, delay);
    setIntervalId(id);
  };

  const stop = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  };

  return [start, stop] as const;
}

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
  scrollBar = false,
  windowIcon = fileIcon,
  windowTitle = 'Portfolio',
  minimumWindowSize,
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
  scrollBar?: boolean;
  setMaximized: () => void;
  focusing: () => void;
  deleting: () => void;
  minimumWindowSize: { width: number; height: number };
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: 'default',
    disabled: maximized,
  });
  const windowContext = useContext(WindowManagerContext);

  const {
    attributes: nwseAttributes,
    listeners: nwseListeners,
    setNodeRef: nwseSetNodeRef,
    transform: nwseTransform,
    isDragging: nwseDragging,
  } = useDraggable({
    id: 'resize-nwse',
    disabled: maximized,
  });

  const {
    attributes: neswAttributes,
    listeners: neswListeners,
    setNodeRef: neswSetNodeRef,
    transform: neswTransform,
    isDragging: neswDragging,
  } = useDraggable({
    id: 'resize-nesw',
    disabled: maximized,
  });

  const {
    attributes: lewAttributes,
    listeners: lewListeners,
    setNodeRef: lewSetNodeRef,
    transform: lewTransform,
    isDragging: lewDragging,
  } = useDraggable({
    id: 'resize-lew',
    disabled: maximized,
  });

  const {
    attributes: rewAttributes,
    listeners: rewListeners,
    setNodeRef: rewSetNodeRef,
    transform: rewTransform,
    isDragging: rewDragging,
  } = useDraggable({
    id: 'resize-rew',
    disabled: maximized,
  });

  const {
    attributes: nsAttributes,
    listeners: nsListeners,
    setNodeRef: nsSetNodeRef,
    transform: nsTransform,
    isDragging: nsDragging,
  } = useDraggable({
    id: 'resize-ns',
    disabled: maximized,
  });

  const [minimized, setMinimized] = useState(false);
  const viewport = useRef<HTMLDivElement>(null);
  const mainContainer = useRef<HTMLDivElement>(null);
  const [scrollBarHidden, setScrollBarHidden] = useState(false);

  const [startRepeatingUp, stopRepeatingUp] = useRepeater(() => {
    viewport.current!.scrollBy({ top: -5 });
  }, 10);

  const [startRepeatingDown, stopRepeatingDown] = useRepeater(() => {
    viewport.current!.scrollBy({ top: 5 });
  }, 10);

  useEffect(() => {
    setScrollBarHidden(
      (viewport.current &&
        mainContainer.current &&
        viewport.current.scrollHeight + 2 < mainContainer.current.offsetHeight) ||
        false
    );
  }, [maximized, viewport.current?.scrollHeight, mainContainer.current?.offsetHeight]);

  const windowRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    windowContext?.setWindowDragging(
      isDragging || nwseDragging || neswDragging || lewDragging || rewDragging || nsDragging
    );
  }, [isDragging, nwseDragging, neswDragging, lewDragging, rewDragging, nsDragging]);

  return (
    <Box
      className={classes.windowOuter}
      onClick={(event) => {
        event.stopPropagation();

        console.log('Window focused wtff');
        focusing();
      }}
      ref={windowRef}
      style={{
        backgroundColor: focused ? undefined : '#bcbcbc',
        paddingBottom: minimized ? 0 : undefined,
        zIndex,
        height: minimized
          ? undefined
          : nwseTransform
          ? nwseTransform.y + height < minimumWindowSize.height
            ? minimumWindowSize.height
            : nwseTransform.y + height
          : neswTransform
          ? neswTransform.y + height < minimumWindowSize.height
            ? minimumWindowSize.height
            : neswTransform.y + height
          : nsTransform
          ? nsTransform.y + height < minimumWindowSize.height
            ? minimumWindowSize.height
            : nsTransform.y + height
          : height,
        width: nwseTransform
          ? nwseTransform.x + width < minimumWindowSize.width
            ? minimumWindowSize.width
            : nwseTransform.x + width
          : neswTransform
          ? -neswTransform.x + width < minimumWindowSize.width
            ? minimumWindowSize.width
            : -neswTransform.x + width
          : lewTransform
          ? -lewTransform.x + width < minimumWindowSize.width
            ? minimumWindowSize.width
            : -lewTransform.x + width
          : rewTransform
          ? rewTransform.x + width < minimumWindowSize.width
            ? minimumWindowSize.width
            : rewTransform.x + width
          : width,
        top,
        left,
        transform: transform
          ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
          : neswTransform
          ? `translate3d(${
              -neswTransform.x + width < minimumWindowSize.width
                ? width - minimumWindowSize.width
                : neswTransform.x
            }px, 0px, 0)`
          : lewTransform
          ? `translate3d(${
              -lewTransform.x + width < minimumWindowSize.width
                ? width - minimumWindowSize.width
                : lewTransform.x
            }px, 0px, 0)`
          : undefined,
      }}
    >
      <Box
        style={{
          position: 'absolute',
          height: 8,
          width: 8,
          bottom: 0,
          right: 0,
          zIndex: 1,
          cursor: 'nwse-resize',
        }}
        ref={nwseSetNodeRef}
        {...nwseListeners}
        {...nwseAttributes}
      />
      <Box
        style={{
          position: 'absolute',
          height: 8,
          width: 8,
          bottom: 0,
          left: 0,
          zIndex: 1,
          cursor: 'nesw-resize',
        }}
        ref={neswSetNodeRef}
        {...neswListeners}
        {...neswAttributes}
      />
      <Box
        style={{
          position: 'absolute',
          width: 8,
          top: 30,
          bottom: 8,
          left: 0,
          zIndex: 1,
          cursor: 'ew-resize',
        }}
        ref={lewSetNodeRef}
        {...lewListeners}
        {...lewAttributes}
      />
      <Box
        style={{
          position: 'absolute',
          width: 8,
          top: 30,
          bottom: 8,
          right: 0,
          zIndex: 1,
          cursor: 'ew-resize',
        }}
        ref={rewSetNodeRef}
        {...rewListeners}
        {...rewAttributes}
      />
      <Box
        style={{
          position: 'absolute',
          height: 8,
          bottom: 0,
          right: 8,
          left: 8,
          zIndex: 1,
          cursor: 'ns-resize',
        }}
        ref={nsSetNodeRef}
        {...nsListeners}
        {...nsAttributes}
      />

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
          <Group gap={5} px={10} wrap="nowrap">
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
              else focusing();
            }}
          >
            <Box className={classes.minimizeButtonBox} />
          </Box>
        </Group>
      </Box>

      {!minimized && (
        <Box className={classes.windowInner} ref={mainContainer}>
          {scrollBar ? (
            <ScrollArea
              classNames={{
                scrollbar: classes.scrollBar,
                corner: classes.corner,
                thumb: classes.scrollThumb,
                viewport: classes.viewportInner,
              }}
              styles={{
                scrollbar: {
                  visibility: scrollBarHidden ? 'collapse' : undefined, //hide
                },
                viewport: {
                  paddingRight: scrollBarHidden ? 0 : undefined, //hide
                  // '& > div:first-child': {
                  //   // Styles pour le premier enfant
                  //   color: 'red',
                  // },
                },
              }}
              style={{ position: 'relative' }}
              viewportRef={viewport}
              scrollbarSize={20}
              mah="100%"
              h="100%"
              type="always"
              offsetScrollbars="y"
            >
              <Box
                className={classes.scrollButtons}
                style={{
                  visibility: scrollBarHidden ? 'collapse' : undefined, //hide
                }}
              >
                <Box
                  className={classes.scrollButton}
                  onMouseDown={startRepeatingUp}
                  onMouseUp={stopRepeatingUp}
                  onMouseLeave={stopRepeatingUp}
                  pb={2}
                >
                  <Image src={arrowUp} alt="arrow Up" />
                </Box>
                <Box
                  className={classes.scrollButton}
                  onMouseDown={startRepeatingDown}
                  onMouseUp={stopRepeatingDown}
                  onMouseLeave={stopRepeatingDown}
                  pt={2}
                >
                  <Image src={arrowDown} alt="arrow Down" />
                </Box>
              </Box>
              {children}
            </ScrollArea>
          ) : (
            <Box h="100%" style={{ overflow: 'hidden' }}>
              {children}
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
}
