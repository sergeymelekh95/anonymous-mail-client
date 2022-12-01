import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useState } from 'react';
import { List } from '@mui/material';
import { PreviewMessage } from './PreviewMessage';

export const Message = ({ _id, senderName, sentAt, theme, text }) => {
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <>
            <ListItemButton onClick={handleClick}>
                <ListItemText
                    primary={
                        <PreviewMessage
                            senderName={senderName}
                            sentAt={sentAt}
                            theme={theme}
                        />
                    }
                />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout='auto' unmountOnExit>
                <List component='div' disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemText primary={text} />
                    </ListItemButton>
                </List>
            </Collapse>
        </>
    );
};
