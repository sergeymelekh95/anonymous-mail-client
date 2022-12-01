export const PreviewMessage = ({ senderName, sentAt, theme }) => {
    const addZero = (num) => (num < 10 ? `0${num}` : num);

    const getUserDate = (ms) => {
        const date = new Date(ms);
        return `${addZero(date.getDate())}.${addZero(
            date.getMonth() + 1
        )}.${date.getFullYear()} / ${addZero(date.getHours())}:${addZero(
            date.getMinutes()
        )}`;
    };

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                color: 'rgba(0, 0, 0, 0.6)',
            }}
        >
            <div style={{display: 'flex'}}>
                <div style={{marginRight: 20}}>FROM {senderName};</div>
                <div>THEME {theme};</div>
            </div>
            <div>SENT: {getUserDate(sentAt)}</div>
        </div>
    );
};
