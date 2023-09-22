'use client';

import {
  DndContext,
  useDraggable,
  useSensor,
  MouseSensor,
  TouchSensor,
  KeyboardSensor,
  PointerActivationConstraint,
  Modifiers,
  useSensors,
} from '@dnd-kit/core';
import { useState } from 'react';
import type { Coordinates } from '@dnd-kit/utilities';
import { DraggableWindow } from '../DraggableWindow/DraggableWindow';

// import { useState } from 'react';
// import classes from './DraggableWindow.module.css';

export function DraggableContext({ children }: { children: JSX.Element }) {
  const [{ x, y }, setCoordinates] = useState<Coordinates>({ x: 0, y: 0 });

  const mouseSensor = useSensor(MouseSensor, {});
  const touchSensor = useSensor(TouchSensor, {});
  const keyboardSensor = useSensor(KeyboardSensor, {});
  const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor);

  return (
    <DndContext
      sensors={sensors}
      // onDragMove={({ delta }) => {
      //   setCoordinates(() => ({ x: x + delta.x, y: y + delta.y }));
      //   // setCoordinates(() => ({ x: x + delta.x, y: y + delta.y }));
      // }}
      onDragEnd={({ delta }) => {
        setCoordinates(() => ({ x: x + delta.x, y: y + delta.y }));
      }}
    >
      <DraggableWindow top={y} left={x} />
    </DndContext>
  );
}
