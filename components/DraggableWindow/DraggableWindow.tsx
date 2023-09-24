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
import useWindowDimensions from '@/hooks/useWindowDImensions';

export function DraggableWindow({
  id = 'default',
  focused = false,
  focusing,
  deleting,
  children,
  height = 400,
  width = 600,
}: {
  id?: string;
  focused?: boolean;
  height?: number;
  width?: number;
  focusing: () => void;
  deleting: () => void;
  children?: React.ReactNode;
}) {
  const [{ x, y }, setCoordinates] = useState<Coordinates>({ x: 0, y: 0 });

  const { height: windowHeight, width: windowWidth } = useWindowDimensions();
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
        setCoordinates(() => ({
          x:
            x + delta.x + width > windowWidth
              ? windowWidth - width
              : x + delta.x < 0
              ? 0
              : x + delta.x,

          // y: y + delta.y,
          y:
            y + delta.y + height > windowHeight
              ? windowHeight - height
              : y + delta.y < 30
              ? 30
              : y + delta.y,
        }));
      }}
    >
      <DraggableElement
        top={y}
        left={x}
        height={height}
        width={width}
        focused={focused}
        deleting={deleting}
        focusing={focusing}
      >
        {children}
      </DraggableElement>
    </DndContext>
  );
}
