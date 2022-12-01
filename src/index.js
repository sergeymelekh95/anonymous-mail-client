import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { App } from './App';
import { SnackbarProvider } from 'notistack';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <SnackbarProvider
            maxSnack={3}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
            <App />
        </SnackbarProvider>
    </BrowserRouter>
);
