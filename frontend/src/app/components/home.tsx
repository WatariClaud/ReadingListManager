"use client"
import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import styles from "../page.module.css";
import SearchBarAndResults from "./search";
import ReadingList from "./books";
import Loading from './loading';
import client from '../apolloClient';
import { gql, useQuery } from '@apollo/client';
import { useBooksContext } from './contexts/books';

const GET_BOOKS = gql`
  query Books {
    books {
      author
      coverPhotoURL
      readingLevel
      title
    }
  }
`;

const Home: React.FC = () => {

  const { loading, error, data } = useQuery(GET_BOOKS, {
    client,
  });

  const { localBooks } = useBooksContext();

  return (
      <main className={styles.main}>
        {loading && <Loading/>}
        {error && <Typography sx={{ 
          color: '#F76434',
          fontWeight: 'bold',
          height: '50px' }}
          >
            An error occured: {error.message}
          </Typography>}

        {data && data?.books.length > 0 ? (
          <Grid container direction="column">
            <Grid item xs="auto">
              <SearchBarAndResults data={{books: localBooks}} />
            </Grid>
            <Grid item xs>
            <Box sx={{ height: '100%', overflow: 'auto', mt: 1 }}>
              <ReadingList data={localBooks.length > 0 ? { books: localBooks } : data} />
            </Box>
            </Grid>
          </Grid>
        ) : data && data?.books.length === 0 ? (
          <Typography sx={{
            color: '#F76434',
            fontWeight: 'bold',
            height: '50px' }}
          >
            Oops, No books available.<br/>Server responded with empty reading list.
          </Typography>
        ) : null}
      </main>
  );
}

export default Home;