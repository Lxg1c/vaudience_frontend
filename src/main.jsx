import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './scss/index.scss';
import { store } from './store/store.js';
import { Provider } from 'react-redux';
import './scss/bootstrap_custom.scss';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <React.StrictMode>
            <BrowserRouter future={{ v7_relativeSplatPath: true }}>
                <App />
            </BrowserRouter>
        </React.StrictMode>
    </Provider>
);