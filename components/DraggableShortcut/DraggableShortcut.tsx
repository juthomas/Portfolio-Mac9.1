import Image from 'next/image';
import type { StaticImageData } from 'next/image';
import { useDraggable } from '@dnd-kit/core';
import { Box, Text } from '@mantine/core';
import folderIcon from '@/assets/folder.png';
import classes from './DraggableShortcut.module.css';

export default function DraggableShortcut({
  position,
  windowId,
  openWindow,
  text,
  link,
  icon,
  textHighlight = true,
  id,
}: {
  position?: { left?: number; top?: number; right?: number; bottom?: number };
  icon?: StaticImageData;
  windowId?: string;
  link?: string;
  id: string;
  text?: string;
  textHighlight?: boolean;
  openWindow: (windowId: string) => void;
}) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
    disabled: false,
  });

  return (
    <Box
      onClick={(event) => {
        event.stopPropagation();
        link && window.open(link, '_blank', 'noreferrer');
        windowId && openWindow(windowId);
      }}
      className={classes.draggableShortcut}
      style={{
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
      <Image alt="Shortcut Image" src={icon || folderIcon} />
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
