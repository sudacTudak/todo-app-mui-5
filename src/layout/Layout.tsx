import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material';
import { LayoutProps } from './Layout.props';

export const Layout = ({ children }: LayoutProps) => {
  return (
    <Box
      sx={{
        height: '100%'
      }}
    >
      <AppBar sx={{ bgcolor: 'background.default' }}>
        <Toolbar>
          <Typography variant="h5" color="primary.light" fontWeight="700">
            WhatTodo
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          bgcolor: 'primary.light'
        }}
      >
        <Container maxWidth="md">
          <Box
            sx={{
              p: '10px',
              borderRadius: '10px',
              bgcolor: 'background.default',
              height: '50vh'
            }}
          >
            {children}
          </Box>
        </Container>
      </Box>
    </Box>
  );
};
