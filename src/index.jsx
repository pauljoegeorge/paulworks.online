import React from 'react';
import ReactDOM from 'react-dom';
import TagManager from 'react-gtm-module';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const tagManagerArgs = {
  gtmId: `${process.env.REACT_APP_GTM_CONTAINER_ID}`,
};
TagManager.initialize(tagManagerArgs);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);

reportWebVitals();
