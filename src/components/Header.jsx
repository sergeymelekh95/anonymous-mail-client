import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { GlobalContext } from '../App';

export const Header = () => {
    const { loginedUser } = useContext(GlobalContext);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position='static'>
                <Toolbar>
                    <Typography
                        variant='h6'
                        component='div'
                        sx={{ flexGrow: 1 }}
                    >
                        <Link to='/login'>Anonymous email</Link>
                    </Typography>
                    <Typography>{loginedUser}</Typography>
                </Toolbar>
            </AppBar>
        </Box>
    );
};
