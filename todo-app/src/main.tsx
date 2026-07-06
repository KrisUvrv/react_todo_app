import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

import { store } from '@/store/store.ts';
import { Provider } from 'react-redux';
import { ThemeContextProvider } from './theme/ThemeContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeContextProvider>
        <App />
      </ThemeContextProvider>
    </Provider>
  </StrictMode>,
);
