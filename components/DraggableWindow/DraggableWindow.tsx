'use client';

import {
  DndContext,
  useSensor,
  MouseSensor,
  TouchSensor,
  KeyboardSensor,
  useSensors,
} from '@dnd-kit/core';
import { useState } from 'react';
import type { Coordinates } from '@dnd-kit/utilities';
import { DraggableElement } from '../DraggableElement/DraggableElement';

export function DraggableWindow({
  id = 'default',
  focused = false,
  focusing,
  deleting,
  children,
}: {
  id?: string;
  focused?: boolean;
  focusing: () => void;
  deleting: () => void;
  children?: React.ReactNode;
}) {
  const [{ x, y }, setCoordinates] = useState<Coordinates>({ x: 0, y: 0 });

  const mouseSensor = useSensor(MouseSensor, {});
  const touchSensor = useSensor(TouchSensor, {});
  const keyboardSensor = useSensor(KeyboardSensor, {});
  const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor);

  return (
    <DndContext
      id={id}
      sensors={sensors}
      onDragStart={focusing}
      onDragEnd={({ delta }) => {
        setCoordinates(() => ({ x: x + delta.x, y: y + delta.y }));
      }}
    >
      <DraggableElement top={y} left={x} focused={focused} deleting={deleting} focusing={focusing}>
        {children}
      </DraggableElement>
    </DndContext>
  );
}
