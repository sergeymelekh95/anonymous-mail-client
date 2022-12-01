import { SendForm } from '../components/SendForm';
import { IconButton, Stack, Toolbar, Typography } from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { useState } from 'react';
import { MessagesList } from '../components/MessagesList';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Messenger = ({
    connected,
    messages,
}) => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        if (!connected) navigate('/connect');
    }, [connected, navigate]);

    return (
        <Stack spacing={10} style={{ width: '100%' }}>
            <Toolbar
                style={{ display: 'flex', justifyContent: 'start', mb: 20 }}
            >
                <IconButton onClick={handleOpen} variant='outlined'>
                    <MailOutlineIcon fontSize='large' />
                    <Typography>Create Message</Typography>
                </IconButton>
            </Toolbar>

            {messages.length ? (
                <MessagesList messages={messages} title={'My messages'} />
            ) : (
                'you do not have messages'
            )}

            <SendForm
                handleClose={handleClose}
                open={open}
            />
        </Stack>
    );
};
