'use client';

import { useState } from 'react';
import { DraggableWindow } from '../DraggableWindow/DraggableWindow';

export default function WindowsManager() {
  const [windowsState, setWindowsState] = useState([
    { id: '1', maximized: false, coordinates: { x: 0, y: 30 } },
    { id: '2', maximized: false, coordinates: { x: 100, y: 130 } },
    { id: '3', maximized: false, coordinates: { x: 130, y: 100 } },
  ]);

  function SetWindowFocus(id: string) {
    const tmpList = [...windowsState];

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
          maximized={elem.maximized}
          coordinates={elem.coordinates}
          zIndex={index}
          setMaximized={() => SetWindowMaximized(elem.id)}
          focusing={() => {
            SetWindowFocus(elem.id);
          }}
          deleting={() => {
            setWindowsState(windowsState.filter((item) => item.id !== elem.id));
          }}
        >
          {elem.id}
        </DraggableWindow>
      ))}
    </>
  );
}
