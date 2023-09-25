'use client';

import { useState } from 'react';
import { DndContext, useSensors, useSensor, PointerSensor } from '@dnd-kit/core';
import DraggableShortcut from '../DraggableShortcut/DraggableShortcut';

export default function Desktop({ openWindow }: { openWindow: (windowId: string) => void }) {
  const [shortcutsPositions, setShortcutPositions] = useState([
    { id: '1', position: { x: 0, y: 50 }, windowId: '1' },
    { id: '2', position: { x: 0, y: 30 }, windowId: '2' },
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  return (
    <DndContext
      sensors={sensors}
      id="Desktop"
      onDragEnd={({ delta, active }) => {
        const shortcutIndex = shortcutsPositions.findIndex((x) => x.id === active.id);
        shortcutsPositions[shortcutIndex].position = {
          x: shortcutsPositions[shortcutIndex].position.x + delta.x,
          y: shortcutsPositions[shortcutIndex].position.y + delta.y,
        };
        setShortcutPositions([...shortcutsPositions]);
      }}
    >
      {shortcutsPositions.map((elem) => (
        <DraggableShortcut key={elem.id} {...elem} openWindow={openWindow} />
      ))}
    </DndContext>
  );
}
