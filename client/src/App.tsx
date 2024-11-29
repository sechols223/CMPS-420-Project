import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import '@mantine/dropzone/styles.css';
import 'react-toastify/dist/ReactToastify.css';

import { MantineProvider } from '@mantine/core';
import { Router, Router2 } from './Router';
import { theme } from './theme';
import { ToastContainer } from 'react-toastify';

const isLoggedIn = false;

export default function App() {
  return (
    <MantineProvider theme={theme}>
      {!isLoggedIn ? <Router2 /> : <Router />}
      <ToastContainer
        autoClose={2000}
        newestOnTop
        pauseOnHover={false}
        hideProgressBar
      />
    </MantineProvider>
  );
}
