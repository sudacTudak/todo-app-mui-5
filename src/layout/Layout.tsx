import { Box, Container, Typography } from '@mui/material';
import { LayoutProps } from './Layout.props';

export const Layout = ({ children }: LayoutProps) => {
  return (
    <Box
      sx={{
        backgroundColor: '#EEEEEE',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <Typography
            component="h1"
            variant="h2"
            noWrap
            sx={{
              fontWeight: 700,
              color: 'primary.light',
              padding: '0 15px',
              borderBottomWidth: '3px',
              borderBottomStyle: 'solid',
              borderBottomColor: 'primary.light'
            }}
          >
            TodoApp
          </Typography>
        </Box>
        <Box
          sx={{
            padding: '10px'
          }}
        >
          {children}
        </Box>
      </Container>
    </Box>
  );
};
