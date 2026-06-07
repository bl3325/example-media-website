import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './assets/scss/custom.scss';
import './assets/scss/theme-overrides.scss';

import initTheme from "./utils/DataTheme.js";

(async function () {
    try {
        await initTheme();
    } catch (e) {
        console.error(e);
    } finally {
        const s = document.getElementById('initial-theme-style');
        if (s) s.remove();
        document.documentElement.style.removeProperty('transition');
        document.body.style.removeProperty('transition');
        createRoot(document.getElementById('root')).render(
            <StrictMode>
                <App />
            </StrictMode>,
        )
    }
})();