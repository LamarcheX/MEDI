import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { StyleSheetManager, ThemeProvider } from 'styled-components'
import { StylesProps } from './constants/styles-props.const.js'
import { theme } from './theme.js'
import { persistor, store } from './store/store.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StyleSheetManager shouldForwardProp={(prop) => !StylesProps.includes(prop)}>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </PersistGate>
        </Provider>
      </ThemeProvider>
    </StyleSheetManager>
  </StrictMode>,
)
