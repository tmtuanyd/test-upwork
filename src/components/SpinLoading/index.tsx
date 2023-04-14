import React from 'react';
import { Box, CircularProgress } from '@mui/material';

const SpinLoading = () => {
  return (
    <Box
      justifyContent='center'
      width='100%'
      height='100%'
      display='flex'
      alignItems='center'
    >
      <CircularProgress />
    </Box>
  );
};

export default SpinLoading;
