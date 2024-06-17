import { useState } from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import { Paper, TextField } from '@mui/material';

export interface Book {
  title: string;
  author: string;
  coverPhotoURL: string;
  readingLevel: string;
}
  
export interface DataProps {
  data: { books: Book[] } | null;
}

export const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export const CustomTextField = styled(TextField)(() => ({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#335C6E',
    },
    '&:hover fieldset': {
      borderColor: '#335C6E',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#335C6E',
    },
  },
  '& .MuiInputLabel-root': {
    color: '#335C6E',
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: '#335C6E',
  },
}));

export const useDeleteBook = () => {
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deletingBook, setDeletingBook] = useState<{ title: string; author: string } | null>(null);
  const [deletedBookTitle, setDeletedBookTitle] = useState<string | null>(null);
  const [showSnackbar, setShowSnackbar] = useState(false);

  const handleDelete = async (title: string, author: string, localBooks: Book[], setLocalBooks: React.Dispatch<React.SetStateAction<Book[]>>, setDisplayedBooks: React.Dispatch<React.SetStateAction<Book[]>>) => {
    setDeleteLoading(true);
    setDeletingBook({title, author});
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLocalBooks(prevBooks => prevBooks.filter(book => !(book.title === title && book.author === author)));
    setDisplayedBooks(prevBooks => prevBooks.filter(book => !(book.title === title && book.author === author)));
    setDeleteLoading(false);
    setDeletingBook(null);
    setDeletedBookTitle(title);
    setShowSnackbar(true);
  };

  return { handleDelete, deleteLoading, deletingBook, deletedBookTitle };
};

