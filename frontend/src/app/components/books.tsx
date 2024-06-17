import React, { useState, useEffect, useRef } from 'react';
import { Box, Grid, CircularProgress } from '@mui/material';
import GridItem from './gridItem';
import SnackbarMessage from './snackBarMessage';
import loadMoreBooks from './bookLoader';
import { Book, DataProps, useDeleteBook } from '../../../types';
import { useBooksContext } from './contexts/books';

const ReadingList: React.FC<DataProps> = ({ data }) => {
  const { localBooks, setLocalBooks } = useBooksContext();
  const [displayedBooks, setDisplayedBooks] = useState<Book[]>([]);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [seenAllBooks, setSeenAllBooks] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const { handleDelete, deleteLoading, deletingBook, deletedBookTitle } = useDeleteBook();

  const BOOKS_PER_PAGE = 10;

  useEffect(() => {
    if (data?.books) {
      setLocalBooks(data.books);
      setDisplayedBooks(data.books.slice(0, BOOKS_PER_PAGE));
      setPage(1);
      setSeenAllBooks(data.books.length <= BOOKS_PER_PAGE);
    }
  }, [data, setLocalBooks]);

  useEffect(() => {
    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && !seenAllBooks && !isLoading) {
        loadMoreBooks(localBooks, page, setDisplayedBooks, setIsLoading, setSeenAllBooks);
        setPage(prevPage => prevPage + 1);
      }
    };

    const observer = new IntersectionObserver(handleObserver, { threshold: 1.0 });
    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [localBooks, page, seenAllBooks, isLoading]);

  useEffect(() => {
    if (deletedBookTitle) {
      setShowSnackbar(true);
      const newBooks = localBooks.slice(0, page * BOOKS_PER_PAGE);
      setDisplayedBooks(newBooks);
      if (newBooks.length < localBooks.length) {
        setSeenAllBooks(false);
      }
    }
  }, [deletedBookTitle]);

  return (
    <Box sx={{
      paddingBottom: { xs: 5, sm: 7, md: 9 },
      paddingX: { xs: 1, sm: 2, md: 7 },
      mt: { xs: 9, sm: 10, md: 15 },
      overflow: 'hidden' }}
    >
      {displayedBooks && displayedBooks.length > 0 && (
        <Grid 
          container 
          spacing={{ xs: 2, sm: 3, md: 4 }}
          columns={{ xs: 8, sm: 11, md: 17 }}
        >
          {displayedBooks.map((book, index) => (
            <GridItem
              key={index}
              book={book}
              onDelete={() => handleDelete(book.title, book.author, localBooks, setLocalBooks, setDisplayedBooks)}
              deleting={deletingBook?.title === book.title && deletingBook?.author === book.author && deleteLoading}
            />
          ))}
        </Grid>
      )}
      {isLoading && (
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          mt: 2 }}
        >
          <CircularProgress />
        </Box>
      )}
      <div ref={loaderRef} />
      <SnackbarMessage
        open={showSnackbar}
        onClose={() => setShowSnackbar(false)}
        message={`Successfully deleted "${deletedBookTitle}"`}
      />
    </Box>
  );
};

export default ReadingList;
