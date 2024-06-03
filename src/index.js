import React from 'react';
//import ReactGA from 'react-ga4';
import ReactDOM from 'react-dom/client';
import { ThemeProvider, StyledEngineProvider, createTheme } from '@mui/material/styles';
import './styling/index.css';
import App from './components/App';

const theme = createTheme();

//ReactGA.initialize('G-9QJ5KGF503')

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </StyledEngineProvider>
  </React.StrictMode>
);