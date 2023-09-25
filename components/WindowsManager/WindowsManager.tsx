'use client';

import { useState } from 'react';
import { DraggableWindow } from '../DraggableWindow/DraggableWindow';
import Desktop from '../Desktop/Desktop';

interface windowsType {
  id: string;
  content: React.ReactNode;
  title?: string;
  icon?: string;
  maximized: boolean;
  size?: { height: number; width: number };
  coordinates: { x: number; y: number };
}

export default function WindowsManager() {
  const windowsList: windowsType[] = [
    {
      id: '1',
      content: <>One for tree mdr</>,
      title: 'OTF',
      // icon: '',
      maximized: false,
      size: { height: 400, width: 400 },
      coordinates: { x: 0, y: 30 },
    },
    {
      id: '2',
      content: <>Iota mdr</>,
      maximized: false,
      coordinates: { x: 100, y: 130 },
    },
    {
      id: '3',
      content: <>cc 3</>,
      title: '',
      maximized: false,
      coordinates: { x: 130, y: 100 },
    },
  ];

  const [windowsState, setWindowsState] = useState<windowsType[]>([
    {
      id: '1',
      content: <>cc 1</>,
      title: '',
      icon: '',
      maximized: false,
      size: { height: 400, width: 400 },
      coordinates: { x: 0, y: 30 },
    },
    {
      id: '2',
      content: <>cc 2</>,
      maximized: false,
      coordinates: { x: 100, y: 130 },
    },
    {
      id: '3',
      content: <>cc 3</>,
      title: '',
      maximized: false,
      coordinates: { x: 130, y: 100 },
    },
  ]);

  function SetWindowFocus(id: string) {
    const elementAdeplacer = windowsState.find((item) => item.id === id);

    if (elementAdeplacer) {
      const index = windowsState.indexOf(elementAdeplacer);
      if (index !== -1) {
        windowsState.splice(index, 1);
      }
      windowsState.push(elementAdeplacer);
    }

    setWindowsState([...windowsState]);
  }

  function OpenWindow(id: string) {
    const tmpList = [...windowsState];

    const elementAdeplacer = tmpList.find((item) => item.id === id);

    if (elementAdeplacer) {
      const index = tmpList.indexOf(elementAdeplacer);
      if (index !== -1) {
        tmpList.splice(index, 1);
      }
      tmpList.push(elementAdeplacer);
    } else {
      const elementACopier = windowsList.find((item) => item.id === id);
      elementACopier && tmpList.push(elementACopier);
    }

    setWindowsState(tmpList);
  }

  function SetWindowMaximized(id: string) {
    let tmpList = [...windowsState];
    tmpList = tmpList.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          maximized: !item.maximized,
        };
      }
      return {
        ...item,
      };
    });

    const elementAdeplacer = tmpList.find((item) => item.id === id);

    if (elementAdeplacer) {
      const index = tmpList.indexOf(elementAdeplacer);
      if (index !== -1) {
        tmpList.splice(index, 1);
      }
      tmpList.push(elementAdeplacer);
    }

    setWindowsState(tmpList);
  }

  return (
    <>
      {windowsState.map((elem, index) => (
        <DraggableWindow
          key={elem.id}
          id={elem.id}
          height={elem?.size?.height}
          width={elem?.size?.width}
          maximized={elem.maximized}
          windowTitle={elem?.title}
          coordinates={elem.coordinates}
          windowIcon={elem.icon}
          focused={index === windowsState.length - 1}
          setMaximized={() => SetWindowMaximized(elem.id)}
          focusing={() => {
            SetWindowFocus(elem.id);
          }}
          deleting={() => {
            setWindowsState(windowsState.filter((item) => item.id !== elem.id));
          }}
        >
          {elem.content}
        </DraggableWindow>
      ))}
      <Desktop
        openWindow={(windowId) => {
          console.log('Shortcut clicked', windowId);
          OpenWindow(windowId);
        }}
      />
    </>
  );
}
