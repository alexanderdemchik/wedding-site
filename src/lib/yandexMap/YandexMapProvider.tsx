import { ReactNode, createContext, useEffect, useState } from 'react';
import { init } from './yandexMapApi';

export const YandexMapContext = createContext({ isInitialized: false });

export const YandexMapProvider = ({ children }: { children: ReactNode }) => {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    init().then(() => setIsInitialized(true));
  }, []);

  return <YandexMapContext.Provider value={{ isInitialized }}>{children}</YandexMapContext.Provider>;
};
