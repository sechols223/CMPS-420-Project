import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';


import { MantineProvider } from '@mantine/core';
import { Router } from './Router';
import { theme } from './theme';
import { Router2 } from './Router2';


const isLoggedIn = true;


export default function App() {
  return (
    <MantineProvider theme={theme}>
      {isLoggedIn === false ?
        (
          <Router2/> 
        ) :
        (
          <Router />
        )
      }
      
    </MantineProvider>
  );
}
