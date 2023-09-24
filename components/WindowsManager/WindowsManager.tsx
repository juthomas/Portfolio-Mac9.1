'use client';

import { useEffect, useState } from 'react';
import { DraggableWindow } from '../DraggableWindow/DraggableWindow';

export default function WindowsManager() {
  const [windowsState, setWindowsState] = useState([
    { id: '1', coordinates: { x: 0, y: 30 } },
    { id: '2', coordinates: { x: 100, y: 130 } },
    { id: '3', coordinates: { x: 130, y: 100 } },
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

  useEffect(() => {
    console.log('??', windowsState);
  }, [windowsState]);

  return (
    <>
      {windowsState.map((elem, index) => (
        <DraggableWindow
          key={elem.id}
          id={elem.id}
          coordinates={elem.coordinates}
          zIndex={index}
          focusing={() => {
            console.log('Event focus');
            SetWindowFocus(elem.id);
          }}
          deleting={() => {
            console.log('Event delete');
            setWindowsState(windowsState.filter((item) => item.id !== elem.id));
          }}
        >
          {elem.id}
        </DraggableWindow>
      ))}
    </>
  );
}
