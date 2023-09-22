'use client';

import { useEffect, useState } from 'react';
import { DraggableWindow } from '../DraggableWindow/DraggableWindow';

export default function WindowsManager() {
  const [windowsState, setWindowsState] = useState([
    { id: '1', focused: false },
    { id: '2', focused: false },
  ]);

  function SetWindowFocus(id: string) {
    setWindowsState(
      windowsState.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            focused: true,
          };
        }
        return {
          ...item,
          focused: false,
        };
      })
    );
  }

  useEffect(() => {
    console.log('??', windowsState);
  }, [windowsState]);

  return (
    <>
      {windowsState.map((elem) => (
        <DraggableWindow
          key={elem.id}
          id={elem.id}
          focused={elem.focused}
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
