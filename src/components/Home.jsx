import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, List, ListItem, ListItemText, Button, Typography, Box, Paper } from '@mui/material';
import Header from './Header.jsx';
import Footer from './Footer.jsx';

const Home = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const loggedInUsername = localStorage.getItem('username');

    useEffect(() => {
        const fetchUsers = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                alert('User not authenticated');
                navigate('/');
                return;
            }

            try {
                const { data } = await axios.get('http://localhost:5000/chat/users', {
                    headers: { Authorization: `Bearer ${token}` },
                });

                // Filtering out the logged-in user from the list of registered users
                setUsers(data.filter(user => user.username !== loggedInUsername));
            } catch (error) {
                if (error.response && error.response.status === 403) {
                    alert('Access forbidden: Invalid or expired token');
                    localStorage.removeItem('token');
                    navigate('/');
                } else {
                    console.error('Error fetching users:', error);
                }
            }
        };

        fetchUsers();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    const handleChat = (userId) => {
        navigate(`/chat/${userId}`);
    };

    return (
        <>
            <Header username={loggedInUsername} />
            <Container maxWidth="sm">
                <Box display="flex" justifyContent="space-between" alignItems="center" mt={5} mb={2}>
                    <Typography variant="h4">Registered Users</Typography>
                    <Button variant="outlined" color="secondary" onClick={handleLogout}>
                        Logout
                    </Button>
                </Box>
                <Paper elevation={2} sx={{ padding: 2, borderRadius: 2 }}>
                <List sx={{ minHeight:"70vh" }}>
    {users
        .filter((user) => user.username !== loggedInUsername)
        .map((user) => (
            <ListItem key={user.id} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <ListItemText primary={user.username} />
                <Button variant="contained" color="primary" onClick={() => handleChat(user.id)}>
                    Start Chat
                </Button>
            </ListItem>
        ))}
</List>
                </Paper>
            </Container>
            <Footer />
        </>
    );
};

export default Home;
