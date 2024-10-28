import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Box, Typography, TextField, Button, List, ListItem, ListItemText, Paper } from '@mui/material';
import Header from '../components/Header';
import Footer from './Footer.jsx';

const ChatBox = () => {
    const { userId } = useParams();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [chatUser, setChatUser] = useState(null);
    const loggedInUsername = localStorage.getItem('username');
    const messagesEndRef = useRef(null);

    useEffect(() => {

        const fetchChatUser = async () => {
            const token = localStorage.getItem('token');
            try {
                const { data } = await axios.get(`http://localhost:5000/chat/user/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setChatUser(data.username);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        const fetchMessages = async () => {
            const token = localStorage.getItem('token');
            try {
                const { data } = await axios.get(`http://localhost:5000/chat/messages/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setMessages(data);
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        fetchChatUser();
        fetchMessages();
    }, [userId]);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const handleSendMessage = async () => {
        const token = localStorage.getItem('token');
        try {
            await axios.post(
                'http://localhost:5000/chat/message',
                { receiverId: userId, message: newMessage },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setMessages([...messages, { sender: loggedInUsername, message: newMessage, sender_id: 'you' }]);
            setNewMessage('');
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <>
            <Header username={loggedInUsername} />
            <Container maxWidth="md">
                <Box textAlign="center" mt={3}>
                    <Typography variant="h5">Chat with {chatUser}</Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ mt: 1, fontStyle: 'italic' }}>
                        Welcome to the chatbox! Start chatting with your friends, teammates, family members...
                    </Typography>
                </Box>
                <Paper
                    sx={{
                        p: 2,
                        mt: 2,
                        minHeight: '80vh',
                        maxHeight: '80vh',
                        overflowY: 'auto',
                        borderRadius: 2,
                        boxShadow: 3,
                    }}
                >
                    <List>
                        {messages.slice().reverse().map((msg, index) => (
                            <ListItem key={index} sx={{ flexDirection: 'column', alignItems: msg.sender_id === 'you' ? 'flex-end' : 'flex-start' }}>
                                <Typography variant="subtitle2" color="textSecondary" sx={{ alignSelf: msg.sender_id === 'you' ? 'flex-end' : 'flex-start' }}>
                                    {msg.senderUsername || chatUser}
                                </Typography>
                                <Paper
                                    elevation={2}
                                    sx={{
                                        p: 1,
                                        borderRadius: 2,
                                        maxWidth: '75%',
                                        bgcolor: msg.sender_id === 'you' ? 'primary.light' : 'grey.200',
                                    }}
                                >
                                    <ListItemText primary={msg.message} />
                                </Paper>
                            </ListItem>
                        ))}
                        <div ref={messagesEndRef} />
                    </List>
                </Paper>
                <Box display="flex" alignItems="center" mt={2}>
                    <TextField
                        variant="outlined"
                        fullWidth
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message"
                    />
                    <Button variant="contained" color="primary" onClick={handleSendMessage} disabled={!newMessage} sx={{ ml: 1 }}>
                        Send
                    </Button>
                </Box>
            </Container>
            <Footer />
        </>
    );
};

export default ChatBox;
