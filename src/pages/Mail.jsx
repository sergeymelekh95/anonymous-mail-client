import { ModalMessage } from '../components/ModalMessage';
import { IconButton, Stack, Toolbar, Typography } from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { useContext, useState } from 'react';
import { MessagesList } from '../components/MessagesList';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../App';

export const Mail = ({ setReconnect }) => {
    const { messages, connected, handleUserName, setUserName } =
        useContext(GlobalContext);

    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        if (!connected) {
            const username = sessionStorage.getItem('username');

            if (username) {
                setUserName(username);
                setReconnect(true);
            } else {
                navigate('/login');
                handleUserName('');
            }
        }
    }, []);

    return (
        <Stack spacing={10} style={{ width: '100%' }}>
            <Toolbar
                style={{ display: 'flex', justifyContent: 'start', mb: 20 }}
            >
                <IconButton onClick={handleOpen} variant='outlined'>
                    <MailOutlineIcon color='primary' fontSize='large' />
                </IconButton>
            </Toolbar>

            {messages.length ? (
                <MessagesList messages={messages} title={'My messages'} />
            ) : (
                <Typography variant='h5' style={{ textAlign: 'center' }}>
                    You don't have messages
                </Typography>
            )}

            <ModalMessage handleClose={handleClose} open={open} />
        </Stack>
    );
};
