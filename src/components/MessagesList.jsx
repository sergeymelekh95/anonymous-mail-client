import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import { Message } from './Message';

export const MessagesList = ({ messages, title }) => {
    return (
        <List
            sx={{
                width: '100%',
                bgcolor: 'background.paper',
                textAlign: 'center',
            }}
            subheader={
                <ListSubheader
                    component='h3'
                    variant='h3'
                    id='nested-list-subheader'
                >
                    {title}
                </ListSubheader>
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
