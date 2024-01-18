import { useContext, useEffect } from 'react';
import { WindowManagerContext } from '@/components/WindowsManager/WindowManagerProvider';

export default function OneForTreeWindow(): JSX.Element {
  const windowContext = useContext(WindowManagerContext);

  const isOneForTree =
    windowContext?.windowsState &&
    windowContext.windowsState.find((item) => item.id === 'onefortree')?.zIndex === windowContext.windowsState.length

  useEffect(() => {
    console.log('rerender');
  }, []);

  return (
    <iframe
      key="test"
      title="OneForTree"
      height="100%"
      width="100%"
      style={{
        borderWidth: 0,
        pointerEvents: windowContext?.windowDragging || !isOneForTree ? 'none' : undefined,
      }}
      src="https://onefortree.juthomas.fr/login"
    />
  );
}
