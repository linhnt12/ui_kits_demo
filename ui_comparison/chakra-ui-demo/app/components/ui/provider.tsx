'use client';

import { ChakraProvider } from '@chakra-ui/react';
import { ThemeProvider as NextThemeProvider } from 'next-themes';
import { extendTheme } from '@chakra-ui/theme-utils';

const theme = extendTheme({
  config: {
    initialColorMode: 'system',
    useSystemColorMode: true,
  },
});

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <ChakraProvider theme={theme}>
        {children}
      </ChakraProvider>
    </NextThemeProvider>
  );
}
