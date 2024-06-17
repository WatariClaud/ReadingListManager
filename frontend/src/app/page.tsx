"use client";
import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material';
import Home from './components/home';
import { BooksProvider } from './components/contexts/books';

const theme = createTheme({
  typography: {
    fontFamily: [
      '"Mulish"',
      'Roboto',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});


const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <BooksProvider>
        <Home />
      </BooksProvider>
    </ThemeProvider>
  );
};

export default App;

// TODO:

/*
  - Make responsive
*/