'use client';

import { useEffect, useState, createContext } from 'react';
import { DraggableWindow } from '../DraggableWindow/DraggableWindow';
// eslint-disable-next-line import/no-cycle
import Desktop from '../Desktop/Desktop';
import useWindowDimensions from '@/hooks/useWindowDImensions';
import MainWindow from '@/Windows/MainWindow/MainWindow';

interface windowsType {
  id: string;
  content: React.ReactNode;
  title?: string;
  icon?: string;
  maximized: boolean;
  size?: { height: number; width: number };
  coordinates: { x: number | 'center'; y: number | 'center' };
}
export const WindowManagerContext = createContext<((id: string) => void) | undefined>(undefined);

export default function WindowsManager() {
  const { height: windowHeight, width: windowWidth } = useWindowDimensions();

  const windowsList: windowsType[] = [
    {
      id: '2',
      content: <>One for tree mdr</>,
      title: 'OTF',
      // icon: '',
      maximized: false,
      size: { height: 400, width: 400 },
      coordinates: { x: 0, y: 30 },
    },
    {
      id: '3',
      content: <>cc 3</>,
      title: '',
      maximized: false,
      coordinates: { x: 130, y: 100 },
    },
    {
      id: '1',
      content: <MainWindow />,
      maximized: false,
      coordinates: { x: 'center', y: 130 },
    },
  ];

  const [windowsState, setWindowsState] = useState<windowsType[]>(
    []
    // windowsList
    //   .filter((elem) => ['1', '2'].includes(elem.id))
    //   .map((elem) => {
    //     const tmp = { ...elem };
    //     if (tmp.coordinates.x === 'center' && typeof window !== 'undefined') {
    //       tmp.coordinates.x = window.innerWidth / 2;
    //     }
    //     console.log('TEST 2');
    //     return { ...tmp };
    //   }) //Fenetres qui vont etre ouvertes au demarrage
  );

  useEffect(() => {
    const updatedWindowsList = windowsList
      .filter((elem) => ['1'].includes(elem.id))
      .map((elem) => {
        const tmp = { ...elem };
        if (tmp.coordinates.x === 'center') {
          tmp.coordinates.x = windowWidth / 2 - (elem?.size?.width || 600) / 2;
        }
        if (tmp.coordinates.y === 'center') {
          tmp.coordinates.y = windowHeight / 2 - (elem?.size?.height || 300) / 2;
        }
        return { ...tmp };
      });

    setWindowsState(updatedWindowsList);
  }, [windowWidth]);

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
      if (elementACopier?.coordinates.x === 'center') {
        elementACopier.coordinates.x = windowWidth / 2 - (elementACopier?.size?.width || 600) / 2;
      }
      if (elementACopier?.coordinates.y === 'center') {
        elementACopier.coordinates.y = windowHeight / 2 - (elementACopier?.size?.height || 300) / 2;
      }
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
    <WindowManagerContext.Provider value={OpenWindow}>
      {windowsState.map((elem, index) => (
        <DraggableWindow
          key={elem.id}
          id={elem.id}
          height={elem?.size?.height}
          width={elem?.size?.width}
          maximized={elem.maximized}
          windowTitle={elem?.title}
          coordinates={elem.coordinates as { x: number; y: number; }}
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
      <Desktop />
    </WindowManagerContext.Provider>
  );
}
