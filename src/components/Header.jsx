import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
// import MenuIcon from '@mui/icons-material/Menu';

export const Header = ({connectedUser}) => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position='static'>
                <Toolbar >
                    <Typography
                        variant='h6'
                        component='div'
                        sx={{ flexGrow: 1 }}
                    >
                        Anonymous email
                    </Typography>
                    <Typography>{connectedUser}</Typography>
                </Toolbar>
            </AppBar>
        </Box>
    );
};
