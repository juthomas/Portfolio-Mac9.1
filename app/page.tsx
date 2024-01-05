'use client';

import { Dispatch, SetStateAction, createContext, useEffect, useState } from 'react';
import { Box } from '@mantine/core';
import { Header } from '@/components/Header/Header';
import WindowsManager from '@/components/WindowsManager/WindowsManager';
import Footer from '@/components/Footer/Footer';
import { LoadingScreen } from '@/components/LoadingScreen/LoadingScreen';
import useWindowDimensions from '@/hooks/useWindowDImensions';

import MainWindow from '@/Windows/MainWindow/MainWindow';
import ProfileWindow from '@/Windows/ProfileWindow/ProfileWindow';
import ProjectsWindow from '@/Windows/ProjectsWindow/ProjectsWindow';
import ContactWindow from '@/Windows/ContactWindow/ContactWindow';
import ProjectsWindowV2 from '@/Windows/ProjectsWindowV2/ProjectsWindowV2';

export const WindowManagerContext = createContext<
  | {
      windowsState: windowsType[];
      OpenWindow:(id: string) => void;
      SetWindowFocus: (id: string) => void;
      SetWindowMaximized: (id: string) => void;
      setWindowsState: Dispatch<SetStateAction<windowsType[]>>;
    }
  | undefined
>(undefined);

interface windowsType {
  id: string;
  content: React.ReactNode;
  title?: string;
  icon?: string;
  scrollBar?: boolean;
  maximized: boolean;
  size?: { height: number; width: number };
  coordinates: { x: number | 'center'; y: number | 'center' };
}

export default function HomePage() {
  const { height: windowHeight, width: windowWidth } = useWindowDimensions();
  const [windowsState, setWindowsState] = useState<windowsType[]>([]);

  const windowsList: windowsType[] = [
    {
      id: 'main',
      content: <MainWindow />,
      maximized: false,
      scrollBar: true,
      coordinates: { x: 'center', y: 130 },
    },
    {
      id: 'profile',
      content: <ProfileWindow />,
      title: 'My Profile',
      scrollBar: true,
      maximized: false,
      size: { height: 700, width: 800 },
      coordinates: { x: 'center', y: 100 },
    },
    {
      id: 'projects',
      content: <ProjectsWindow />,
      title: 'My Projects',
      maximized: false,
      scrollBar: true,
      size: { height: 800, width: 800 },
      coordinates: { x: 'center', y: 50 },
    },
    {
      id: 'contact',
      content: <ContactWindow />,
      title: 'Contact Me',
      scrollBar: true,
      maximized: false,
      size: { height: 800, width: 800 },
      coordinates: { x: 'center', y: 70 },
    },
    {
      id: 'electronic',
      content: <>Electronic creations</>,
      title: 'Electronic creations',
      // icon: '',
      maximized: false,
      size: { height: 400, width: 400 },
      coordinates: { x: 0, y: 30 },
    },
    {
      id: 'web',
      content: <>Web creations</>,
      title: 'Web creations',
      // icon: '',
      maximized: false,
      size: { height: 400, width: 400 },
      coordinates: { x: 0, y: 30 },
    },
    {
      id: 'random',
      content: <>Random creations</>,
      title: 'Random creations',
      // icon: '',
      maximized: false,
      size: { height: 400, width: 400 },
      coordinates: { x: 0, y: 30 },
    },
    {
      id: 'projectsV2',
      content: <ProjectsWindowV2 />,
      // content: <>WTF</>,
      title: 'Projects',
      // icon: '',
      maximized: false,
      scrollBar: true,
      size: { height: 400, width: 400 },
      coordinates: { x: 0, y: 30 },
    },
  ];
  useEffect(() => {
    const updatedWindowsList = windowsList
      .filter((elem) => ['main'/* , 'projectsV2' */].includes(elem.id))
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
  }, []);

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
    <WindowManagerContext.Provider
      value={{ windowsState, OpenWindow, SetWindowFocus, SetWindowMaximized, setWindowsState }}
    >
      <Box
        style={{
          height: '100%',
          width: '100%',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <LoadingScreen />
        <Header />
        <WindowsManager />
        <Footer />
      </Box>
    </WindowManagerContext.Provider>
  );
}
