import io from 'socket.io-client';
import { createContext, useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { LoginForm } from './pages/LoginForm';
import { Mail } from './pages/Mail';
import { Header } from './components/Header';
import { NotFound } from './pages/NotFound';
import { useSnackbar } from 'notistack';
import { BASE_URL } from './config';

export const GlobalContext = createContext();

export const App = () => {
    const navigate = useNavigate();

    const [userName, setUserName] = useState('');
    const [loginedUser, setLoginedUser] = useState('');
    const [connected, setConnected] = useState(false);
    const [messages, setMessages] = useState([]);
    const [socket, setSocket] = useState(null);
    const [loading, setLoading] = useState(false);
    const [historyMsgs, setHistoryMsgs] = useState([]);
    const [reconnect, setReconnect] = useState(false);

    const { enqueueSnackbar } = useSnackbar();

    const handleUserName = (event) => setUserName(event.target.value.trim());

    const connect = () => {
        setLoading(true);

        const socket = io.connect(BASE_URL);

        setSocket(socket);

        socket.emit('login', userName, ({ username, msgs }) => {
            sessionStorage.setItem('username', username);

            setLoginedUser(username);
            setMessages(msgs);
            setLoading(false);
            setConnected(true);
        });

        socket.on('newMessage', (message, callback) => {
            setMessages((prev) => [message, ...prev]);
            enqueueSnackbar('You got a message');
            //всунуть сюда сообщение
        });

        socket.on('history', (msgs, callback) => {
            setHistoryMsgs(msgs);
        });
    };

    useEffect(() => {
        if (connected) navigate('/mail');
    }, [connected]);

    useEffect(() => {}, [messages]);

    useEffect(() => {
        if (reconnect) {
            connect();
            setReconnect(false);
        }
    }, [reconnect]);

    return (
        <GlobalContext.Provider
            value={{
                userName,
                setUserName,
                connected,
                setConnected,
                messages,
                setMessages,
                socket,
                setSocket,
                loading,
                setLoading,
                historyMsgs,
                setHistoryMsgs,
                handleUserName,
                connect,
                loginedUser,
                setLoginedUser
            }}
        >
            <Header />
            <div
                className='App'
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <Routes>
                    <Route
                        path='/'
                        element={<Navigate to={'/login'} />}
                    ></Route>
                    <Route
                        path='/login'
                        element={<LoginForm loading={loading} />}
                    ></Route>
                    <Route
                        path='/mail'
                        element={<Mail setReconnect={setReconnect} />}
                    ></Route>
                    <Route path='*' element={<NotFound />}></Route>
                </Routes>
            </div>
        </GlobalContext.Provider>
    );
};
