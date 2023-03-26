/* @refresh reload */
import './index.css'
import { render } from 'solid-js/web'
import { Router } from "@solidjs/router";

import App from './App'
import { AppProvider } from "./stores/app-context";

const root = document.getElementById('root')!

render(() => (
    <Router>
        <AppProvider>
            <App/>
        </AppProvider>
    </Router>
), root)
