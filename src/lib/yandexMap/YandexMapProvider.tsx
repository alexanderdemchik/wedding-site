import { ReactNode, createContext, useEffect, useState } from 'react';
import { init } from './yandexMapApi';
import { injectScriptOnce } from '../../common/helpers/injectScriptOnce';

export const YandexMapContext = createContext({ isInitialized: false });

export const YandexMapProvider = ({ children }: { children: ReactNode }) => {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    injectScriptOnce('https://api-maps.yandex.ru/v3/?apikey=14dd6308-d6c1-4401-ba3c-b610ebfd7c90&lang=ru_RU').then(
      () => {
        init().then(() => setIsInitialized(true));
      }
    );
  }, []);

  return <YandexMapContext.Provider value={{ isInitialized }}>{children}</YandexMapContext.Provider>;
};
