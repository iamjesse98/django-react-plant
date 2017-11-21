import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { deepOrange500 } from 'material-ui/styles/colors'

import App from './App'

const rootElement = document.getElementById('react-app');
ReactDOM.render(<MuiThemeProvider muiTheme={getMuiTheme({ palette: { primary1Color: deepOrange500 }})}>
    <BrowserRouter>
        <App />
    </BrowserRouter>
</MuiThemeProvider>, rootElement);