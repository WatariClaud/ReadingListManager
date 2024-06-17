import React from 'react';
import { Grid, Avatar, Typography, IconButton, CircularProgress, Tooltip, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Book, Item } from '../../../types';
import ResponsiveDeleteIcon from './deleteIcon';

interface GridItemProps {
  book: Book;
  onDelete: (title: string, author: string) => void;
  deleting: boolean;
}

const GridItem: React.FC<GridItemProps> = ({ book, onDelete, deleting }) => (
<Grid item xs={2} sm={4} md={4} sx={{ minWidth: {xs: '150px', sm: '170px', md: '200px'} }}>
    <Item sx={{ cursor: 'pointer', position: 'relative' }}>
      {deleting && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'rgba(255, 255, 255, 0.7)',
            zIndex: 1,
          }}
        >
          <CircularProgress size={32} />
        </Box>
      )}
      <Tooltip title="Delete" placement="top">
        <IconButton
          onClick={() => onDelete(book.title, book.author)}
          sx={{ position: 'absolute', top: 0, right: 0, zIndex: 2, color: '#F76434' }}
        >
          <ResponsiveDeleteIcon />
        </IconButton>
      </Tooltip>
      <Avatar
        alt={book.title}
        src={book.coverPhotoURL}
        sx={{ width: '100%', height: 'auto', borderRadius: 0, marginBottom: {xs: 1, sm: 1, md: 2}, opacity: 0.7 }}
        variant="square"
      />
      <Typography sx={{ color: '#335C6E', fontWeight: 'bold', height: {xs: '30px', sm: '45px', md: '55px'}, fontSize: { xs: '0.55rem', sm: '0.62rem', md: '0.8rem' } }}>
        {book.title}
      </Typography>
      <Typography sx={{ color: '#5ACCCC', fontSize: { xs: '0.55rem', sm: '0.62rem', md: '0.8rem' } }}>
        {book.author}, Level: {book.readingLevel}
      </Typography>
    </Item>
  </Grid>
);

export default GridItem;
