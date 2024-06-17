import { Dispatch, SetStateAction } from 'react';
import { Book } from '../../../types';

const BOOKS_PER_PAGE = 10;

const loadMoreBooks = (
  localBooks: Book[], 
  page: number, 
  setDisplayedBooks: React.Dispatch<React.SetStateAction<Book[]>>, 
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>, 
  setSeenAllBooks: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setIsLoading(true);
  setTimeout(() => {
    const newBooks = localBooks.slice(0, (page + 1) * BOOKS_PER_PAGE);
    setDisplayedBooks(prevBooks => [...prevBooks, ...localBooks.slice(page * BOOKS_PER_PAGE, (page + 1) * BOOKS_PER_PAGE)]);
    setIsLoading(false);
    if (newBooks.length >= localBooks.length) {
      setSeenAllBooks(true);
    }
  }, 1000);
};

export default loadMoreBooks;
