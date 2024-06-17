import React from 'react';
import { Snackbar } from '@mui/material';

interface SnackbarMessageProps {
  open: boolean;
  onClose: () => void;
  message: string;
}

const SnackbarMessage: React.FC<SnackbarMessageProps> = ({ open, onClose, message }) => (
  <Snackbar
    open={open}
    autoHideDuration={3000}
    onClose={onClose}
    message={message}
  />
);

export default SnackbarMessage;
