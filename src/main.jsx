//Regular Imports
import ReactDOM from 'react-dom/client';

//Components
import App from './App.jsx'

//CSS
import './index.css'

//Router
import { BrowserRouter } from 'react-router-dom';

//Redux
import store from './redux/store.js';
import { Provider } from 'react-redux';

//Vercel
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Analytics } from "@vercel/analytics/react"


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
      <SpeedInsights />
      <Analytics />
    </Provider>
  </BrowserRouter>
);