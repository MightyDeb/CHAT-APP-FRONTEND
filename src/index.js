import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {CssBaseline} from '@mui/material'
import {HelmetProvider} from 'react-helmet-async'
import { LayoutLoader } from './components/layout/Loaders';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <CssBaseline/>
      <Suspense fallback={<LayoutLoader/>}>
        <div onContextMenu={e=> e.preventDefault()}>
          <App />
        </div>
      </Suspense>
    </HelmetProvider>
  </React.StrictMode>
);
