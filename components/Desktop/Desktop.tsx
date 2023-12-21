'use client';

import type { StaticImageData } from 'next/image';
import { useState } from 'react';
import { useMediaQuery } from '@mantine/hooks';
import { Flex, SimpleGrid } from '@mantine/core';
import { DndContext, useSensors, useSensor, PointerSensor } from '@dnd-kit/core';
// eslint-disable-next-line import/no-cycle
import DraggableShortcut from '../DraggableShortcut/DraggableShortcut';
import onefortreeIcon from '@/assets/icons/onefortree.png';
import iotaIcon from '@/assets/icons/iota.png';
import useWindowDimensions from '@/hooks/useWindowDImensions';
import portfolioIcon from '@/assets/icons/folderPortfolio.png';
import binIcon from '@/assets/icons/centredBin.png';
import electronicIcon from '@/assets/icons/folderToolbox.png';
import webIcon from '@/assets/icons/folderPage.png';

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
  const isMobile = useMediaQuery('(max-height: 55em)');

  const { height: windowHeight, width: windowWidth } = useWindowDimensions();

  const [shortcutsPositions, setShortcutPositions] = useState<shortcutType[]>([
    {
      id: '1',
      position: { right: 0.1, top: 50 },
      windowId: 'main',
      text: 'Portfolio',
      icon: portfolioIcon,
    },
    {
      id: '2',
      position: { right: 0.1, top: 175 },
      windowId: 'electronic',
      text: 'Electronic Creations',
      icon: electronicIcon,
    },
    {
      id: '3',
      position: { right: 0.1, top: 320 },
      windowId: 'web',
      text: 'Web Creations',
      icon: webIcon,
    },
    {
      id: '4',
      position: { right: 0.1, top: 445 },
      link: 'https://onefortree.juthomas.fr/login',
      text: 'One for tree',
      icon: onefortreeIcon,
    },
    {
      id: '5',
      position: { right: 0.1, top: 580 },
      link: 'http://projet-iota.fr',
      text: 'Projet Iota',
      icon: iotaIcon,
    },
    {
      id: '6',
      position: { right: 0.1, bottom: 50 },
      windowId: 'random',
      text: 'Trash',
      icon: binIcon,
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
    <>
      {isMobile ? (
        <>
          <SimpleGrid cols={2} pos="absolute" top={50} right={10} mah="100%">
            {shortcutsPositions
              .filter((item) => item.position.right && item.position.top)
              .map((elem) => (
                <DraggableShortcut draggable={false} key={elem.id} {...elem} />
              ))}
          </SimpleGrid>
          <Flex pos="absolute" direction="column" bottom={30} right={10} mah="100%">
            {shortcutsPositions
              .filter((item) => item.position.right && item.position.bottom)
              .map((elem) => (
                <DraggableShortcut draggable={false} key={elem.id} {...elem} />
              ))}
          </Flex>
        </>
      ) : (
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
      )}
    </>
  );
}
