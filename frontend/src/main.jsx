import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { StyleSheetManager, ThemeProvider } from 'styled-components'
import { StylesProps } from './constants/styles-props.const.js'
import { theme } from './theme.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StyleSheetManager shouldForwardProp={(prop) => !StylesProps.includes(prop)}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </StyleSheetManager>
  </StrictMode>,
)
