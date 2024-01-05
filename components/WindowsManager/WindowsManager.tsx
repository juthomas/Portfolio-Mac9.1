'use client';

import { useContext } from 'react';
import { useMediaQuery } from '@mantine/hooks';
import { DraggableWindow } from '../DraggableWindow/DraggableWindow';
// eslint-disable-next-line import/no-cycle
import Desktop from '../Desktop/Desktop';

import { WindowManagerContext } from '@/app/page';

export default function WindowsManager() {
  const windowContext = useContext(WindowManagerContext);
  const isMobile = useMediaQuery('(max-width: 50em)');

  return (
    <>
      {windowContext!.windowsState.map((elem, index) => (
        <DraggableWindow
          key={elem.id}
          id={elem.id}
          scrollBar={elem.scrollBar}
          height={elem?.size?.height}
          width={elem?.size?.width}
          maximized={isMobile || elem.maximized}
          windowTitle={elem?.title}
          coordinates={elem.coordinates as { x: number; y: number }}
          windowIcon={elem.icon}
          focused={index === windowContext!.windowsState.length - 1}
          setMaximized={() => windowContext?.SetWindowMaximized(elem.id)}
          focusing={() => {
            windowContext?.SetWindowFocus(elem.id);
          }}
          deleting={() => {
            windowContext?.setWindowsState(
              windowContext!.windowsState.filter((item) => item.id !== elem.id)
            );
          }}
        >
          {elem.content}
        </DraggableWindow>
      ))}
      <Desktop />
    </>
  );
}
