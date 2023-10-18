import { createContext, useContext } from 'react';

const windowContext = createContext<(() => void) | null>(null);

export const usewindowContext = () => {
  const context = useContext(windowContext);
  if (!context) {
    throw new Error("usewindowContext doit être utilisé à l'intérieur d'un FunctionProvider");
  }
  return context;
};

export default windowContext;
