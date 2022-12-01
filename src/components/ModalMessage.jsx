import { useContext, useState, useEffect } from 'react';
import {
    IconButton,
    Paper,
    Stack,
    TextField,
    Box,
    Modal,
    Link,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { MessagesList } from './MessagesList';
import { GlobalContext } from '../App';
import { useSnackbar } from 'notistack';
import CloseIcon from '@mui/icons-material/Close';
import { AutocompleteSelect } from './Autocomplete';

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

export const ModalMessage = ({ open, handleClose }) => {
    const { setHistoryMsgs, historyMsgs, socket, userName } =
        useContext(GlobalContext);

    const [message, setMessage] = useState(initialData);
    const [sentMessage, setSentMessage] = useState(false);
    const [showHistoryMessages, setShowHistoryMessages] = useState(false);
    const [error, setError] = useState(false);
    const [registeredUsers, setRegisteredUsers] = useState([]);

    const { enqueueSnackbar } = useSnackbar();

    const handleChange = (event) => {
        const target = event.target;

        setMessage({ ...message, [target.name]: target.value });
        setShowHistoryMessages(false);
        setHistoryMsgs([]);
        setSentMessage(false);
    };

    const getHistoryMessages = () => {
        const { senderName, receiverName } = message;

        socket.emit('history-messages', { senderName, receiverName });

        setShowHistoryMessages(!showHistoryMessages);
    };

    const sendMessage = async (e) => {
        if (
            registeredUsers.find(
                (registeredUser) =>
                    registeredUser.username === message.receiverName
            )
        ) {
            socket.emit('message', message);

            enqueueSnackbar('Message sent successfully', {
                variant: 'success',
            });

            setMessage({ ...message, theme: '', text: '' });
            setSentMessage(true);
            setShowHistoryMessages(false);
            setError(false);
        } else {
            setError(true);
        }
    };

    const onFocus = () => {
        socket.emit('users', '', (users) => {
            setRegisteredUsers(users);
        });
    };

    useEffect(
        () =>
            setMessage({
                ...message,
                senderName: userName || sessionStorage.getItem('username'),
            }),
        []
    );

    useEffect(() => {
        if (!open) setSentMessage(false);
    }, [open]);

    useEffect(() => {}, [historyMsgs]);

    return (
        <Modal open={open} onClose={handleClose}>
            <Box component='div' sx={style}>
                <Stack spacing={1}>
                    <div style={{textAlign: 'end'}}>
                        <IconButton onClick={handleClose}>
                            <CloseIcon fontSize='large' />
                        </IconButton>
                    </div>
                    <AutocompleteSelect
                        setMessage={setMessage}
                        message={message}
                        setSentMessage={setSentMessage}
                        registeredUsers={registeredUsers}
                        onFocus={onFocus}
                        error={error}
                        handleChange={handleChange}
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
                        <IconButton onClick={sendMessage}>
                            <SendIcon color="primary" fontSize='large' />
                        </IconButton>
                    </div>
                    {!!error && (
                        <p style={{ color: 'red' }}>Error, user in not found</p>
                    )}
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
