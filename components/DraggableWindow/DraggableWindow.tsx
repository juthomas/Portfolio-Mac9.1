'use client';

import {
  DndContext,
  useSensor,
  MouseSensor,
  TouchSensor,
  KeyboardSensor,
  useSensors,
} from '@dnd-kit/core';
import { useEffect, useRef, useState } from 'react';
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
  zIndex = 1,
  scrollBar = false,
  minimumWindowSize = { width: 400, height: 300 },
}: {
  id?: string;
  coordinates?: { x: number; y: number };
  height?: number;
  width?: number;
  zIndex?: number;
  focused?: boolean;
  maximized?: boolean;
  windowTitle?: React.ReactNode;
  windowIcon?: string;
  focusing: () => void;
  deleting: () => void;
  setMaximized: () => void;
  children?: React.ReactNode;
  scrollBar?: boolean;
  minimumWindowSize?: { width: number; height: number };
}) {
  const [{ x, y }, setCoordinates] = useState<Coordinates>(coordinates);

  const [windowSize, setWindowSize] = useState<Coordinates>({ x: width, y: height });

  const windowSizeRef = useRef(windowSize);
  useEffect(() => {
    windowSizeRef.current = windowSize;
  }, [windowSize]);

  const handleDimensionChange = ({ width: wWidth, height: wHeight }: WindowDimensions) => {
    setCoordinates((prev) => ({
      x:
        wWidth < windowSizeRef.current.x
          ? 0
          : prev.x + windowSizeRef.current.x > wWidth
          ? wWidth - windowSizeRef.current.x
          : prev.x < 0
          ? 0
          : prev.x,
      y:
        wHeight < windowSizeRef.current.y + 30
          ? 30
          : prev.y + windowSizeRef.current.y > wHeight
          ? wHeight - windowSizeRef.current.y
          : prev.y,
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
        windowWidth < windowSize.x
          ? 0
          : prev.x + windowSize.x > windowWidth
          ? windowWidth - windowSize.x
          : prev.x < 0
          ? 0
          : prev.x,
      y:
        windowHeight < windowSize.y + 30
          ? 30
          : prev.y + windowSize.y > windowHeight
          ? windowHeight - windowSize.y
          : prev.y,
    }));
  }, []);

  return (
    <DndContext
      id={id}
      sensors={sensors}
      onDragStart={() => {console.log('Drag start'); focusing()}}
      onDragEnd={({ delta, active }) => {
        if (active.id === 'resize-nwse') {
          setWindowSize((prev) => ({
            x:
              prev.x + delta.x < minimumWindowSize.width
                ? minimumWindowSize.width
                : prev.x + delta.x,
            y:
              prev.y + delta.y < minimumWindowSize.height
                ? minimumWindowSize.height
                : prev.y + delta.y,
          }));
          return;
        }
        if (active.id === 'resize-rew') {
          setWindowSize((prev) => ({
            x:
              prev.x + delta.x < minimumWindowSize.width
                ? minimumWindowSize.width
                : prev.x + delta.x,
            y: prev.y,
          }));
          return;
        }
        if (active.id === 'resize-ns') {
          setWindowSize((prev) => ({
            x: prev.x,
            y:
              prev.y + delta.y < minimumWindowSize.height
                ? minimumWindowSize.height
                : prev.y + delta.y,
          }));
          return;
        }
        if (active.id === 'resize-nesw') {
          setWindowSize((prev) => {
            setCoordinates(() => {
              const transformX =
                prev.x - delta.x < minimumWindowSize.width
                  ? x + (prev.x - minimumWindowSize.width)
                  : x + delta.x;
              return {
                x:
                  transformX +
                    (prev.x - delta.x < minimumWindowSize.width
                      ? minimumWindowSize.width
                      : prev.x - delta.x) >
                  windowWidth
                    ? windowWidth -
                      (prev.x - delta.x < minimumWindowSize.width
                        ? minimumWindowSize.width
                        : prev.x - delta.x)
                    : transformX < 0
                    ? 0
                    : transformX,
                y,
              };
            });
            return {
              x:
                prev.x - delta.x < minimumWindowSize.width
                  ? minimumWindowSize.width
                  : prev.x - delta.x,
              y:
                prev.y + delta.y < minimumWindowSize.height
                  ? minimumWindowSize.height
                  : prev.y + delta.y,
            };
          });

          return;
        }
        if (active.id === 'resize-lew') {
          setWindowSize((prev) => {
            const transformX =
              prev.x - delta.x < minimumWindowSize.width
                ? x + (prev.x - minimumWindowSize.width)
                : x + delta.x;

            setCoordinates(() => ({
              x:
                transformX +
                  (prev.x - delta.x < minimumWindowSize.width
                    ? minimumWindowSize.width
                    : prev.x - delta.x) >
                windowWidth
                  ? windowWidth -
                    (prev.x - delta.x < minimumWindowSize.width
                      ? minimumWindowSize.width
                      : prev.x - delta.x)
                  : transformX < 0
                  ? 0
                  : transformX,
              y,
            }));
            return {
              x:
                prev.x - delta.x < minimumWindowSize.width
                  ? minimumWindowSize.width
                  : prev.x - delta.x,
              y: prev.y,
            };
          });
          return;
        }
        setCoordinates(() => ({
          x:
            x + delta.x + windowSize.x > windowWidth
              ? windowWidth - windowSize.x
              : x + delta.x < 0
              ? 0
              : x + delta.x,

          // y: y + delta.y,
          y:
            y + delta.y + (windowSize.y > windowHeight - 30 ? windowHeight - 30 : windowSize.y) >
            windowHeight
              ? windowHeight - (windowSize.y > windowHeight - 30 ? windowHeight - 30 : windowSize.y)
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
        zIndex={zIndex}
        setMaximized={setMaximized}
        deleting={deleting}
        scrollBar={scrollBar}
        focusing={focusing}
        minimumWindowSize={minimumWindowSize}
      >
        {children}
      </DraggableElement>
    </DndContext>
  );
}
