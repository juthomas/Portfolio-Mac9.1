'use client';

import type { StaticImageData } from 'next/image';
import { useState } from 'react';
import { DndContext, useSensors, useSensor, PointerSensor } from '@dnd-kit/core';
// eslint-disable-next-line import/no-cycle
import DraggableShortcut from '../DraggableShortcut/DraggableShortcut';
import onefortreeIcon from '@/assets/onefortree.png';
import iotaIcon from '@/assets/iota.png';
import useWindowDimensions from '@/hooks/useWindowDImensions';

interface shortcutType {
  id: string;
  position: {
    left?: number;
    top?: number;
    right?: number;
    bottom?: number;
  };
  windowId?: string;
  text: string;
  link?: string;
  icon?: StaticImageData;
}

export default function Desktop() {
  const { height: windowHeight, width: windowWidth } = useWindowDimensions();
  const [shortcutsPositions, setShortcutPositions] = useState<shortcutType[]>([
    { id: '1', position: { right: 0.1, top: 50 }, windowId: '1', text: 'Portfolio' },
    { id: '2', position: { right: 0.1, top: 175 }, windowId: '2', text: 'Projet Iota ' },
    {
      id: '3',
      position: { right: 0.1, bottom: 50 },
      link: 'http://projet-iota.fr',
      text: 'Projet Iota',
      icon: iotaIcon,
    },
    {
      id: '4',
      position: { right: 0.1, top: 300 },
      link: 'https://oft.pages.dev/game',
      text: 'One for tree',
      icon: onefortreeIcon,
    },
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
      onDragStart={({ active }) => {
        const elementAdeplacer = shortcutsPositions.find((item) => item.id === active.id);

        if (elementAdeplacer) {
          const index = shortcutsPositions.indexOf(elementAdeplacer);
          if (index !== -1) {
            shortcutsPositions.splice(index, 1);
          }
          shortcutsPositions.push(elementAdeplacer);
        }
        setShortcutPositions([...shortcutsPositions]);
      }}
      onDragEnd={({ delta, active }) => {
        const shortcutIndex = shortcutsPositions.findIndex((x) => x.id === active.id);
        const { top, left, right, bottom } = shortcutsPositions[shortcutIndex].position;
        shortcutsPositions[shortcutIndex].position = {
          left:
            left !== undefined
              ? left + delta.x + 140 > windowWidth
                ? windowWidth - 140
                : left + delta.x < 0
                ? 0
                : left + delta.x
              : undefined,
          top:
            top !== undefined
              ? top + delta.y + 120 > windowHeight
                ? windowHeight - 120
                : top + delta.y < 35
                ? 35
                : top + delta.y
              : undefined,
          right:
            right !== undefined
              ? right - delta.x + 140 > windowWidth
                ? windowWidth - 140
                : right - delta.x < 0
                ? 0.1
                : right - delta.x
              : undefined,
          bottom:
            bottom !== undefined
              ? bottom - delta.y + 145 > windowHeight
                ? windowHeight - 145
                : bottom - delta.y < 15
                ? 15
                : bottom - delta.y
              : undefined,
        };
        setShortcutPositions([...shortcutsPositions]);
      }}
    >
      {shortcutsPositions.map((elem) => (
        <DraggableShortcut key={elem.id} {...elem} />
      ))}
    </DndContext>
  );
}
