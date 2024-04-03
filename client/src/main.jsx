import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import App from './App.jsx';
import { store } from "./store/index.js";
// import "./assets/styles/index.scss"; //todo dans le userLayout



ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
        
          <React.StrictMode>
                <App />
        </React.StrictMode>
        
    </BrowserRouter>
  </Provider>
)
