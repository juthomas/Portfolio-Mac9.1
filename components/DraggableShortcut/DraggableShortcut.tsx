import Image from 'next/image';
import { useDraggable } from '@dnd-kit/core';
import { Box } from '@mantine/core';
import folderIcon from '@/assets/folder_toolbox.png';

export default function DraggableShortcut({
  position = { x: 30, y: 0 },
  windowId,
  openWindow,
  id,
}: {
  position?: { x: number; y: number };
  windowId?: string;
  id: string;
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
      style={{
        height: 100,
        width: 100,
        backgroundColor: 'red',
        position: 'absolute',
        top: position.y,
        left: position.x,
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
      }}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
    >
      <Image alt="Shortcut Image" src={folderIcon} />
    </Box>
  );
}
