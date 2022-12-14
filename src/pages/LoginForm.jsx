import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Grid, TextField, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../App';

export const LoginForm = ({ loadingLogin }) => {
    const {
        userName,
        connected,
        socket,
        setConnected,
        handleUserName,
        connect,
        setLoginedUser,
    } = useContext(GlobalContext);

    const [error, setError] = useState(false);

    const handleConnect = () => {
        if (userName.length > 1) {
            connect();
            setError(false);
        } else {
            setError(true);
        }
    };

    useEffect(() => {
        if (socket && connected) {
            sessionStorage.removeItem('username');
            setConnected(false);
            setLoginedUser('');
            socket.disconnect();
        }
    }, []);

    return (
        <Grid
            container
            spacing={0}
            direction='column'
            alignItems='center'
            justifyContent='center'
            style={{ minHeight: '90vh' }}
        >
            <Grid item xs={3}>
                <Box
                    component='form'
                    sx={{
                        '& > :not(style)': { m: 1, width: '25ch' },
                    }}
                    style={{
                        padding: 20,
                        maxWidth: 500,
                        border: '1px solid rgb(203 203 203)',
                        boxShadow: '9px 8px 19px 0px rgba(0,0,0,0.58)',
                        borderRadius: 15,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                    noValidate
                    autoComplete='off'
                >
                    <Typography
                        variant='h6'
                        component='h6'
                        textAlign='center'
                        style={{ marginBottom: 20 }}
                    >
                        Welcome!
                    </Typography>
                    <Typography style={{ textAlign: 'center' }} component='p'>
                        Please, enter you name
                    </Typography>
                    <TextField
                        error={error}
                        value={userName}
                        onChange={handleUserName}
                        id='userName'
                        label='username'
                        variant='outlined'
                    />
                    <LoadingButton
                        loading={loadingLogin}
                        onClick={handleConnect}
                        variant='contained'
                    >
                        Connect
                    </LoadingButton>
                </Box>
            </Grid>
        </Grid>
    );
};
