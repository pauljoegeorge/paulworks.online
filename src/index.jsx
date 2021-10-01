import React from 'react';
import ReactDOM from 'react-dom';
import TagManager from 'react-gtm-module';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const tagManagerArgs = {
  gtmId: 'GTM-000000',
};
TagManager.initialize(tagManagerArgs);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);

reportWebVitals();
