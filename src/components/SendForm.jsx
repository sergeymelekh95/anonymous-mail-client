import { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import {
    Autocomplete,
    IconButton,
    Paper,
    Stack,
    TextField,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect } from 'react';
import Link from '@mui/material/Link';
import { MessagesList } from './MessagesList';
import { GlobalContext } from '../App';
import { useSnackbar } from 'notistack';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '85%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 5,
};

const initialData = {
    theme: '',
    text: '',
    senderName: '',
    receiverName: null,
};

export const SendForm = ({ open, handleClose }) => {
    const { setHistoryMsgs, historyMsgs, registeredUsers, socket, userName } =
        useContext(GlobalContext);

    const [message, setMessage] = useState(initialData);
    const [sentMessage, setSentMessage] = useState(false);
    const [showHistoryMessages, setShowHistoryMessages] = useState(false);
    const [valid, setValid] = useState(false);

    const { enqueueSnackbar } = useSnackbar();

    const handleChange = (event) => {
        const target = event.target;

        setMessage({ ...message, [target.name]: target.value });
        setShowHistoryMessages(false);
        setHistoryMsgs([]);
        setSentMessage(false);

        const { theme, text, senderName, receiverName } = message;

        if (theme && text && senderName && receiverName) {
            setValid(true);
        } else {
            setValid(false);
        }
    };

    const getHistoryMessages = () => {
        const { senderName, receiverName } = message;

        socket.emit('history-messages', { senderName, receiverName });

        setShowHistoryMessages(!showHistoryMessages);
    };

    const sendMessage = async () => {
        socket.emit('message', message);

        enqueueSnackbar('Message sent successfully', { variant: 'success' });

        //clear form
        setMessage({...message, theme: '', text: '' });
        setSentMessage(true);
        setShowHistoryMessages(false);
        setValid(false);
    };

    useEffect(() => setMessage({ ...message, senderName: userName }), []);

    useEffect(() => {
        if (!open) setSentMessage(false);
    }, [open]);

    useEffect(() => {}, [historyMsgs]);

    return (
        <Modal open={open} onClose={handleClose}>
            <Box component='div' sx={style}>
                <Stack spacing={3}>
                    <div style={{ textAlign: 'end' }}>
                        <IconButton onClick={handleClose}>
                            <CloseIcon fontSize='large' />
                        </IconButton>
                    </div>
                    <Autocomplete
                        id='receiverName'
                        freeSolo
                        onChange={(event, value) => {
                            setMessage({ ...message, receiverName: value });
                            setSentMessage(false);
                        }}
                        options={registeredUsers.map(
                            (option) => option.username
                        )}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                name='receiverName'
                                label='Receiver'
                            />
                        )}
                    />
                    <TextField
                        label='Theme'
                        fullWidth
                        onChange={handleChange}
                        value={message.theme}
                        name='theme'
                        id='theme'
                        variant='outlined'
                    />
                    <TextField
                        id='text'
                        label='text'
                        onChange={handleChange}
                        value={message.text}
                        name='text'
                        multiline
                        rows={7}
                        variant='outlined'
                    />
                    <div style={{ textAlign: 'end' }}>
                        <IconButton disabled={!valid} onClick={sendMessage}>
                            <SendIcon fontSize='large' />
                        </IconButton>
                    </div>
                    {!!sentMessage && (
                        <Link component='button' onClick={getHistoryMessages}>
                            {showHistoryMessages ? 'Hide' : 'Show'} all messages
                            sent to this user
                        </Link>
                    )}
                    {!!showHistoryMessages && (
                        <Paper style={{ maxHeight: 300, overflow: 'auto' }}>
                            <MessagesList
                                messages={historyMsgs}
                                title='Sent messages'
                            />
                        </Paper>
                    )}
                </Stack>
            </Box>
        </Modal>
    );
};
