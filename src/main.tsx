import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { YandexMapProvider } from './lib/yandexMap/YandexMapProvider';
import { OpenAPI } from '../@generated/api/core/OpenAPI';
import { QueryClient, QueryClientProvider } from 'react-query';

OpenAPI.BASE = import.meta.env.VITE_API_BASE;

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <YandexMapProvider>
        <App />
      </YandexMapProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
