import { useState, useEffect } from 'react';

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } =
    typeof window !== 'undefined' ? window : { innerHeight: 0, innerWidth: 0 };
  return {
    width,
    height,
  };
}

export type WindowDimensions = {
  width: number;
  height: number;
};

type ResizeCallback = ((dimensions: WindowDimensions) => void) | null;

export default function useWindowDimensions(callback?: ResizeCallback) {
  const [windowDimensions, setWindowDimensions] = useState<WindowDimensions>(getWindowDimensions());

  function handleResize() {
    const newDimensions = getWindowDimensions();
    setWindowDimensions(newDimensions);

    if (callback && typeof callback === 'function') {
      callback(newDimensions);
    }
  }
  if (typeof window !== 'undefined') {
    useEffect(() => {
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
  }

  return windowDimensions;
}
