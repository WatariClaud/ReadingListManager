import React, { useState, ChangeEvent, useRef, useEffect } from 'react';
import { List, ListItem, ListItemText, ListItemAvatar, Avatar, Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import { Book, DataProps, CustomTextField } from '../../../types';

const SearchPage: React.FC<DataProps> = ({ data }) => {
  const [query, setQuery] = useState<string>('');
  const [showResults, setShowResults] = useState<boolean>(false);
  const searchBoxRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const theme = useTheme();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    setShowResults(true);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (inputRef.current && inputRef.current.contains(event.target as Node)) setShowResults(true);
    else if (searchBoxRef.current && !searchBoxRef.current.contains(event.target as Node)) setShowResults(false);
  };

  const filteredBooks = data?.books.filter((book: Book) =>
    book.title.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const isXs = useMediaQuery(theme.breakpoints.down('xs'));
  const isSm = useMediaQuery(theme.breakpoints.between('xs', 'sm'));
  const isMd = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isLg = useMediaQuery(theme.breakpoints.between('md', 'lg'));
  const isXl = useMediaQuery(theme.breakpoints.up('lg'));

  let fontSize: string = '20px';
  let listFontSize: string = '22px';

  if (isXs) {
    fontSize = '10px';
    listFontSize = '10px';
  } else if (isSm) {
    fontSize = '12px';
    listFontSize = '12px';
  } else if (isMd) {
    fontSize = '14px';
    listFontSize = '14px';
  } else if (isLg) {
    fontSize = '15px';
    listFontSize = '15px';
  } else if (isXl) {
    fontSize = '16px';
    listFontSize = '16px';
  }

  return (
    <Box sx={{ 
      position: 'fixed', left: '0', top: '0',
      width: '100%',
      zIndex: 1000,
      backgroundColor: '#FFF',
      borderBottom: '1px solid #335C6E',
      maxHeight: '110px', p: 2 
    }}>
      <Box
        ref={searchBoxRef}
        sx={{
          width: '40%',
          transform: 'translateX(75%)',
          [theme.breakpoints.down('sm')]: {
            width: '90%',
            transform: 'translateX(5%)',
          },
        }}
      >
        <CustomTextField
          inputRef={inputRef}
          id="book-name"
          label="Search Book Title"
          variant="outlined"
          sx={{
            width: '100%',
            mt: 3,
            fontSize,
            color: '#335C6E',
            '& input:-webkit-autofill': {
              WebkitBoxShadow: '0 0 0 30px #FFF inset',
              WebkitTextFillColor: '#335C6E',
            },
          }}
          value={query}
          onChange={handleInputChange}
        />
        {showResults && query && filteredBooks && filteredBooks.length > 0 ? (
          <List sx={{ width: '100%', background: '#FFF', border: '1px solid #335C6E', maxHeight: '70vh', overflow: 'auto' }}>
            {filteredBooks.map((book: Book, index: number) => (
              <ListItem key={index} sx={{ fontSize: listFontSize }}>
                <ListItemAvatar>
                  <Avatar alt={book.title} src={book.coverPhotoURL} />
                </ListItemAvatar>
                <ListItemText
                  primary={book.title}
                  secondary={`${book.author}, Level: ${book.readingLevel}`}
                  primaryTypographyProps={{ fontSize: listFontSize }}
                  secondaryTypographyProps={{ fontSize: listFontSize }}
                  sx={{color: '#335C6E'}}
                />
              </ListItem>
            ))}
          </List>
        ) : (
          showResults && query && filteredBooks && filteredBooks.length === 0 && (
          <Box sx={{ 
            backgroundColor: '#FFF',
            border: '1px solid #335C6E', p: 2 }}
          >
            <Typography
              sx={{
              color: '#F76434',
              fontSize: 20,
              mt: 2 }} 
            >
              No results
            </Typography>
          </Box>)
        )}
      </Box>
    </Box>
  );
};

export default SearchPage;
