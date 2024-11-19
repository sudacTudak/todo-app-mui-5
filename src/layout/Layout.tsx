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
      <Container maxWidth="md">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            rowGap: '30px'
          }}
        >
          <Typography
            component="h1"
            variant="h1"
            noWrap
            sx={{
              alignSelf: 'center',
              padding: '0 15px',
              borderBottomWidth: '3px',
              borderBottomStyle: 'solid',
              borderBottomColor: 'primary.light',
              fontWeight: 700,
              color: 'primary.light'
            }}
          >
            TodoApp
          </Typography>
          <Box
            sx={{
              height: '50vh',
              padding: '10px',
              borderRadius: '10px',
              bgcolor: 'background.default'
            }}
          >
            {children}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
