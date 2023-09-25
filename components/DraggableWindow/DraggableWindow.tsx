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
  focusing,
  deleting,
  children,
  maximized = false,
  setMaximized,
  windowTitle,
  windowIcon,
  focused,
  coordinates = { x: 0, y: 30 },
  height = 400,
  width = 600,
}: {
  id?: string;
  coordinates?: { x: number; y: number };
  height?: number;
  width?: number;
  focused?: boolean;
  maximized?: boolean;
  windowTitle?: React.ReactNode;
  windowIcon?: string;
  focusing: () => void;
  deleting: () => void;
  setMaximized: () => void;
  children?: React.ReactNode;
}) {
  const [{ x, y }, setCoordinates] = useState<Coordinates>(coordinates);

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
        windowTitle={windowTitle}
        top={maximized ? 30 : y}
        left={maximized ? 0 : x}
        height={maximized ? windowHeight - 30 : height}
        width={maximized ? windowWidth : width}
        windowIcon={windowIcon}
        maximized={maximized}
        focused={focused}
        setMaximized={setMaximized}
        deleting={deleting}
        focusing={focusing}
      >
        {children}
      </DraggableElement>
    </DndContext>
  );
}
