import io from 'socket.io-client';
import { createContext, useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { LoginForm } from './pages/LoginForm';
import { Mail } from './pages/Mail';
import { Header } from './components/Header';
import { Loader } from './components/Loader';
import { NotFound } from './pages/NotFound';
import { useSnackbar } from 'notistack';
import { BASE_URL } from './config';

export const GlobalContext = createContext();

export const App = () => {
    const navigate = useNavigate();

    const [userName, setUserName] = useState('');
    const [loginedUser, setLoginedUser] = useState('');
    const [loading, setLoading] = useState(false);
    const [connected, setConnected] = useState(false);
    const [messages, setMessages] = useState([]);
    const [socket, setSocket] = useState(null);
    const [loadingLogin, setLoadingLogin] = useState(false);
    const [historyMsgs, setHistoryMsgs] = useState([]);
    const [reconnect, setReconnect] = useState(false);

    const { enqueueSnackbar } = useSnackbar();

    const handleUserName = (event) => setUserName(event.target.value.trim());

    const connect = () => {
        setLoadingLogin(true);

        const socket = io.connect(BASE_URL);

        setSocket(socket);

        socket.emit('login', userName, ({ username, msgs }) => {
            sessionStorage.setItem('username', username);

            setLoginedUser(username);
            setMessages(msgs);
            setLoadingLogin(false);
            setLoading(false);
            setConnected(true);
        });

        socket.on('newMessage', (message, callback) => {
            setMessages((prev) => [message, ...prev]);
            enqueueSnackbar(`FROM: ${message.senderName} MESSAGE: ${message.text}`);
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
            setLoading(true);
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
                historyMsgs,
                setHistoryMsgs,
                handleUserName,
                connect,
                loginedUser,
                setLoginedUser,
            }}
        >
            <Header />
            <Loader loading={loading} />
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
                        element={<LoginForm loadingLogin={loadingLogin} />}
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
