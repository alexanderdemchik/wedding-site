import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { YandexMapProvider } from './lib/yandexMap/YandexMapProvider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <YandexMapProvider>
      <App />
    </YandexMapProvider>
  </React.StrictMode>
);
