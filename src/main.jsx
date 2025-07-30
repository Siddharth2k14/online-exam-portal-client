import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ReactDOM from 'react-dom/client';
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import store from './redux/store.js';
import { Provider } from 'react-redux';
import { SpeedInsights } from '@vercel/speed-insights/react';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
      <SpeedInsights>
        <App />
      </SpeedInsights>
    </Provider>
  </BrowserRouter>
);