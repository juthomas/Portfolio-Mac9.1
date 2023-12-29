'use client';

import {
  DndContext,
  useSensor,
  MouseSensor,
  TouchSensor,
  KeyboardSensor,
  useSensors,
} from '@dnd-kit/core';
import { useEffect, useState } from 'react';
import type { Coordinates } from '@dnd-kit/utilities';
import { DraggableElement } from '../DraggableElement/DraggableElement';
import useWindowDimensions, { WindowDimensions } from '@/hooks/useWindowDImensions';

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
  scrollBar = false,
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
  scrollBar?: boolean;
}) {
  const [{ x, y }, setCoordinates] = useState<Coordinates>(coordinates);

  const [windowSize, setWindowSize] = useState<Coordinates>({ x: width, y: height });

  const handleDimensionChange = ({ width: wWidth, height: wHeight }: WindowDimensions) => {
    setCoordinates((prev) => ({
      x: wWidth < width ? 0 : prev.x + width > wWidth ? wWidth - width : prev.x < 0 ? 0 : prev.x,
      y: wHeight < height + 30 ? 30 : prev.y + height > wHeight ? wHeight - height : prev.y,
    }));
  };

  const { height: windowHeight, width: windowWidth } = useWindowDimensions(handleDimensionChange);
  const mouseSensor = useSensor(MouseSensor, {});
  const touchSensor = useSensor(TouchSensor, {});
  const keyboardSensor = useSensor(KeyboardSensor, {});
  const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor);

  useEffect(() => {
    setCoordinates((prev) => ({
      x:
        windowWidth < width
          ? 0
          : prev.x + width > windowWidth
          ? windowWidth - width
          : prev.x < 0
          ? 0
          : prev.x,
      y:
        windowHeight < height + 30
          ? 30
          : prev.y + height > windowHeight
          ? windowHeight - height
          : prev.y,
    }));
  }, []);

  return (
    <DndContext
      id={id}
      sensors={sensors}
      onDragStart={focusing}
      onDragEnd={({ delta, active }) => {
        if (active.id === 'resize') {
          setWindowSize((prev) => ({ x: prev.x + delta.x, y: prev.y + delta.y }));
          return;
        }
        setCoordinates(() => ({
          x:
            x + delta.x + width > windowWidth
              ? windowWidth - width
              : x + delta.x < 0
              ? 0
              : x + delta.x,

          // y: y + delta.y,
          y:
            y + delta.y + (height > windowHeight - 30 ? windowHeight - 30 : height) > windowHeight
              ? windowHeight - (height > windowHeight - 30 ? windowHeight - 30 : height)
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
        height={
          maximized
            ? windowHeight - 30
            : windowSize.y > windowHeight - 30
            ? windowHeight - 30
            : windowSize.y
        }
        width={maximized ? windowWidth : windowSize.x}
        windowIcon={windowIcon}
        maximized={maximized}
        focused={focused}
        setMaximized={setMaximized}
        deleting={deleting}
        scrollBar={scrollBar}
        focusing={focusing}
      >
        {children}
      </DraggableElement>
    </DndContext>
  );
}
