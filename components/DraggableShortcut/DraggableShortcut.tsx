import Image from 'next/image';
import { useDraggable } from '@dnd-kit/core';
import { Box, Text } from '@mantine/core';
import folderIcon from '@/assets/folder.png';
import classes from './DraggableShortcut.module.css';

export default function DraggableShortcut({
  position = { x: 30, y: 0 },
  windowId,
  openWindow,
  text,
  textHighlight = true,
  id,
}: {
  position?: { x: number; y: number };
  windowId?: string;
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

        windowId && openWindow(windowId);
      }}
      className={classes.draggableShortcut}
      style={{
        top: position.y,
        left: position.x,
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
      }}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
    >
      <Image alt="Shortcut Image" src={folderIcon} />
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
