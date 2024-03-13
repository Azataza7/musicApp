import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from './app/store';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GOOGLE_CLIENT_ID } from './constants';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <BrowserRouter>
        <React.StrictMode>
          <App/>
        </React.StrictMode>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </Provider>
);
