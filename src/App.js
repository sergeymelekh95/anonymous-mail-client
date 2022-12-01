import io from 'socket.io-client';
import { createContext, useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { ConnectForm } from './pages/ConnectForm';
import { Messenger } from './pages/Messenger';
import { Header } from './components/Header';
import { NotFound } from './pages/NotFound';
import { useSnackbar } from 'notistack';
import { BASE_URL } from './config';

export const GlobalContext = createContext();

export const App = () => {
    const navigate = useNavigate();

    const [connectedUser, setConnectedUser] = useState('');
    const [userName, setUserName] = useState('');
    const [connected, setConnected] = useState(false);
    const [messages, setMessages] = useState([]);
    const [socket, setSocket] = useState(null);
    const [loading, setLoading] = useState(false);
    const [registeredUsers, setRegsisteredUsers] = useState([]);
    const [historyMsgs, setHistoryMsgs] = useState([]);

    const { enqueueSnackbar } = useSnackbar();

    const handleChange = (event) => setUserName(event.target.value);

    const connect = (event) => {
        setLoading(true);

        const socket = io.connect(BASE_URL);

        setSocket(socket);

        socket.emit('login', userName, ({ username, users, msgs }) => {
            setMessages(msgs);
            setConnectedUser(username);
            setRegsisteredUsers(users);
            setLoading(false);
            setConnected(true);
        });

        socket.on('newMessage', (message, callback) => {
            setMessages((prev) => [message, ...prev]);
            enqueueSnackbar('You got a message');
        });

        socket.on('history', (msgs, callback) => {
            setHistoryMsgs(msgs);
        });
    };

    useEffect(() => {
        if (connected) {
            navigate('/messenger');
        }
    }, [connected, navigate]);

    useEffect(() => {}, [messages]);

    return (
        <GlobalContext.Provider
            value={{
                connectedUser,
                setConnectedUser,
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
                registeredUsers,
                setRegsisteredUsers,
                historyMsgs,
                setHistoryMsgs,
            }}
        >
            <Header connectedUser={connectedUser} />
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
                        element={<Navigate to={'/connect'} />}
                    ></Route>
                    <Route
                        path='/connect'
                        element={
                            <ConnectForm
                                handleChange={handleChange}
                                userName={userName}
                                connect={connect}
                                loading={loading}
                            />
                        }
                    ></Route>
                    <Route
                        path='/messenger'
                        element={
                            <Messenger
                                messages={messages}
                                connected={connected}
                            />
                        }
                    ></Route>
                    <Route path='*' element={<NotFound />}></Route>
                </Routes>
            </div>
        </GlobalContext.Provider>
    );
};
