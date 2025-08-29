import './index.css';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ReactDOM from 'react-dom/client';

import App from './App.jsx'
import {AuthProvider} from "./context/AuthProvider.jsx"
import { BrowserRouter } from 'react-router-dom'
import { SocketProvider } from './context/SocketContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <AuthProvider>
          <SocketProvider>
            <App />
          </SocketProvider>
        </AuthProvider>
    </BrowserRouter>    
  
);
