import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
    config: {
      initialColorMode: 'light',
      useSystemColorMode: true,
    },
    colors: {
      light: {
        primary: '#ffffff',
        // Define otros colores para el modo claro
      },
      dark: {
        primary: '#000000',
        // Define otros colores para el modo oscuro
      },
    },
  });
  
  export default theme;