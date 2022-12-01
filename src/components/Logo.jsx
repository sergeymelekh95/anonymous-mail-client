import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';

export const Logo = ({ handleClose }) => {
    return (
        <div style={{ textAlign: 'end' }}>
            <IconButton onClick={handleClose}>
                <CloseIcon fontSize='large' />
            </IconButton>
        </div>
    );
};
