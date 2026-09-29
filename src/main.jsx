import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './OnePieceWatchOrder.jsx';
import '@fontsource/dela-gothic-one/latin-400.css';
import '@fontsource/zen-kaku-gothic-new/latin-400.css';
import '@fontsource/zen-kaku-gothic-new/latin-500.css';
import '@fontsource/zen-kaku-gothic-new/latin-700.css';
import './index.css';
import { registerSW } from 'virtual:pwa-register';

// Automatically reload when a new version of the app is published
registerSW({ immediate: true });

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
