import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import { store } from './redux/Store';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App store={store} />
  </React.StrictMode>
);
