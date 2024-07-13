import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#3f51b5',
        },
        secondary: {
            main: '#f50057',
        },
    },
    typography: {
        h4: {
            fontFamily: 'Inika, serif',
        },
        h6: {
            fontFamily: 'Inika, serif',
        },
    },
    components: {
        MuiTableCell: {
            styleOverrides: {
                root: {
                    padding: '16px',
                    fontSize: '16px',
                },
                head: {
                    backgroundColor: '#3f51b5',
                    color: '#fff',
                },
            },
        },
    },
});

export default theme;
