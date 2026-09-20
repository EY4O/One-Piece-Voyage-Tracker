import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './OnePieceWatchOrder.jsx';
import '@fontsource/instrument-serif/400.css';
import '@fontsource/instrument-serif/400-italic.css';
import '@fontsource-variable/outfit';
import './index.css';
import { registerSW } from 'virtual:pwa-register';

// Automatically reload when a new version of the app is published
registerSW({ immediate: true });

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
