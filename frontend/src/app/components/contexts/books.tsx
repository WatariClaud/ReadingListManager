"use client"
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Book } from '../../../../types';

interface BooksContextProps {
  localBooks: Book[];
  setLocalBooks: React.Dispatch<React.SetStateAction<Book[]>>;
}

const BooksContext = createContext<BooksContextProps | undefined>(undefined);

export const BooksProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [localBooks, setLocalBooks] = useState<Book[]>([]);

  return (
    <BooksContext.Provider value={{ localBooks, setLocalBooks }}>
      {children}
    </BooksContext.Provider>
  );
};

export const useBooksContext = () => {
  const context = useContext(BooksContext);
  if (!context) {
    throw new Error('useBooksContext must be used within a BooksProvider');
  }
  return context;
};
