import LoadingButton from '@mui/lab/LoadingButton';
import { Box, TextField, Typography } from '@mui/material';

export const ConnectForm = ({ connect, userName, handleChange, loading }) => {
    return (
        <Box
            component='form'
            sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
            }}
            style={{
                padding: 20,
                marginTop: 200,
                maxWidth: 500,
                border: '1px solid rgb(203 203 203)',
                boxShadow: '9px 8px 19px 0px rgba(0,0,0,0.58)',
                borderRadius: 15,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
            noValidate
            autoComplete='off'
        >
            <Typography
                variant='h3'
                component='h3'
                textAlign='center'
                style={{ marginBottom: 50 }}
            >
                Hi
            </Typography>
            <Typography style={{ textAlign: 'center' }} component='p'>
                Enter you name
            </Typography>
            <TextField
                value={userName}
                onChange={handleChange}
                id='userName'
                label='username'
                variant='outlined'
            />
            <LoadingButton loading={loading} onClick={connect} variant='contained'>
                Connect
            </LoadingButton>
        </Box>
    );
};
