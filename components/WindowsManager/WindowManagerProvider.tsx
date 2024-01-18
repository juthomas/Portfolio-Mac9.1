import { Dispatch, SetStateAction, createContext, useEffect, useState } from 'react';
import MainWindow from '@/Windows/MainWindow/MainWindow';
import ProfileWindow from '@/Windows/ProfileWindow/ProfileWindow';
import ProjectsWindow from '@/Windows/ProjectsWindow/ProjectsWindow';
import ContactWindow from '@/Windows/ContactWindow/ContactWindow';
import ProjectsWindowV2 from '@/Windows/ProjectsWindowV2/ProjectsWindowV2';
import useWindowDimensions from '@/hooks/useWindowDImensions';
import OneForTreeWindow from '@/Windows/OneForTreeWindow/OneForTreeWindow';

interface windowsType {
  id: string;
  content: React.ReactNode;
  title?: string;
  icon?: string;
  scrollBar?: boolean;
  maximized: boolean;
  minimumSize?: { height: number; width: number };
  zIndex?: number;
  size?: { height: number; width: number };
  coordinates: { x: number | 'center'; y: number | 'center' };
}

export const WindowManagerContext = createContext<
  | {
      windowsState: windowsType[];
      windowDragging: boolean;
      OpenWindow: (id: string) => void;
      SetWindowFocus: (id: string) => void;
      SetWindowMaximized: (id: string) => void;
      setWindowsState: Dispatch<SetStateAction<windowsType[]>>;
      setWindowDragging: Dispatch<SetStateAction<boolean>>;
    }
  | undefined
>(undefined);

export default function WindowsManagerProvider({ children }: { children: JSX.Element }) {
  const [windowsState, setWindowsState] = useState<windowsType[]>([]);
  const { height: windowHeight, width: windowWidth } = useWindowDimensions();

  const [windowDragging, setWindowDragging] = useState(false);

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
      id: 'onefortree',
      content: <OneForTreeWindow />,
      title: 'One For Tree',
      // icon: '',
      maximized: false,
      size: { height: 800, width: 800 },
      minimumSize: { height: 500, width: 400 },
      coordinates: { x: 'center', y: 60 },
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
      .filter((elem) => ['main' /* , 'projectsV2' */].includes(elem.id))
      .map((elem, index) => {
        const tmp = { ...elem, zIndex: index + 1 };
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
    // const elementAdeplacer = windowsState.find((item) => item.id === id);

    // if (elementAdeplacer) {
    //   const index = windowsState.indexOf(elementAdeplacer);
    //   if (index !== -1) {
    //     windowsState.splice(index, 1);
    //   }
    //   windowsState.push(elementAdeplacer);
    // }

    // setWindowsState([...windowsState]);
    const tmpList = [...windowsState];
    const elementAdeplacer = tmpList.find((item) => item.id === id);

    if (elementAdeplacer) {
      const index = elementAdeplacer.zIndex;

      if (!index || index - 1 < 0 || index - 1 >= tmpList.length) {
        console.error('Index invalide', index);
        return;
      }
      tmpList[tmpList.indexOf(elementAdeplacer)].zIndex = tmpList.length + 1; //
      for (let i = 0; i < tmpList.length; i += 1) {
        const item = tmpList[i];

        if (item && item.zIndex !== undefined && item.zIndex > index) {
          item.zIndex -= 1;
        }
      }

      setWindowsState(tmpList);
    }
  }

  function OpenWindow(id: string) {
    const tmpList = [...windowsState];

    const elementAdeplacer = tmpList.find((item) => item.id === id);

    if (elementAdeplacer) {
      const index = elementAdeplacer.zIndex;

      if (!index || index - 1 < 0 || index - 1 >= tmpList.length) {
        console.error('Index invalide', index);
        return;
      }
      tmpList[tmpList.indexOf(elementAdeplacer)].zIndex = tmpList.length + 1; //
      for (let i = 0; i < tmpList.length; i += 1) {
        const item = tmpList[i];

        if (item && item.zIndex !== undefined && item.zIndex > index) {
          item.zIndex -= 1;
        }
      }

      setWindowsState(tmpList);
    } else {
      const elementACopier = windowsList.find((item) => item.id === id);
      if (elementACopier) {
        console.log('Old zindex', elementACopier.zIndex);
        elementACopier.zIndex = tmpList.length + 1;
        console.log('new zindex', elementACopier.zIndex);
      }
      if (elementACopier?.coordinates.x === 'center') {
        elementACopier.coordinates.x = windowWidth / 2 - (elementACopier?.size?.width || 600) / 2;
      }
      if (elementACopier?.coordinates.y === 'center') {
        elementACopier.coordinates.y = windowHeight / 2 - (elementACopier?.size?.height || 300) / 2;
      }
      elementACopier && tmpList.push(elementACopier);
    }

    setWindowsState(tmpList);
    // return;

    // if (elementAdeplacer) {
    //   const index = tmpList.indexOf(elementAdeplacer);
    //   if (index !== -1) {
    //     tmpList.splice(index, 1);
    //   }
    //   tmpList.push(elementAdeplacer);
    // } else {
    //   const elementACopier = windowsList.find((item) => item.id === id);
    //   if (elementACopier?.coordinates.x === 'center') {
    //     elementACopier.coordinates.x = windowWidth / 2 - (elementACopier?.size?.width || 600) / 2;
    //   }
    //   if (elementACopier?.coordinates.y === 'center') {
    //     elementACopier.coordinates.y = windowHeight / 2 - (elementACopier?.size?.height || 300) / 2;
    //   }
    //   elementACopier && tmpList.push(elementACopier);
    // }

    // setWindowsState(tmpList);
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

    // const elementAdeplacer = tmpList.find((item) => item.id === id);

    // if (elementAdeplacer) {
    //   const index = tmpList.indexOf(elementAdeplacer);
    //   if (index !== -1) {
    //     tmpList.splice(index, 1);
    //   }
    //   tmpList.push(elementAdeplacer);
    // }

    // setWindowsState(tmpList);

    const elementAdeplacer = tmpList.find((item) => item.id === id);

    if (elementAdeplacer) {
      const index = elementAdeplacer.zIndex;

      if (!index || index - 1 < 0 || index - 1 >= tmpList.length) {
        console.error('Index invalide', index);
        return;
      }
      tmpList[tmpList.indexOf(elementAdeplacer)].zIndex = tmpList.length + 1; //
      for (let i = 0; i < tmpList.length; i += 1) {
        const item = tmpList[i];

        if (item && item.zIndex !== undefined && item.zIndex > index) {
          item.zIndex -= 1;
        }
      }

      setWindowsState(tmpList);
    }
  }

  return (
    <WindowManagerContext.Provider
      value={{
        windowsState,
        OpenWindow,
        SetWindowFocus,
        SetWindowMaximized,
        setWindowsState,
        setWindowDragging,
        windowDragging,
      }}
    >
      {children}
    </WindowManagerContext.Provider>
  );
}
