import Image from 'next/image';
import type { StaticImageData } from 'next/image';
import { useDraggable } from '@dnd-kit/core';
import { Box, Text } from '@mantine/core';
import { useContext } from 'react';
import folderIcon from '@/assets/icons/folder.png';
import classes from './DraggableShortcut.module.css';
// eslint-disable-next-line import/no-cycle
import { WindowManagerContext } from '../WindowsManager/WindowsManager';

export default function DraggableShortcut({
  position,
  windowId,
  // openWindow,
  text = 'Default Text',
  link,
  icon,
  id = '1',
  textHighlight = true,
  draggable = true,
}: {
  position?: { left?: number; top?: number; right?: number; bottom?: number };
  icon?: StaticImageData;
  windowId?: string;
  link?: string;
  id?: string;
  text?: string;
  textHighlight?: boolean;
  draggable?: boolean;
  // openWindow: (windowId: string) => void;
}) {
  const openWindow = useContext(WindowManagerContext);

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
    disabled: !draggable,
  });

  return (
    <Box
      onClick={(event) => {
        event.stopPropagation();
        link && window.open(link, '_blank', 'noreferrer');
        windowId && openWindow && openWindow(windowId);
      }}
      className={classes.draggableShortcut}
      style={{
        position: draggable ? 'absolute' : undefined,
        top: position?.top || undefined,
        left: position?.left || undefined,
        right: position?.right || undefined,
        bottom: position?.bottom || undefined,
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
      }}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
    >
      <Image
        style={{ imageRendering: 'pixelated', height: 64, width: 64 }}
        alt="Shortcut Image"
        src={icon || folderIcon}
      />
      <Text
        px={10}
        py={3}
        style={{
          textAlign: 'center',
          backgroundColor: textHighlight ? 'white' : undefined,
          lineHeight: 1.2,
          minWidth: 70,
          maxWidth: 140,
        }}
      >
        {text}
      </Text>
    </Box>
  );
}
