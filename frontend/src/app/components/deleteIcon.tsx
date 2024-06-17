import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const ResponsiveDeleteIcon = () => {
  const theme = useTheme();

  const isXs = useMediaQuery(theme.breakpoints.down('xs'));
  const isSm = useMediaQuery(theme.breakpoints.between('xs', 'sm'));
  const isMd = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isLg = useMediaQuery(theme.breakpoints.between('md', 'lg'));
  const isXl = useMediaQuery(theme.breakpoints.up('lg'));

  let fontSize: "small" | "medium" | "large" | "inherit" = 'inherit';

  if (isXs) {
    fontSize = 'small';
  } else if (isSm) {
    fontSize = 'small';
  } else if (isMd) {
    fontSize = 'medium';
  } else if (isLg || isXl) {
    fontSize = 'large';
  }

  return (
    <DeleteIcon fontSize={fontSize} sx={{ background: '#FFF' }} />
  );
};

export default ResponsiveDeleteIcon;
