// ===== Regular Imports =====
import React from 'react';
import ReactDOM from 'react-dom/client';

// ===== Components =====
import App from './App.jsx';

// ===== CSS =====
import './index.css';

// ===== Router =====
import { BrowserRouter } from 'react-router-dom';

// ===== Redux =====
import store from './redux/store.js';
import { Provider } from 'react-redux';

// ===== Vercel =====
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Analytics } from '@vercel/analytics/react';

// ===== Sentry =====
import * as Sentry from "@sentry/react";

// Initialize Sentry (before rendering the app)
Sentry.init({
  dsn: "https://bb38f69feecd42a3b04bc982ebf04f00@o4510150346407936.ingest.us.sentry.io/4510150353551360",
  integrations: [Sentry.browserTracingIntegration()],
  tracesSampleRate: 1.0, // Adjust as needed for performance monitoring
  sendDefaultPii: true,  // Send user/IP info if needed
});

// ===== React Render =====
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
      <Sentry.ErrorBoundary fallback={<p>Something went wrong!</p>}>
        <App />
        <SpeedInsights />
        <Analytics />
      </Sentry.ErrorBoundary>
    </Provider>
  </BrowserRouter>
);