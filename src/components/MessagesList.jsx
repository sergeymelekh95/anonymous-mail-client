import List from '@mui/material/List';
import { Message } from './Message';
import { Typography } from '@mui/material';

export const MessagesList = ({ messages, title }) => {
    return (
        <List
            sx={{
                width: '100%',
                bgcolor: 'background.paper',
                textAlign: 'center',
            }}
            subheader={
                <Typography
                    component='h5'
                    variant='h5'
                    color='rgba(0, 0, 0, 0.7)'
                >
                    {title}
                </Typography>
            }
        >
            {messages.map((message, index) => (
                <Message
                    key={message._id}    
                    {...message}
                />
            ))}
        </List>
    );
};
