import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import 'destyle.css';
import '@styles/global.css';

const container = document.getElementById('app');

if (container !== null) {
  const root = ReactDOM.createRoot(container);

  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
