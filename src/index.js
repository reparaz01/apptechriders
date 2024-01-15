import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from './components/Router';
import reportWebVitals from './reportWebVitals';
import './styles/custom-styles.css'

import 'typeface-montserrat';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode> Modificado por jhon 15/01
     <Router />
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
