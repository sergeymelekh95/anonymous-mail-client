import { Autocomplete, TextField } from '@mui/material';

export const AutocompleteSelect = ({
    setMessage,
    message,
    setSentMessage,
    onFocus,
    error,
    handleChange,
    registeredUsers
}) => {

    return (
        <Autocomplete
            id='receiverName'
            freeSolo
            onChange={(event, value) => {
                setMessage({ ...message, receiverName: value });
                setSentMessage(false);
            }}
            size="small"
            options={registeredUsers.map((option) => option.username)}
            renderInput={(params) => (
                <TextField
                    {...params}
                    onFocus={onFocus}
                    error={error}
                    onChange={handleChange}
                    value={message.receiverName}
                    name='receiverName'
                    label='Receiver'
                />
            )}
        />
    );
};
