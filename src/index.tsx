import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { App } from './components/app/app';
import store from './service/store';
import { Provider } from 'react-redux';
import './index.css';
import { BrowserRouter } from 'react-router-dom';

const container = document.getElementById('root') as HTMLElement;
const root = ReactDOMClient.createRoot(container!);

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
